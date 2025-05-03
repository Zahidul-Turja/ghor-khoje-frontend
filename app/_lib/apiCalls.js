import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export async function applyForHost() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/application/landlord/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;

    console.log("Apply for host response:", response);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function hasAppliedForHost() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/has-applied-for-landlord/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data.data;
    return data;
  } catch (error) {}
}

export async function getAllCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/places/categories/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllFacilities() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/places/facilities/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
}

// ? important
function buildFormData(data) {
  const formData = new FormData();

  for (const key in data) {
    if (key === "images") {
      data.images.forEach((img, index) => {
        formData.append(`images[${index}].image`, img.image);
        formData.append(`images[${index}].description`, img.description);
      });
    } else {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export const createProperty = async (formData) => {
  const fd = buildFormData(formData);

  try {
    const res = await axios.post(`${BASE_URL}/api/v1/place/`, fd, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
};
