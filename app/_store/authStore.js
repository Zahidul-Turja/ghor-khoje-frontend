import { create } from "zustand";
import { persist } from "zustand/middleware";

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
          const response = await fetch("/api/login", {
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
          } else {
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          console.error("Login error:", error.message);
          throw error;
        }
      },

      // Signup function
      signup: async (userData) => {
        try {
          const response = await fetch("/api/signup", {
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
          } else {
            throw new Error(data.message || "Signup failed");
          }
        } catch (error) {
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
    }
  )
);

export default useAuthStore;
