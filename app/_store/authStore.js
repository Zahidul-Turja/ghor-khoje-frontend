import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpModalOpen: false,

      userInfo: async () => {
        try {
          const response = await fetch(
            `${BASE_ENDPOINT}/api/v1/user/profile/`,
            {
              headers: {
                Authorization: `Bearer ${get().accessToken}`,
              },
            },
          );
          const data = await response.json();
          if (response.ok) {
            set({ user: data.data });
            window.localStorage.setItem("user", JSON.stringify(data.data));
            return data.data;
          } else {
            throw new Error(data.message || "Failed to fetch user info");
          }
        } catch (error) {
          console.log("User info error:", error.message);
        }
      },

      // Login function
      login: async (credentials) => {
        try {
          set({ isLoading: true });
          const response = await fetch(`${BASE_ENDPOINT}/api/v1/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          console.log("Login response:", data);

          if (response.ok) {
            set({
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              user: data.data.user,
              isAuthenticated: true,
            });
            console.log("Login successful:", data);
            window.localStorage.setItem("access_token", data.data.access_token);
            window.localStorage.setItem(
              "refresh_token",
              data.data.refresh_token,
            );
            window.localStorage.setItem("user", JSON.stringify(data.data.user));
            toast.success("Login successful");
          } else {
            // toast.error(data.message || "Login failed");
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          toast.error(error.message || "Login failed");
          console.error("Login error:", error.message);

          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Signup function
      signup: async (userData) => {
        console.log("signup called", userData);
        try {
          set({ isLoading: true });
          const response = await fetch(
            `${BASE_ENDPOINT}/api/v1/auth/registration/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            },
          );
          const data = await response.json();

          if (response.ok) {
            console.log("Signup response:", data);
            set({
              otpModalOpen: true,
              user: data.data,
              isAuthenticated: false,
            });
            toast.success("OTP sent to your email");
          } else {
            toast.error(data.message || "Signup failed");
            throw new Error(data.message || "Signup failed");
          }
        } catch (error) {
          toast.error("Signup failed");
          console.error("Signup error:", error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Close OTP modal
      closeOtpModal: () => {
        set({ otpModalOpen: false });
      },

      // Verify OTP function
      verifyOtp: async (email, otp) => {
        try {
          console.log("verifyOtp called", email, otp);
          set({ isLoading: true });
          const response = await fetch(
            `${BASE_ENDPOINT}/api/v1/auth/registration-verification/otp/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, otp }),
            },
          );

          const data = await response.json();

          if (response.ok) {
            set({
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              user: data.user,
              isAuthenticated: true,
              otpModalOpen: false,
            });
            toast.success("Email verified successfully");

            // You might want to redirect here or let the component handle it
            return true;
          } else {
            toast.error(data.message || "OTP verification failed");
            throw new Error(data.message || "OTP verification failed");
          }
        } catch (error) {
          toast.error("OTP verification failed");
          console.error("OTP verification error:", error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Refresh token function
      refreshAuth: async () => {
        try {
          const refreshToken = get().refreshToken;

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          set({ isLoading: true });

          const response = await fetch(`${BASE_ENDPOINT}/api/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              accessToken: data.access_token,
              refreshToken: data.refresh_token || get().refreshToken, // Use new refresh token if provided, otherwise keep the existing one
              isAuthenticated: true,
            });
            return true;
          } else {
            // If refresh fails, log the user out
            get().logout();
            throw new Error(data.message || "Failed to refresh authentication");
          }
        } catch (error) {
          console.error("Token refresh error:", error.message);
          get().logout();
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      // Get authenticated fetch for making API calls that need authentication
      authFetch: async (url, options = {}) => {
        const store = get();

        try {
          // First attempt with current access token
          const response = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${store.accessToken}`,
              "Content-Type":
                options.headers?.["Content-Type"] || "application/json",
            },
          });

          // If unauthorized (401), try to refresh the token
          if (response.status === 401) {
            const refreshSuccess = await store.refreshAuth();

            if (refreshSuccess) {
              // Retry the request with the new token
              return fetch(url, {
                ...options,
                headers: {
                  ...options.headers,
                  Authorization: `Bearer ${store.accessToken}`,
                  "Content-Type":
                    options.headers?.["Content-Type"] || "application/json",
                },
              });
            } else {
              // If refresh failed, throw an error
              throw new Error("Authentication failed");
            }
          }

          return response;
        } catch (error) {
          console.error("Auth fetch error:", error.message);
          throw error;
        }
      },

      // Logout function
      logout: async () => {
        try {
          set({ isLoading: true });

          // Await the fetch call
          const response = await fetch(`${BASE_ENDPOINT}/api/v1/auth/logout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get().accessToken}`,
            },
            body: JSON.stringify({ refresh_token: get().refreshToken }),
          });

          // Parse response to get potential error messages
          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            console.error(
              "Logout failed:",
              data.message || response.statusText,
            );
          }

          // Clear state regardless of server response
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
          });
          // Clear local storage
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("refresh_token");
          window.localStorage.removeItem("user");

          toast.success("Logged out successfully");
        } catch (error) {
          console.error("Logout error:", error.message);

          // Even if there's a network error, clear local state
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
          });

          toast.success("Logged out locally");
        } finally {
          set({ isLoading: false });
        }
      },

      // Check if token is expired
      isTokenExpired: () => {
        const token = get().accessToken;
        if (!token) return true;

        try {
          // Extract the payload from the JWT token
          const payload = JSON.parse(atob(token.split(".")[1]));
          // Check if the token has expired
          return payload.exp * 1000 < Date.now();
        } catch (error) {
          console.error("Token validation error:", error.message);
          return true;
        }
      },

      // Update user profile
      updateProfile: async (profileData) => {
        try {
          set({ isLoading: true });

          // Determine if profileData is FormData or a regular object
          const isFormData = profileData instanceof FormData;

          // Prepare request options
          const requestOptions = {
            method: "POST",
            // Don't add Content-Type for FormData
            headers: isFormData ? {} : { "Content-Type": "application/json" },
            body: isFormData ? profileData : JSON.stringify(profileData),
          };

          // When using authFetch, we need to prevent it from adding Content-Type: application/json
          // if we're using FormData
          const response = await fetch(
            `${BASE_ENDPOINT}/api/v1/user/profile/update/`,
            {
              ...requestOptions,
              headers: {
                ...requestOptions.headers,
                Authorization: `Bearer ${get().accessToken}`,
              },
            },
          );

          const data = await response.json();

          if (response.ok) {
            // Update the user state with the returned data
            set({
              user: { ...get().user, ...data.data }, // Note: adjust this based on your API response structure
            });

            // Update localStorage
            window.localStorage.setItem(
              "user",
              JSON.stringify({ ...get().user, ...data.data }),
            );

            toast.success("Profile updated successfully");
            return data.data; // Adjust based on your API response structure
          } else {
            toast.error(data.message || "Failed to update profile");
            throw new Error(data.message || "Failed to update profile");
          }
        } catch (error) {
          toast.error("Failed to update profile");
          console.error("Profile update error:", error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth", // Key for localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
