import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export const getReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/generals/reviews`);
    console.log("Reviews fetched successfully:", response.data);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
