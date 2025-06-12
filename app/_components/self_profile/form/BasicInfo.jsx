"use client";

import { getAllCategories, getAllFacilities } from "@/app/_lib/apiCalls";
import { useEffect, useState } from "react";

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
      <div className="space-y-4 sm:space-y-6">
        {/* Title Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:p-3 sm:text-base"
            placeholder="Enter property title"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="resize-vertical min-h-[80px] w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-[100px] sm:p-3 sm:text-base"
            placeholder="Describe your property"
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:p-3 sm:text-base"
            required
          >
            <option value="">Select category</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Facilities Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Facilities
          </label>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary sm:h-8 sm:w-8"></div>
                <span className="text-sm text-gray-500">
                  Loading facilities...
                </span>
              </div>
            </div>
          )}

          {/* Facilities Grid */}
          {!loading && availableFacilities.length > 0 && (
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
              {availableFacilities.map((facility) => {
                const isSelected = formData.facilities.some(
                  (id) => id === facility.id,
                );
                return (
                  <div
                    key={facility.id}
                    onClick={() => toggleFacility(facility.id)}
                    className={`flex cursor-pointer items-center rounded-lg border p-2.5 transition-all duration-200 hover:shadow-sm sm:p-3 ${
                      isSelected
                        ? "border-primary/30 bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3">
                      {/* Facility Icon */}
                      <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-6 sm:w-6">
                        <img
                          src={`${facility.icon}`}
                          alt={facility.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div
                          className="hidden h-full w-full items-center justify-center rounded-md bg-gray-200"
                          style={{ display: "none" }}
                        >
                          <span className="text-xs text-gray-500">?</span>
                        </div>
                      </div>

                      {/* Facility Name */}
                      <span className="truncate text-xs font-medium sm:text-sm">
                        {facility.name}
                      </span>
                    </div>

                    {/* Checkbox Indicator */}
                    <div className="ml-2 flex-shrink-0">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors sm:h-5 sm:w-5 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Hidden checkbox for form submission */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by the parent div's onClick
                      className="sr-only"
                      tabIndex={-1}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && availableFacilities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center sm:py-12">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16">
                <svg
                  className="h-6 w-6 text-gray-400 sm:h-8 sm:w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m5 0h2"
                  />
                </svg>
              </div>
              <p className="mb-1 text-sm text-gray-500 sm:text-base">
                No facilities available
              </p>
              <p className="text-xs text-gray-400 sm:text-sm">
                Facilities will appear here when available
              </p>
            </div>
          )}

          {/* Selected Facilities Summary (Mobile) */}
          {formData.facilities.length > 0 && (
            <div className="mt-3 sm:hidden">
              <div className="rounded-lg bg-gray-50 p-2 text-xs text-gray-600">
                <span className="font-medium">
                  {formData.facilities.length} facilities selected
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
