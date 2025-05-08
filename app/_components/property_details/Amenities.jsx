"use client";

import { FaWifi, FaSwimmingPool } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { CgGym } from "react-icons/cg";
import { GiCctvCamera } from "react-icons/gi";
import { TbCarGarage, TbAirConditioning } from "react-icons/tb";

import { getAllFacilities } from "@/app/_lib/apiCalls";
import { useEffect, useState } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function Amenities({ amenities }) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfAmenities, setNumberOfAmenities] = useState(20);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getAllFacilities();
        setFacilities(data);
        console.log("Facilities data:", data);
      } catch (error) {
        setError("Failed to fetch facilities");
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className="border-t-2 border-gray-300 py-8">
      <h3 className="mb-4 text-2xl font-semibold">What This Place Offers</h3>
      <div className="grid grid-cols-4">
        {facilities &&
          facilities.slice(0, numberOfAmenities).map((amenity, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 py-2 font-medium ${
                amenities?.some((a) => a.id === amenity.id)
                  ? ""
                  : "text-gray-500 line-through"
              }`}
            >
              <div>
                <Image
                  src={`${amenity.icon}`}
                  alt={amenity.name}
                  width={30}
                  height={30}
                  className="h-6 w-6 object-cover"
                />
              </div>
              <p className="">{amenity.name}</p>
            </div>
          ))}
      </div>

      <button
        className="mt-4 cursor-pointer rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold"
        onClick={() => {
          setNumberOfAmenities((prev) =>
            prev === 20 ? facilities.length : 20,
          );
        }}
      >
        {numberOfAmenities === 20
          ? `Show All Amenities(${facilities.length})`
          : "Show Less"}
      </button>
    </div>
  );
}

export default Amenities;
