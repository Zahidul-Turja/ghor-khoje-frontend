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

export const bookProperty = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/bookings/create-booking/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    console.log("Booking response:", response);
    const data = response.data;
    console.log("Booking response:", data);
    if (data.status === "success") {
      toast.success("Booking created successfully");
      return data;
    } else {
      console.log("Booking error:", data);
      toast.error(data.message || "Failed to create booking");
    }
    return null;
  } catch (error) {
    console.log("Error creating booking:", error);
    toast.error("Failed to create booking");
    throw error;
  }
};

export const getBookingRequests = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/bookings/booking-requests/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    return data;
  } catch (error) {
    toast.error("Failed to fetch booking requests");
    console.error("Error fetching booking requests:", error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/bookings/update-booking-status/${bookingId}/`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    console.log("Booking status updated:", data);
    if (data.status === "success") {
      toast.success("Booking status updated successfully");
      return data;
    } else {
      toast.error(data.message || "Failed to update booking status");
    }
    return null;
  } catch (error) {
    console.error("Error updating booking status:", error);
    toast.error("Failed to update booking status");
    throw error;
  }
};

export const aboutHost = async (host_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/about-host/${host_id}/`,
    );
    const data = response.data;
    console.log("About host response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching about host:", error);
    toast.error("Failed to fetch about host");
    throw error;
  }
};

export const listOfNotifications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/notifications/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data;
    console.log("List of notifications response:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching list of notifications:", error);
    toast.error("Failed to fetch list of notifications");
    throw error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/notifications/mark-all-read/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    console.log("Mark all notifications as read response:", data);
    return data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    toast.error("Failed to mark all notifications as read");
    throw error;
  }
};

export const markNotificationAsRead = async (notificationIds) => {
  try {
    // Accept either a single ID or array of IDs
    const ids = Array.isArray(notificationIds)
      ? notificationIds
      : [notificationIds];

    const response = await axios.post(
      `${BASE_URL}/api/v1/user/notifications/mark-read/`,
      {
        notification_ids: ids, // Use `data` property for axios, not `body`
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = response.data;
    console.log("Mark notification as read response:", data);
    toast.success("Notification marked as read");
    return data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    toast.error("Failed to mark notification as read");
    throw error;
  }
};

// Tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/tasks/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data;
    console.log("Tasks response:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    toast.error("Failed to fetch tasks");
    throw error;
  }
};

export const createNewTask = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/tasks/create/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    toast.success("New task created successfully");
    console.log("New task created:", data);
    return data;
  } catch (error) {
    console.error("Error creating new task:", error);
    toast.error("Failed to create new task");
    throw error;
  }
};

export const updateTask = async (taskId, formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/user/tasks/update/${taskId}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    toast.success("Task updated successfully");
    console.log("Task updated:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task");
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/user/tasks/delete/${taskId}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    toast.success("Task deleted successfully");
    console.log("Task deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task");
    throw error;
  }
};

export const toggleCompleteTask = async (taskId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/user/tasks/toggle-completed/${taskId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    console.log("Task completed:", data);
    return data;
  } catch (error) {
    console.error("Error toggling task completion:", error);
    toast.error("Failed to toggle task completion");
    throw error;
  }
};

export const getBookmarkedPlaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/bookmarks/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error fetching bookmarked places:", error);
    toast.error("Failed to fetch bookmarked places");
    throw error;
  }
};

export const toggleBookMark = async (slug, message) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/places/toggle-bookmark/${slug}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;

    toast.success(message);
    return data;
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    toast.error("Failed to toggle bookmark");
    throw error;
  }
};

export const idsOfBookmarkedPlaces = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/ids-bookmarked-places/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    console.log("Bookmarked place IDs:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching bookmarked place IDs:", error);
    toast.error("Failed to fetch bookmarked place IDs");
    throw error;
  }
};

export const analytics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/analytics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = response.data;
    console.log("Analytics response:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    toast.error("Failed to fetch analytics");
    throw error;
  }
};

export const getPlaceDetails = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/places/${slug}/`);
    const data = response.data;
    // console.log("Place details response:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    toast.error("Failed to fetch place details");
    throw error;
  }
};

export const updatePlace = async (form, slug) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/places/update/${slug}/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    toast.success("Place updated successfully");
    console.log("Place updated:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating place:", error);
    toast.error("Failed to update place");
    throw error;
  }
};

export const deletePlace = async (slug) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/places/delete/${slug}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    toast.success("Place deleted successfully");
    console.log("Place deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting place:", error);
    toast.error("Failed to delete place");
    throw error;
  }
};

export const addNewImage = async (imageData, slug) => {
  const form = new FormData();

  // Convert base64 string to a Blob
  const base64Response = await fetch(imageData.image);
  const blob = await base64Response.blob();

  // Append the Blob and description to the FormData
  form.append("image", blob, "image.png"); // you can change the filename if needed
  form.append("description", imageData.description);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/places/add/image/${slug}/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data", // important
        },
      },
    );
    toast.success("Image added successfully");
    return response.data.data;
  } catch (error) {
    console.error("Error adding image:", error);
    toast.error("Failed to add image");
    throw error;
  }
};

export const deleteImage = async (slug, imageId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/places/delete/image/${slug}/${imageId}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = response.data;
    toast.success("Image deleted successfully");
    console.log("Image deleted:", data);
    return data.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    toast.error("Failed to delete image");
    throw error;
  }
};
