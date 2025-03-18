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

      // Login function
      login: async (credentials) => {
        try {
          set({ isLoading: true });
          const response = await fetch(`${BASE_ENDPOINT}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();

          if (response.ok) {
            set({
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              user: data.user,
              isAuthenticated: true,
            });
            toast.success("Login successful");
          } else {
            toast.error(data.message || "Login failed");
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          toast.error("Login failed");
          console.error("Login error:", error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Signup function
      signup: async (userData) => {
        try {
          set({ isLoading: true });
          const response = await fetch(`${BASE_ENDPOINT}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
          const data = await response.json();

          if (response.ok) {
            set({
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              user: data.user,
              isAuthenticated: true,
            });
            toast.success("Signup successful");
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
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
        toast.success("Logged out successfully");
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
          const response = await get().authFetch(
            `${BASE_ENDPOINT}/api/profile`,
            {
              method: "PUT",
              body: JSON.stringify(profileData),
            },
          );

          const data = await response.json();

          if (response.ok) {
            set({
              user: { ...get().user, ...data.user },
            });
            toast.success("Profile updated successfully");
            return data.user;
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
