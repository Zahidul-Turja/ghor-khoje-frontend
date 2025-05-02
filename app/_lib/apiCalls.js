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
    const response = await axios.get(`${BASE_URL}/api/v1/place/categories/`, {
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
    const response = await axios.get(`${BASE_URL}/api/v1/place/facilities/`, {
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
