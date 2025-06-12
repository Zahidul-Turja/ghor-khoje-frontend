"use client";
import { useState } from "react";
import { X } from "lucide-react";
import BasicInfo from "./form/BasicInfo";
import Location from "./form/Location";
import PropertyDetails from "./form/PropertyDetails";
import Financial from "./form/Financial";
import Images from "./form/Images";

export default function AddPropertyModal({ onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    facilities: [],
    city: "",
    area_name: "",
    area_code: "",
    block_name: "",
    street_name: "",
    house_name: "",
    house_number: "",
    apartment_number: "",
    floor_number: "",
    rent_per_month: 0.0,
    extra_bills: 0.0,
    num_prepayment_months: 0,
    latitude: 0.0,
    longitude: 0.0,
    area_in_sqft: "",
    num_of_bedrooms: "",
    num_of_bathrooms: "",
    num_of_balconies: "",
    num_of_kitchens: "",
    num_of_dining_rooms: "",
    num_of_living_rooms: "",
    num_of_parking_spaces: "",
    capacity: "",
    available_from: "",
    images: [],
  });

  const [availableFacilities, setAvailableFacilities] = useState([
    { id: 1, name: "WiFi", icon: "/api/placeholder/40/40" },
    { id: 2, name: "Parking", icon: "/api/placeholder/40/40" },
    { id: 3, name: "Air Conditioning", icon: "/api/placeholder/40/40" },
    { id: 4, name: "Swimming Pool", icon: "/api/placeholder/40/40" },
    { id: 5, name: "Gym", icon: "/api/placeholder/40/40" },
    { id: 6, name: "Security", icon: "/api/placeholder/40/40" },
    { id: 7, name: "Laundry", icon: "/api/placeholder/40/40" },
    { id: 8, name: "Elevator", icon: "/api/placeholder/40/40" },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || "",
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      image: file,
      preview: URL.createObjectURL(file),
      description: "",
    }));

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
    });
  };

  const handleImageDescriptionChange = (index, description) => {
    const updatedImages = [...formData.images];
    updatedImages[index].description = description;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const toggleFacility = (facility) => {
    const isSelected = formData.facilities.includes(facility);

    if (isSelected) {
      setFormData({
        ...formData,
        facilities: formData.facilities.filter((id) => id !== facility),
      });
    } else {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, facility],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
    onClose();
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "location", label: "Location" },
    { id: "details", label: "Property Details" },
    { id: "financial", label: "Financial" },
    { id: "images", label: "Images" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-none bg-white shadow-xl sm:h-[95vh] sm:max-h-[800px] sm:rounded-xl">
        {/* Header */}
        <header className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
          <h1 className="truncate text-lg font-bold text-gray-800 sm:text-2xl">
            Add New Property
          </h1>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-200 sm:p-2"
          >
            <X size={20} className="sm:h-6 sm:w-6" />
          </button>
        </header>

        {/* Tabs */}
        <div className="flex flex-shrink-0 overflow-x-auto border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors sm:px-6 sm:py-3 sm:text-base ${
                activeTab === tab.id
                  ? "border-b-2 border-primary/80 text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-20 pt-4 sm:px-6 sm:pb-24 sm:pt-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Basic Info */}
              <BasicInfo
                availableFacilities={availableFacilities}
                activeTab={activeTab}
                formData={formData}
                handleInputChange={handleInputChange}
                toggleFacility={toggleFacility}
              />

              {/* Location */}
              <Location
                activeTab={activeTab}
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
              />

              {/* Property Details */}
              <PropertyDetails
                activeTab={activeTab}
                formData={formData}
                handleInputChange={handleInputChange}
                handleNumberInput={handleNumberInput}
              />

              {/* Financial */}
              <Financial
                activeTab={activeTab}
                formData={formData}
                handleInputChange={handleInputChange}
                handleNumberInput={handleNumberInput}
              />

              {/* Images */}
              <Images
                activeTab={activeTab}
                formData={formData}
                handleImageUpload={handleImageUpload}
                handleRemoveImage={handleRemoveImage}
                handleImageDescriptionChange={handleImageDescriptionChange}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
              />
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-shrink-0 flex-col justify-end space-y-2 border-t border-gray-200 bg-white px-4 py-3 sm:flex-row sm:space-x-4 sm:space-y-0 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/80 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
          >
            Save Property
          </button>
        </div>
      </div>
    </div>
  );
}
