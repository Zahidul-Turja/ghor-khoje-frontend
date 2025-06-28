import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export async function reviewUser(userId, formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/review-user/${userId}/`,
      formData,
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
    toast.error(error.response.data.message || "Failed to submit review");
    console.log("Error applying for host:", error);
    throw error;
  }
}

export async function reviewPlace(slug, formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/places/review/${slug}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;

    console.log("Apply for host response:", response);
    toast.success("Review submitted successfully for verification.");
    return data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to submit review");
    console.log("Error applying for host:", error);
    throw error;
  }
}
