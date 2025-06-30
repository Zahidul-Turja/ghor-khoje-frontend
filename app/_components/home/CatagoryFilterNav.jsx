"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

import { getAllCategories } from "@/app/_lib/apiCalls";
import usePlacesStore from "@/app/_store/placesStore";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function CategoryFilterNav({ pageSize, page }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [categories, setCategories] = useState([]);
  const { getPlaces } = usePlacesStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response) {
          setCategories(response);
          console.log("Categories:", response);
          console.log("Active Category:", activeCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      await getPlaces(pageSize, page, activeCategory);
    };

    if (activeCategory) {
      fetchPlaces();
      console.log("Active Category:", activeCategory);
    }
  }, [activeCategory]);

  const handleScroll = (direction) => {
    const container = document.getElementById("category-container");
    const scrollAmount = 400;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-screen-xl px-6">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 z-10 block -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <FaChevronLeft />
      </button>

      <div className="flex items-center justify-between overflow-hidden px-8">
        <div
          id="category-container"
          className="no-scrollbar flex items-center gap-6 overflow-x-auto scroll-smooth px-2 py-4"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex min-w-fit cursor-pointer flex-col items-center gap-2 rounded-xl px-2 py-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-900 ${activeCategory === category.id ? "border-b-2 border-black font-medium" : ""}`}
              onClick={() => setActiveCategory(category.slug)}
            >
              <div className="relative flex h-6 w-6 items-center justify-center">
                <Image
                  src={`${category.icon}`}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="absolute h-full w-full object-cover"
                />
              </div>
              <p className="whitespace-nowrap text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 z-10 block -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default CategoryFilterNav;
