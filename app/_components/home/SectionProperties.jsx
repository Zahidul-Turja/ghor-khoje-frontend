"use client";

import { useEffect, useState } from "react";

import { MdTune, MdOutlineSort } from "react-icons/md";

import CategoryFilterNav from "@/app/_components/home/CatagoryFilterNav";
import Properties from "./Properties";
import usePlacesStore from "@/app/_store/placesStore";

function SectionProperties() {
  const [page, setPage] = useState(1);
  const { places, isLoading, error, getPlaces } = usePlacesStore();

  useEffect(() => {
    getPlaces(16, page);
  }, [page]);

  return (
    <section className="mx-auto max-w-screen-2xl px-0 py-10 md:px-6 lg:px-8">
      <div className="my-8 flex w-full flex-col items-center justify-between gap-4 rounded-full px-0 shadow-lg md:flex-row">
        <div className="order-2 w-full md:order-1 md:w-[75%] lg:w-[82%]">
          <CategoryFilterNav />
        </div>

        <div className="order-1 flex w-full items-center justify-around gap-2 md:order-2">
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 transition-all hover:bg-gray-100">
            <MdTune className="text-lg" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 transition-all hover:bg-gray-100">
            <MdOutlineSort className="text-lg" />
            <span className="text-sm font-medium">Sort</span>
          </button>
        </div>
      </div>

      {places && Array.isArray(places) && places.length > 0 ? (
        <Properties places={places} />
      ) : (
        <div className="py-8 text-center">
          {isLoading ? "Loading properties..." : "No properties found"}
        </div>
      )}
      <button className="my-8 w-full rounded-lg border border-slate-400 py-6 text-base font-semibold uppercase tracking-widest text-gray-400">
        Load More
      </button>
    </section>
  );
}

export default SectionProperties;
