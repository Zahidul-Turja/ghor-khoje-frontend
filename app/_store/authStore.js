import { create } from "zustand";
import { persist } from "zustand/middleware";

import toast from "react-hot-toast";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      // Login function
      login: async (credentials) => {
        try {
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
        }
      },

      // Signup function
      signup: async (userData) => {
        try {
          const response = await fetch(`${BASE_ENDPOINT}/api/login`, {
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
      },
    }),
    {
      name: "auth", // Key for localStorage
    },
  ),
);

export default useAuthStore;
