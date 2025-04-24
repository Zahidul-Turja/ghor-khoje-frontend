"use client";
import { useState, useEffect, useRef } from "react";
import { X, Upload, MapPin, Plus, Trash2 } from "lucide-react";

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
    area_in_sqft: 0,
    num_of_bedrooms: 0,
    num_of_bathrooms: 0,
    num_of_balconies: 0,
    num_of_kitchens: 0,
    num_of_dining_rooms: 0,
    num_of_living_rooms: 0,
    num_of_parking_spaces: 0,
    capacity: 0,
    available_from: "",
    images: [],
  });

  const [facilityInput, setFacilityInput] = useState({ name: "", icon: null });
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

  // Map functionality
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Initialize Leaflet map directly without dynamic script loading
  useEffect(() => {
    // Skip if map is already loaded or ref doesn't exist yet
    if (mapLoaded || !mapRef.current) return;

    // Initialize with default or existing coordinates
    const defaultLat = formData.latitude || 40.7128;
    const defaultLng = formData.longitude || -74.006;

    // Create map - using window.L to make sure Leaflet is referenced correctly
    try {
      // Initialize the map
      const map = L.map(mapRef.current).setView([defaultLat, defaultLng], 13);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Create marker if coordinates exist in formData
      if (formData.latitude && formData.longitude) {
        const marker = L.marker([formData.latitude, formData.longitude], {
          draggable: true,
        }).addTo(map);
        markerRef.current = marker;

        setSelectedLocation({
          lat: formData.latitude,
          lng: formData.longitude,
        });

        // Add drag event
        marker.on("dragend", function () {
          const position = marker.getLatLng();

          setFormData({
            ...formData,
            latitude: position.lat,
            longitude: position.lng,
          });

          setSelectedLocation({
            lat: position.lat,
            lng: position.lng,
          });
        });
      }

      // Add click event to map
      map.on("click", function (e) {
        const clickedLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };

        // Update form data with new coordinates
        setFormData({
          ...formData,
          latitude: clickedLocation.lat,
          longitude: clickedLocation.lng,
        });

        setSelectedLocation(clickedLocation);

        // Update or create marker
        if (markerRef.current) {
          markerRef.current.setLatLng(clickedLocation);
        } else {
          const marker = L.marker(clickedLocation, {
            draggable: true,
          }).addTo(map);
          markerRef.current = marker;

          // Add drag event
          marker.on("dragend", function () {
            const position = marker.getLatLng();

            setFormData({
              ...formData,
              latitude: position.lat,
              longitude: position.lng,
            });

            setSelectedLocation({
              lat: position.lat,
              lng: position.lng,
            });
          });
        }
      });

      // Simple search box implementation
      const searchControl = L.control({ position: "topleft" });

      searchControl.onAdd = function () {
        const container = L.DomUtil.create(
          "div",
          "leaflet-control leaflet-bar",
        );
        container.style.backgroundColor = "white";
        container.style.padding = "5px";
        container.style.margin = "10px";
        container.style.borderRadius = "4px";
        container.style.boxShadow = "0 1px 5px rgba(0,0,0,0.4)";
        container.style.width = "250px";

        const input = L.DomUtil.create("input", "search-input", container);
        input.type = "text";
        input.placeholder = "Search location...";
        input.style.width = "100%";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.style.padding = "8px";

        // Prevent map clicks when interacting with the search box
        L.DomEvent.disableClickPropagation(container);

        // Handle search
        L.DomEvent.on(input, "keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();

            const searchValue = input.value;
            if (!searchValue) return;

            // Use OpenStreetMap Nominatim API for search
            fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}`,
            )
              .then((response) => response.json())
              .then((data) => {
                if (data && data.length > 0) {
                  const result = data[0];
                  const lat = parseFloat(result.lat);
                  const lng = parseFloat(result.lon);

                  map.setView([lat, lng], 16);

                  // Update form data
                  setFormData({
                    ...formData,
                    latitude: lat,
                    longitude: lng,
                  });

                  setSelectedLocation({ lat, lng });

                  // Update or create marker
                  if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                  } else {
                    const marker = L.marker([lat, lng], {
                      draggable: true,
                    }).addTo(map);
                    markerRef.current = marker;

                    // Add drag event
                    marker.on("dragend", function () {
                      const position = marker.getLatLng();

                      setFormData({
                        ...formData,
                        latitude: position.lat,
                        longitude: position.lng,
                      });

                      setSelectedLocation({
                        lat: position.lat,
                        lng: position.lng,
                      });
                    });
                  }
                }
              })
              .catch((error) =>
                console.error("Error searching location:", error),
              );
          }
        });

        return container;
      };

      searchControl.addTo(map);

      // Force the map to recalculate size once it's visible in the DOM
      setTimeout(() => {
        map.invalidateSize();
        setMapLoaded(true);
      }, 100);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapLoaded(false);
    }
  }, [mapRef.current]);

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
      [name]: parseInt(value) || 0,
    });
  };

  const handleAddFacility = () => {
    if (facilityInput.name && facilityInput.icon) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, { ...facilityInput }],
      });
      setFacilityInput({ name: "", icon: null });
    }
  };

  const handleRemoveFacility = (index) => {
    const updatedFacilities = [...formData.facilities];
    updatedFacilities.splice(index, 1);
    setFormData({ ...formData, facilities: updatedFacilities });
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
      file,
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

  const handleFacilityIconUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFacilityInput({
        ...facilityInput,
        icon: {
          file,
          preview: URL.createObjectURL(file),
        },
      });
    }
  };

  const toggleFacility = (facility) => {
    const isSelected = formData.facilities.some((f) => f.id === facility.id);

    if (isSelected) {
      // Remove facility if already selected
      setFormData({
        ...formData,
        facilities: formData.facilities.filter((f) => f.id !== facility.id),
      });
    } else {
      // Add facility if not selected
      setFormData({
        ...formData,
        facilities: [...formData.facilities, facility],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
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
          className="overflow-y-auto p-6"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
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
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="condo">Condo</option>
                    <option value="office">Office Space</option>
                    <option value="commercial">Commercial Property</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Facilities
                  </label>
                  <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {availableFacilities.map((facility) => {
                      const isSelected = formData.facilities.some(
                        (f) => f.id === facility.id,
                      );
                      return (
                        <div
                          key={facility.id}
                          onClick={() => toggleFacility(facility)}
                          className={`flex cursor-pointer items-center rounded-lg border p-3 transition-colors ${
                            isSelected
                              ? "border-primary/20 bg-primary/10 text-primary/80"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 overflow-hidden rounded-md bg-gray-100">
                              <img
                                src={facility.icon}
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

            {/* Location */}
            <div className={activeTab === "location" ? "block" : "hidden"}>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Area Name
                    </label>
                    <input
                      type="text"
                      name="area_name"
                      value={formData.area_name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Area Code
                    </label>
                    <input
                      type="text"
                      name="area_code"
                      value={formData.area_code}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Block Name
                    </label>
                    <input
                      type="text"
                      name="block_name"
                      value={formData.block_name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Street Name
                    </label>
                    <input
                      type="text"
                      name="street_name"
                      value={formData.street_name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      House Name
                    </label>
                    <input
                      type="text"
                      name="house_name"
                      value={formData.house_name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      House Number
                    </label>
                    <input
                      type="text"
                      name="house_number"
                      value={formData.house_number}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Apartment Number
                    </label>
                    <input
                      type="text"
                      name="apartment_number"
                      value={formData.apartment_number}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Floor Number
                    </label>
                    <input
                      type="text"
                      name="floor_number"
                      value={formData.floor_number}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      step="0.000001"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      step="0.000001"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-dashed border-gray-300 p-4">
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <MapPin size={20} />
                    <span>Map functionality would be implemented here</span>
                  </div>
                </div>
                {/* <div className="space-y-4">
                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
                    integrity="sha512-Zcn6bjR/8RZbLEpLIeOwNtzREBAJhXpHQ8Fk+PwGUv8UhAY5r+ux/dFy0EV6ERQEiJ3WEh6cB7wM4fh2j/2v9g=="
                    crossOrigin="anonymous"
                  />

                 
                  <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"
                    integrity="sha512-BwHfrr4c9kmRkLw6iXFdzcdWV/PGkVgiIyIWLLlTSXzWQzxuSg4DiQUCpauz/EWjgk5TYQqX/kvn9pG1NpYfqg=="
                    crossOrigin="anonymous"
                  ></script>
                  <div className="relative h-96 w-full rounded-lg border border-gray-300 bg-gray-100 shadow-inner">
                    {!mapLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                          <span className="text-gray-500">Loading map...</span>
                        </div>
                      </div>
                    )}
                    <div
                      ref={mapRef}
                      className="h-full w-full rounded-lg"
                      style={{ zIndex: 0 }}
                    ></div>
                  </div>

                  {selectedLocation && (
                    <div className="rounded-lg bg-blue-50 p-4">
                      <div className="flex items-center space-x-2">
                        <MapPin size={20} className="text-primary/70" />
                        <h3 className="font-medium text-blue-800">
                          Selected Location
                        </h3>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Latitude</p>
                          <p className="font-medium">
                            {selectedLocation.lat.toFixed(6)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Longitude</p>
                          <p className="font-medium">
                            {selectedLocation.lng.toFixed(6)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Click on the map to set location or drag the marker to
                        adjust
                      </p>
                    </div>
                  )}
                </div> */}
              </div>
            </div>

            {/* Property Details */}
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

            {/* Financial */}
            <div className={activeTab === "financial" ? "block" : "hidden"}>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rent per Month
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="rent_per_month"
                      value={formData.rent_per_month}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-gray-300 p-3 pl-8 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Extra Bills
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="extra_bills"
                      value={formData.extra_bills}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-gray-300 p-3 pl-8 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Additional monthly costs (utilities, etc.)
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Prepayment Months
                  </label>
                  <input
                    type="number"
                    name="num_prepayment_months"
                    value={formData.num_prepayment_months}
                    onChange={handleNumberInput}
                    min="0"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Number of months required for advance payment
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="font-medium text-primary/70">
                    Payment Summary
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent:</span>
                      <span className="font-medium">
                        ${formData.rent_per_month.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extra Bills:</span>
                      <span className="font-medium">
                        ${formData.extra_bills.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Monthly:</span>
                      <span className="font-medium">
                        $
                        {(
                          formData.rent_per_month + formData.extra_bills
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-primary/20 pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-primary/90">
                          Required Prepayment:
                        </span>
                        <span className="font-bold text-primary/90">
                          $
                          {(
                            formData.num_prepayment_months *
                            (formData.rent_per_month + formData.extra_bills)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className={activeTab === "images" ? "block" : "hidden"}>
              <div className="space-y-6">
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Upload Images
                  </label>
                  <div
                    className={`rounded-lg border-2 border-dashed p-6 text-center ${
                      dragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Upload size={36} className="text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Drag & drop images here
                        </p>
                        <p className="text-sm text-gray-500">or</p>
                      </div>
                      <label className="cursor-pointer rounded-lg bg-primary/70 px-4 py-2 font-medium text-white transition-colors hover:bg-primary/70">
                        Browse Files
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e.target.files)}
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        Upload up to 10 images (max 5MB each)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Property Images
                  </label>
                  <div className="space-y-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <div className="flex w-full items-center space-x-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                            <img
                              src={image.preview}
                              alt={`Property image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 items-center">
                            <textarea
                              type="text"
                              placeholder="Please describe what the image is about"
                              value={image.description}
                              onChange={(e) =>
                                handleImageDescriptionChange(
                                  index,
                                  e.target.value,
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 p-2 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="ml-4 rounded p-1 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}

                    {formData.images.length === 0 && (
                      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                        <p className="text-gray-500">No images uploaded yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
