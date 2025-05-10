"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoEllipsisVertical, IoSearch } from "react-icons/io5";
import { IoMdBed } from "react-icons/io";
import { FaBath, FaUsers } from "react-icons/fa";
import AddPropertyModal from "./AddPropertyModal";

import { getUserProperties } from "@/app/_lib/apiCalls";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

const dummyPlaces = [
  {
    id: 1,
    title: "Sunny Apartment",
    slug: "sunny-apartment",
    category: "Apartment",
    city: "Dhaka",
    area_name: "Gulshan",
    rent_per_month: 15000,
    num_of_bedrooms: 2,
    num_of_bathrooms: 1,
    capacity: 2,
    is_available: true,
    image: "/house-1.jpg",
  },
  {
    id: 2,
    title: "Cozy Studio",
    slug: "cozy-studio",
    category: "Studio",
    city: "Chattogram",
    area_name: "Panchlaish",
    rent_per_month: 12000,
    num_of_bedrooms: 1,
    num_of_bathrooms: 1,
    capacity: 1,
    is_available: false,
    image: "/house-2.jpg",
  },
  {
    id: 3,
    title: "Family House",
    slug: "family-house",
    category: "House",
    city: "Khulna",
    area_name: "Sonadanga",
    rent_per_month: 20000,
    num_of_bedrooms: 3,
    num_of_bathrooms: 2,
    capacity: 4,
    is_available: true,
    image: "/house-3.jpg",
  },
  {
    id: 4,
    title: "Family House",
    slug: "family-house",
    category: "House",
    city: "Khulna",
    area_name: "Sonadanga",
    rent_per_month: 20000,
    num_of_bedrooms: 3,
    num_of_bathrooms: 2,
    capacity: 4,
    is_available: true,
    image: "/house-3.jpg",
  },
  {
    id: 5,
    title: "Family House",
    slug: "family-house",
    category: "House",
    city: "Khulna",
    area_name: "Sonadanga",
    rent_per_month: 20000,
    num_of_bedrooms: 3,
    num_of_bathrooms: 2,
    capacity: 4,
    is_available: true,
    image: "/house-3.jpg",
  },
  {
    id: 6,
    title: "Family House",
    slug: "family-house",
    category: "House",
    city: "Khulna",
    area_name: "Sonadanga",
    rent_per_month: 20000,
    num_of_bedrooms: 3,
    num_of_bathrooms: 2,
    capacity: 4,
    is_available: true,
    image: "/house-3.jpg",
  },
  {
    id: 7,
    title: "Family House",
    slug: "family-house",
    category: "House",
    city: "Khulna",
    area_name: "Sonadanga",
    rent_per_month: 20000,
    num_of_bedrooms: 3,
    num_of_bathrooms: 2,
    capacity: 4,
    is_available: true,
    image: "/house-3.jpg",
  },
];

export default function Dashboard() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getUserProperties();
        setPlaces(response);

        console.log("Properties fetched:", response);
      } catch (error) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 shadow-lg">
      <div className="mx-auto px-8 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Property Dashboard
        </h1>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"></div>
            </div>
          )}
          {error && <div className="p-4 text-red-500">{error}</div>}
          {!loading && !error && places?.length > 0 && (
            <Listings places={places} />
          )}
        </div>
      </div>
    </div>
  );
}

function Listings({ places }) {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef(null);

  const filteredPlaces = places.filter(
    (place) =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.area_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      {showModal && <AddPropertyModal onClose={() => setShowModal(false)} />}
      <div>
        <div className="border-b border-gray-100">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Properties for Rent
              </h2>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {places.length}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <IoSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-primary/40 focus:ring-primary/40"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="flex items-center gap-2 rounded-lg bg-primary/90 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-primary"
                onClick={() => setShowModal(true)}
              >
                <IoAdd className="text-lg" />
                <span>Add Property</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
                  key={place.id}
                  className="border-b bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {place.images[0]?.image ? (
                          <Image
                            src={`${place.images[0]?.image}`}
                            alt={place.title}
                            width={200}
                            height={200}
                            className="h-12 w-16 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-md border border-gray-200">
                            <Image
                              src={"/property-placeholder-colored.png"}
                              alt={place.title}
                              width={200}
                              height={200}
                              className="my-auto h-8 w-8 rounded-md object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {place.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {place.category.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{place.city}</div>
                    <div className="text-xs text-gray-500">
                      {place.area_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ৳ {place.rent_per_month.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <IoMdBed className="mr-1" />
                        <span>{place.num_of_bedrooms}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaBath className="mr-1" size={14} />
                        <span>{place.num_of_bathrooms}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaUsers className="mr-1" size={14} />
                        <span>{place.capacity}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        place.is_available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {place.is_available ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => handleMenuClick(e, place.id)}
                      className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
                    >
                      <IoEllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPlaces.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              No properties found matching your search.
            </div>
          )}

          {openMenuId !== null && (
            <div
              ref={menuRef}
              className="fixed z-50 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-lg"
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
              }}
            >
              <button className="flex w-full items-center px-4 py-2.5 text-left transition-colors hover:bg-gray-50">
                <span className="text-gray-700">View Details</span>
              </button>
              <button className="flex w-full items-center px-4 py-2.5 text-left transition-colors hover:bg-gray-50">
                <span className="text-gray-700">Edit Property</span>
              </button>
              <button className="flex w-full items-center border-t border-gray-100 px-4 py-2.5 text-left transition-colors hover:bg-gray-50">
                <span className="text-red-600">Delete</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredPlaces.length}</span>{" "}
            of <span className="font-medium">{places.length}</span> properties
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
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
