"use client";
import { useState } from "react";
import { X } from "lucide-react";
import BasicInfo from "./form/BasicInfo";
import Location from "./form/Location";
import PropertyDetails from "./form/PropertyDetails";
import Financial from "./form/Financial";
import Images from "./form/Images";

import { createProperty } from "@/app/_lib/apiCalls";

export default function AddPropertyModal({ onClose }) {
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
    createProperty(formData)
      .then((response) => {
        console.log("Property created:", response);
      })
      .catch((error) => {
        console.error("Error creating property:", error);
      });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative mx-4 h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Add New Property</h1>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </header>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 font-medium transition-colors ${
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

        <div
          className="no-scrollbar overflow-y-auto p-6"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
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

            <div className="mt-8 flex justify-end space-x-4 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/80"
              >
                Save Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
