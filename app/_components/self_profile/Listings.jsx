"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FaBath, FaUsers } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { IoAdd, IoEllipsisVertical, IoSearch } from "react-icons/io5";
import AddPropertyModal from "./AddPropertyModal";
import Link from "next/link";

import { deletePlace } from "@/app/_lib/apiCalls";

function Listings({
  places,
  handleSubmit,
  setEditPropertySlug,
  setEditProperty,
}) {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const menuRef = useRef(null);

  // Add this useEffect to sync filteredPlaces with places prop changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter(
        (place) =>
          place?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place?.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place?.area_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPlaces(filtered);
    }
  }, [places, searchTerm]);

  const handleMenuClick = (event, id) => {
    event.stopPropagation();

    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY - 70,
        left: rect.left - 100,
      });
      setOpenMenuId(id);
    }
  };

  const handleClickOutside = (event) => {
    event.stopPropagation();
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null);
    }
  };

  const handleDeleteProperty = async (slug) => {
    try {
      await deletePlace(slug);
      setFilteredPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.slug !== slug),
      );
      setOpenMenuId(null);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  useEffect(() => {
    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  return (
    <>
      {showModal && (
        <AddPropertyModal
          onClose={() => setShowModal(false)}
          onSubmit={(formData) => handleSubmit(formData)}
        />
      )}
      <div>
        {/* Header Section */}
        <div className="border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 sm:text-xl">
                Properties for Rent
              </h2>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {places.length}
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <IoSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-primary/40 focus:ring-primary/40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-3 sm:text-base"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Add Property Button - Hidden on mobile (shown in parent component) */}
              <button
                className="hidden items-center gap-2 rounded-lg bg-primary/90 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-primary sm:flex"
                onClick={() => setShowModal(true)}
              >
                <IoAdd className="text-lg" />
                <span>Add Property</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Details</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place) => (
                <tr
                  onClick={() => {
                    setEditPropertySlug(place?.slug);
                    setEditProperty(true);
                  }}
                  key={place?.id}
                  className="cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {place?.image ? (
                          <Image
                            src={`${place?.image}`}
                            alt={place?.title}
                            width={200}
                            height={200}
                            className="h-12 w-16 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-md border border-gray-200 dark:border-gray-700">
                            <Image
                              src={"/property-placeholder-colored.png"}
                              alt={place?.title}
                              width={200}
                              height={200}
                              className="my-auto h-8 w-8 rounded-md object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <td className="font-medium text-gray-900 dark:text-gray-300">
                          {place?.title}
                        </td>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {place?.category.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{place?.city}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {place?.area_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ৳ {place?.rent_per_month.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <IoMdBed className="mr-1" />
                        <span>{place?.num_of_bedrooms}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FaBath className="mr-1" size={14} />
                        <span>{place?.num_of_bathrooms}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FaUsers className="mr-1" size={14} />
                        <span>{place?.capacity}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        place?.is_available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {place?.is_available ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => handleMenuClick(e, place?.id)}
                      className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
                    >
                      <IoEllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="block lg:hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPlaces.map((place) => (
              <div
                key={place?.id}
                className="bg-white p-4 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-4">
                  {/* Property Image */}
                  <div className="flex-shrink-0">
                    {place?.image ? (
                      <Image
                        src={`${place?.image}`}
                        alt={place?.title}
                        width={200}
                        height={200}
                        className="h-16 w-20 rounded-md object-cover sm:h-20 sm:w-24"
                      />
                    ) : (
                      <div className="flex h-16 w-20 items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 sm:h-20 sm:w-24">
                        <Image
                          src={"/property-placeholder-colored.png"}
                          alt={place?.title}
                          width={200}
                          height={200}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-200 sm:text-base">
                          {place?.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                          {place?.category.name}
                        </p>
                      </div>

                      {/* Actions Menu */}
                      <button
                        onClick={(e) => handleMenuClick(e, place?.id)}
                        className="ml-2 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <IoEllipsisVertical />
                      </button>
                    </div>

                    {/* Location */}
                    <div className="mt-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {place?.city}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {place?.area_name}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-200 sm:text-xl">
                        ৳ {place?.rent_per_month.toLocaleString()}
                      </p>
                    </div>

                    {/* Property Details */}
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                      <div className="flex items-center">
                        <IoMdBed className="mr-1 text-sm" />
                        <span>{place?.num_of_bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBath className="mr-1 text-xs" />
                        <span>{place?.num_of_bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="mr-1 text-xs" />
                        <span>{place?.capacity}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          place?.is_available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {place?.is_available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {filteredPlaces.length === 0 && (
          <div className="py-10 text-center text-gray-500 dark:text-gray-400 sm:py-16">
            <p className="text-sm sm:text-base">
              No properties found matching your search.
            </p>
          </div>
        )}

        {/* Action Menu */}
        {openMenuId !== null && (
          <div
            ref={menuRef}
            className="fixed z-50 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <Link
              href={`/${places.find((p) => p.id === openMenuId)?.slug}`}
              className="flex w-full items-center px-4 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="text-gray-700 dark:text-gray-300">
                View Details
              </span>
            </Link>
            <button
              onClick={() => {
                setEditPropertySlug(
                  places.find((p) => p.id === openMenuId)?.slug,
                );
                setEditProperty(places.find((p) => p.id === openMenuId));
                setShowModal(false);
              }}
              className="flex w-full items-center px-4 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="text-gray-700 dark:text-gray-300">
                Edit Property
              </span>
            </button>
            <button
              onClick={() =>
                handleDeleteProperty(
                  places.find((p) => p.id === openMenuId)?.slug,
                )
              }
              className="flex w-full items-center border-t border-gray-100 px-4 py-2.5 text-left transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="text-red-600">Delete</span>
            </button>
          </div>
        )}

        {/* Footer/Pagination */}
        <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="text-center text-sm text-gray-500 sm:text-left">
            Showing <span className="font-medium">{filteredPlaces.length}</span>{" "}
            of <span className="font-medium">{places?.length}</span> properties
          </div>
          <div className="flex items-center justify-center space-x-2 sm:justify-end">
            <button
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listings;
