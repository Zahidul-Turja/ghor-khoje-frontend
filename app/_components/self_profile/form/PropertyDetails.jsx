function PropertyDetails({
  activeTab,
  formData,
  handleNumberInput,
  handleInputChange,
}) {
  return (
    <div className={activeTab === "details" ? "block" : "hidden"}>
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Area (sq ft)
          </label>
          <input
            type="number"
            name="area_in_sqft"
            value={formData.area_in_sqft}
            onChange={handleNumberInput}
            min="0"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              type="number"
              name="num_of_bedrooms"
              value={formData.num_of_bedrooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              type="number"
              name="num_of_bathrooms"
              value={formData.num_of_bathrooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Kitchens
            </label>
            <input
              type="number"
              name="num_of_kitchens"
              value={formData.num_of_kitchens}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Balconies
            </label>
            <input
              type="number"
              name="num_of_balconies"
              value={formData.num_of_balconies}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Living Rooms
            </label>
            <input
              type="number"
              name="num_of_living_rooms"
              value={formData.num_of_living_rooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Dining Rooms
            </label>
            <input
              type="number"
              name="num_of_dining_rooms"
              value={formData.num_of_dining_rooms}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Parking Spaces
            </label>
            <input
              type="number"
              name="num_of_parking_spaces"
              value={formData.num_of_parking_spaces}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Capacity (people)
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleNumberInput}
              min="0"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Available From
          </label>
          <input
            type="date"
            name="available_from"
            value={formData.available_from}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
