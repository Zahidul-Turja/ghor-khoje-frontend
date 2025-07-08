"use client";

import { useRef } from "react";

function PropertyDetails({
  activeTab,
  formData,
  handleNumberInput,
  handleInputChange,
}) {
  const dateRef = useRef(null);

  return (
    <div className={activeTab === "details" ? "block" : "hidden"}>
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Area (sq ft)
          </label>
          <input
            type="number"
            name="area_in_sqft"
            value={formData.area_in_sqft}
            onChange={handleNumberInput}
            min="0"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bedrooms
            </label>
            <input
              type="number"
              name="num_of_bedrooms"
              value={formData.num_of_bedrooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bathrooms
            </label>
            <input
              type="number"
              name="num_of_bathrooms"
              value={formData.num_of_bathrooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kitchens
            </label>
            <input
              type="number"
              name="num_of_kitchens"
              value={formData.num_of_kitchens}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Balconies
            </label>
            <input
              type="number"
              name="num_of_balconies"
              value={formData.num_of_balconies}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Living Rooms
            </label>
            <input
              type="number"
              name="num_of_living_rooms"
              value={formData.num_of_living_rooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Dining Rooms
            </label>
            <input
              type="number"
              name="num_of_dining_rooms"
              value={formData.num_of_dining_rooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Parking Spaces
            </label>
            <input
              type="number"
              name="num_of_parking_spaces"
              value={formData.num_of_parking_spaces}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Capacity (people)
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Available From
          </label>
          <div onClick={() => dateRef.current.showPicker()}>
            <input
              ref={dateRef}
              type="date"
              name="available_from"
              value={formData.available_from}
              onChange={handleInputChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-500 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
