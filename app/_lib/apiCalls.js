import axios from "axios";
import toast from "react-hot-toast";

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
    const response = await axios.get(`${BASE_URL}/api/v1/places/categories/`);
    const data = response.data.data;
    console.log("Categories response:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllFacilities() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/places/facilities/`);
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
    const res = await axios.post(`${BASE_URL}/api/v1/places/create/`, fd, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Success:", res.data);
    toast.success("Property created successfully");
    return res.data;
  } catch (err) {
    console.error("Error:", err);
    if (err.response && err.response.data) {
      const errorMessage =
        err.response.data.message || "Failed to create property";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

export const getUserProperties = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/listed-properties/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    console.log("User properties response:", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProperties = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/places/featured-properties/`,
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getFeedbackTypes = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/feedback/feedback-types/`,
    );
    const data = response.data.results;
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitFeedback = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/feedback/submit-feedback/`,
      formData,
    );
    const data = response.data;
    console.log("Feedback submitted:", data);
    if (data.status === "success") {
      toast.success("Feedback submitted successfully");
      return data;
    } else {
      toast.error(data.message || "Failed to submit feedback");
    }
    return null;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    toast.error("Failed to submit feedback");
    throw error;
  }
};
