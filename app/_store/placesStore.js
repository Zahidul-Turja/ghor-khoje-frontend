import next from "next";
import { create } from "zustand";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

const usePlacesStore = create((set, get) => ({
  places: [],
  place: null,
  isLoading: false,
  error: null,
  nextPage: null,
  previousPage: null,
  totalPages: null,

  getPlaces: async (page_size = 16, page = 1, category = "") => {
    try {
      set({ isLoading: true });
      const categoryQuery = category
        ? `&category=${category}`
        : "&category=all";
      const response = await fetch(
        `${BASE_ENDPOINT}/api/v1/places/list/?page_size=${page_size}&page=${page}${categoryQuery}`,
      );
      const data = await response.json();

      if (response.ok) {
        set({
          places: data.results,
          nextPage: data.next,
          previousPage: data.previous,
        });
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

  getPlace: async (slug) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${BASE_ENDPOINT}/api/v1/places/${slug}/`);
      const data = await response.json();
      console.log(data.data);

      if (response.ok) {
        set({ place: data.data });
      } else {
        set({ error: data.message });
        console.error("Failed to fetch place:", data.message);
      }
    } catch (error) {
      console.error("Error fetching place:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePlacesStore;
