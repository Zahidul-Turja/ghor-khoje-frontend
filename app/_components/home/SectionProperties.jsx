"use client";

import { useEffect, useState } from "react";

import { MdTune, MdOutlineSort } from "react-icons/md";

import CategoryFilterNav from "@/app/_components/home/CatagoryFilterNav";
import Properties from "./Properties";
import usePlacesStore from "@/app/_store/placesStore";
import Empty from "./Empty";

function SectionProperties() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [numberOfItems, setNumberOfItems] = useState(pageSize);
  const { places, isLoading, error, getPlaces, nextPage, previousPage } =
    usePlacesStore();

  useEffect(() => {
    const fetchPlaces = async () => {
      await getPlaces(pageSize, page);
    };

    fetchPlaces();
  }, [page]);

  return (
    <section className="mx-auto max-w-screen-2xl px-0 py-10 md:px-6 lg:px-8">
      <div className="my-8 flex w-full flex-col items-center justify-between gap-4 rounded-full px-6 shadow-lg md:flex-row">
        <div className="order-2 w-full md:order-1 md:w-[75%] lg:w-[82%]">
          <CategoryFilterNav pageSize={pageSize} page={page} />
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
        <Empty />
      )}

      {places && nextPage && (
        <button
          className="my-8 w-full rounded-lg border border-slate-400 py-6 text-base font-semibold uppercase tracking-widest text-gray-400"
          onClick={() => {
            if (nextPage) {
              // setPage(page + 1);

              setNumberOfItems((current) => current + pageSize);
              // setPage((current) => current + 1);
              getPlaces(numberOfItems, page);
            }
          }}
        >
          Load More
        </button>
      )}
    </section>
  );
}

export default SectionProperties;
