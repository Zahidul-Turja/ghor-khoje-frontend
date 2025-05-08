"use client";

import { getAllCategories, getAllFacilities } from "@/app/_lib/apiCalls";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function BasicInfo({ activeTab, formData, handleInputChange, toggleFacility }) {
  const [categories, setCategories] = useState([]);
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndFacilities = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);

        const facilities = await getAllFacilities();
        setAvailableFacilities(facilities);

        console.log("Facilities:", facilities);
      } catch (error) {
        console.error("Error fetching categories and facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndFacilities();
  }, []);

  return (
    <div className={activeTab === "basic" ? "block" : "hidden"}>
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter property title"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Describe your property"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          >
            <option value="">Select category</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Facilities
          </label>
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {availableFacilities.map((facility) => {
              const isSelected = formData.facilities.some(
                (id) => id === facility.id,
              );
              return (
                <div
                  key={facility.id}
                  onClick={() => toggleFacility(facility.id)}
                  className={`flex cursor-pointer items-center rounded-lg border p-3 transition-colors ${
                    isSelected
                      ? "border-primary/20 bg-primary/10 text-primary/80"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-6 w-6 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={`${facility.icon}`}
                        alt={facility.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <span className="font-medium">{facility.name}</span>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by the parent div's onClick
                      className="hidden h-4 w-4 rounded text-primary/60"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {availableFacilities.length === 0 && (
            <div className="py-4 text-center text-gray-500">
              Loading facilities...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
