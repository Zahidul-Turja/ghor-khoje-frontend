import { create } from "zustand";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

const usePlacesStore = create((set, get) => ({
  places: [],
  isLoading: false,
  error: null,

  getPlaces: async (page_size = 16, page = 1) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `${BASE_ENDPOINT}/api/v1/place/?page_size=${page_size}&page=${page}`,
      );
      const data = await response.json();

      if (response.ok) {
        set({ places: data.data.results });
      } else {
        set({ error: data.message });
        console.error("Failed to fetch places:", data.message);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePlacesStore;
