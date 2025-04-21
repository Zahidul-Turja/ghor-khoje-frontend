"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white px-8 py-8 shadow-lg">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <Listings places={dummyPlaces} />
    </div>
  );
}

import { IoAdd } from "react-icons/io5";

function Listings({ places }) {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const handleMenuClick = (event, id) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY - 70,
      left: rect.left - 20,
    });
    setOpenMenuId(id);
  };

  const handleClickOutside = (event) => {
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
    <div className="p-4">
      <div className="flex items-center justify-between py-2">
        <h2 className="mb-4 text-xl font-semibold">Listings</h2>
        <button className="flex cursor-pointer items-center gap-1 rounded-lg border-2 border-gray-600 px-3 py-1 text-sm font-semibold text-gray-600">
          <span className="text-sm">Add</span>
          <IoAdd className="text-base" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Image</th>
              {/* <th className="border px-4 py-2">Title</th> */}
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Area</th>
              <th className="border px-4 py-2">Rent</th>
              <th className="border px-4 py-2">Beds</th>
              <th className="border px-4 py-2">Baths</th>
              <th className="border px-4 py-2">Capacity</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <Image
                    src={place.image}
                    alt={place.title}
                    width={200}
                    height={200}
                    className="h-12 w-20 rounded object-cover"
                  />
                </td>
                {/* <td className="border px-4 py-2">{place.title}</td> */}
                <td className="border px-4 py-2">{place.category}</td>
                <td className="border px-4 py-2">{place.city}</td>
                <td className="border px-4 py-2">{place.area_name}</td>
                <td className="border px-4 py-2">৳ {place.rent_per_month}</td>
                <td className="border px-4 py-2">{place.num_of_bedrooms}</td>
                <td className="border px-4 py-2">{place.num_of_bathrooms}</td>
                <td className="border px-4 py-2">{place.capacity}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                      place.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {place.is_available ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={(e) => handleMenuClick(e, place.id)}
                    className="text-xl"
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {openMenuId !== null && (
          <div
            ref={menuRef}
            className="fixed z-50 w-28 rounded border bg-white text-sm shadow-md"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
              Details
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
              Edit
            </button>
            <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
