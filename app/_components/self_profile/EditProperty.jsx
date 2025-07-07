import { useState, useEffect } from "react";
import {
  Save,
  Upload,
  Trash2,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  Users,
  X,
  AlertTriangle,
  UndoDot,
  Check,
} from "lucide-react";

import {
  getPlaceDetails,
  getAllCategories,
  getAllFacilities,
  updatePlace,
  addNewImage,
  deleteImage,
} from "@/app/_lib/apiCalls";

const EditProperty = ({
  propertySlug,
  setEditProperty,
  setEditPropertySlug,
}) => {
  const [property, setProperty] = useState({});
  const [categories, setCategories] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [newImage, setNewImage] = useState({ image: "", description: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [selectedFacilities, setSelectedFacilities] = useState();
  // property.facilities.map((f) => f.id),
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    imageIndex: null,
    id: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        // Start all API calls at once
        const [propertyData, categories, facilities] = await Promise.all([
          getPlaceDetails(propertySlug),
          getAllCategories(),
          getAllFacilities(),
        ]);

        // Set state once all are done
        setProperty(propertyData);
        setCategories(categories);
        setFacilities(facilities);
        setSelectedFacilities(propertyData.facilities.map((f) => f.id));
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    }

    fetchProperty();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewImage({ ...newImage, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    async function addImage() {
      const res = await addNewImage(newImage, propertySlug);
      console.log(res);

      if (newImage.image && newImage.description) {
        const updatedImages = [...(property?.images || []), res];
        setProperty({ ...property, images: updatedImages });
        setNewImage({ image: "", description: "" });
        setIsAddingNew(false);
      }
    }

    addImage();
  };

  const handleCancelAddImage = () => {
    setIsAddingNew(false);
    setNewImage({ image: "", description: "" });
  };

  const handleInputChange = (field, value) => {
    setProperty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFacilityToggle = (facilityId) => {
    setSelectedFacilities((prev) =>
      prev.includes(facilityId)
        ? prev.filter((id) => id !== facilityId)
        : [...prev, facilityId],
    );
  };

  const handleSave = async () => {
    setLoading(true);

    // Create a shallow copy to avoid mutating original state
    const {
      avg_ratings,
      reviews,
      appointment_status,
      created_at,
      images,
      owner,
      facilities,
      category,
      ...rest
    } = property;

    const form = {
      ...rest,
      facilities: selectedFacilities || [],
      category: category?.id || null,
    };

    try {
      await updatePlace(form, property.slug);
      setEditProperty(false);
      setEditPropertySlug(null);
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (index, id) => {
    async function deleteImageCall() {
      try {
        await deleteImage(property.slug, id);

        const updatedImages = property?.images?.filter((img) => img.id !== id);

        setProperty({ ...property, images: updatedImages });
        setDeleteModal({ open: false, imageIndex: null, id: null });
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }

    deleteImageCall();
  };

  const handleImageDescriptionChange = (index, description) => {
    setProperty((prev) => ({
      ...prev,
      images: prev.images.map((img, i) =>
        i === index ? { ...img, description } : img,
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-50 p-4 dark:from-gray-900 dark:to-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-800 dark:text-gray-200">
                Edit Property
              </h1>
              <p className="text-slate-600 dark:text-gray-400">
                Update your property details and manage images
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditProperty(false);
                  setEditPropertySlug("");
                }}
                className="flex items-center gap-2 rounded-xl border border-gray-500 bg-slate-100 px-6 py-2.5 font-semibold text-slate-800 shadow-lg transition-all duration-200 hover:bg-slate-200 hover:shadow-xl"
              >
                <UndoDot className="h-5 w-5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary/80 to-primary/90 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-primary/90 hover:to-primary hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-gray-300">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Property Title {property?.title}
                  </label>
                  <input
                    type="text"
                    value={property?.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    placeholder="Enter property title"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={property.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="no-scrollbar h-40 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    placeholder="Describe your property..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={property?.category?.id}
                    onChange={(e) => {
                      const category = categories.find(
                        (c) => c.id === parseInt(e.target.value),
                      );
                      handleInputChange("category", category);
                    }}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-gray-300">
                  Location Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    value={property.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Area Name
                  </label>
                  <input
                    type="text"
                    value={property.area_name}
                    onChange={(e) =>
                      handleInputChange("area_name", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Area Code
                  </label>
                  <input
                    type="text"
                    value={property.area_code}
                    onChange={(e) =>
                      handleInputChange("area_code", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Block Name
                  </label>
                  <input
                    type="text"
                    value={property.block_name}
                    onChange={(e) =>
                      handleInputChange("block_name", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Street Name
                  </label>
                  <input
                    type="text"
                    value={property.street_name}
                    onChange={(e) =>
                      handleInputChange("street_name", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    House Name
                  </label>
                  <input
                    type="text"
                    value={property.house_name}
                    onChange={(e) =>
                      handleInputChange("house_name", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    House Number
                  </label>
                  <input
                    type="text"
                    value={property.house_number}
                    onChange={(e) =>
                      handleInputChange("house_number", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Apartment Number
                  </label>
                  <input
                    type="text"
                    value={property.apartment_number}
                    onChange={(e) =>
                      handleInputChange("apartment_number", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Floor Number
                  </label>
                  <input
                    type="text"
                    value={property.floor_number}
                    onChange={(e) =>
                      handleInputChange("floor_number", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-gray-300">
                  Pricing Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Rent per Month
                  </label>
                  <input
                    type="number"
                    value={property.rent_per_month}
                    onChange={(e) =>
                      handleInputChange("rent_per_month", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Total per Month
                  </label>
                  <input
                    type="number"
                    value={property.total_per_month}
                    onChange={(e) =>
                      handleInputChange("total_per_month", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Extra Bills
                  </label>
                  <input
                    type="number"
                    value={property.extra_bills}
                    onChange={(e) =>
                      handleInputChange("extra_bills", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Prepayment Months
                  </label>
                  <input
                    type="number"
                    value={property.num_prepayment_months}
                    onChange={(e) =>
                      handleInputChange(
                        "num_prepayment_months",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-gray-300">
                  Property Details
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[
                  { key: "num_of_bedrooms", label: "Bedrooms" },
                  { key: "num_of_bathrooms", label: "Bathrooms" },
                  { key: "num_of_balconies", label: "Balconies" },
                  { key: "num_of_kitchens", label: "Kitchens" },
                  { key: "num_of_living_rooms", label: "Living Rooms" },
                  { key: "num_of_dining_rooms", label: "Dining Rooms" },
                  { key: "num_of_parking_spaces", label: "Parking Spaces" },
                  { key: "area_in_sqft", label: "Area (sqft)" },
                  { key: "capacity", label: "Capacity" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={property[field.key]}
                      onChange={(e) =>
                        handleInputChange(field.key, parseInt(e.target.value))
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="dark:-border-gray-700 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-gray-300">
                  Availability
                </h2>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div className="md:w-full">
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
                    Available From
                  </label>
                  <input
                    type="date"
                    value={property.available_from}
                    onChange={(e) =>
                      handleInputChange("available_from", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                </div>

                <div className="flex w-full flex-col items-end justify-end gap-4">
                  {/* Available Toggle */}
                  <div className="flex items-center justify-between gap-5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                      Available
                    </label>
                    <button
                      onClick={() =>
                        handleInputChange(
                          "is_available",
                          !property.is_available,
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        property.is_available ? "bg-primary" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ${
                          property.is_available
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center justify-between gap-5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                      Featured
                    </label>
                    <button
                      onClick={() =>
                        handleInputChange("featured", !property.featured)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        property.featured ? "bg-primary" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ${
                          property.featured ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Facilities */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-gray-300">
                Facilities
              </h3>
              <div className="no-scrollbar grid max-h-80 grid-cols-5 gap-3 overflow-y-auto">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    onClick={() => handleFacilityToggle(facility.id)}
                    className={`relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-2 transition-all duration-200 dark:text-gray-300 ${
                      selectedFacilities?.includes(facility.id)
                        ? "border-primary bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-gray-100"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                    }`}
                  >
                    <div className="mb-1 h-8 w-8">
                      <img
                        src={facility.icon}
                        alt={facility.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          // Fallback to a default icon if image fails to load
                          e.target.style.display = "none";
                        }}
                      />
                    </div>

                    <span className="text-center text-xs font-medium leading-tight">
                      {facility.name}
                    </span>

                    {selectedFacilities?.includes(facility.id) && (
                      <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                        <svg
                          className="h-2 w-2 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-200">
              Property Images
            </h2>
            {!isAddingNew && (
              <button
                onClick={() => setIsAddingNew(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 font-semibold text-white transition-all duration-200 hover:from-green-700 hover:to-green-800"
              >
                <Upload className="h-4 w-4" />
                Add Image
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Existing Images */}
            {property?.images?.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-all duration-200 hover:shadow-md dark:border-gray-700"
              >
                <img
                  src={image.image}
                  alt={image.description}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex flex-1 items-center">
                  <textarea
                    value={image.description}
                    onChange={(e) =>
                      handleImageDescriptionChange(index, e.target.value)
                    }
                    className="h-24 w-full rounded-lg border border-slate-300 px-3 py-2 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    placeholder="Image description..."
                  />
                </div>

                <button
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      imageIndex: index,
                      id: image.id,
                    })
                  }
                  className="rounded-lg p-2 text-red-600 transition-colors duration-200 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}

            {/* Add New Image Section */}
            {isAddingNew && (
              <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4 transition-all duration-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-blue-300 transition-colors hover:border-blue-400 dark:border-gray-500">
                  {newImage.image ? (
                    <img
                      src={newImage.image}
                      alt="New upload"
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-center"
                    >
                      <Upload className="mb-1 h-8 w-8 text-blue-400 dark:text-gray-300" />
                      <span className="text-xs text-blue-600 hover:text-blue-800 dark:text-gray-200">
                        Upload
                      </span>
                    </label>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="image-upload"
                  />
                </div>

                <div className="flex flex-1 items-center">
                  <textarea
                    value={newImage.description}
                    onChange={(e) =>
                      setNewImage({ ...newImage, description: e.target.value })
                    }
                    className="h-24 w-full rounded-lg border border-slate-300 px-3 py-2 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    placeholder="Image description..."
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddImage}
                    disabled={!newImage.image || !newImage.description}
                    className="rounded-lg bg-green-700 p-2 text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancelAddImage}
                    className="rounded-lg bg-red-600 p-2 text-white transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200">
                Delete Image
              </h3>
            </div>

            <p className="mb-6 text-slate-600 dark:text-gray-300">
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteModal({ open: false, imageIndex: null })
                }
                className="rounded-lg px-4 py-2 text-slate-600 transition-colors duration-200 hover:bg-slate-100 dark:border dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleDeleteImage(deleteModal.index, deleteModal.id)
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProperty;
