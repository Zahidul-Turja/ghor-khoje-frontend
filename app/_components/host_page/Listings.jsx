"use client";

import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Property from "./Property";

function Listings({ properties }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  const shownProperties = showMore ? properties : properties.slice(0, 2);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">John's Listings</h2>

        <div className="flex items-center gap-2">
          <div className="cursor-pointer rounded-full border border-gray-400 p-1 opacity-70 transition-all duration-300 hover:opacity-100">
            <FaAngleLeft className="text-xs" />
          </div>
          <div className="cursor-pointer rounded-full border border-gray-400 p-1 opacity-70 transition-all duration-300 hover:opacity-100">
            <FaAngleRight className="text-xs" />
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showMore ? "max-h-[1000px] opacity-100" : "max-h-[400px] opacity-90"
        }`}
      >
        <div className="my-4 grid grid-cols-2 gap-4">
          {shownProperties.map((property) => (
            <Property key={property.id} property={property} />
          ))}
        </div>
      </div>

      {properties.length > 2 && (
        <button
          onClick={toggleShowMore}
          className="mt-3 text-sm font-bold text-gray-700 underline"
        >
          Show {showMore ? "less" : `more (${properties.length - 2})`} listings
        </button>
      )}
    </div>
  );
}

export default Listings;
