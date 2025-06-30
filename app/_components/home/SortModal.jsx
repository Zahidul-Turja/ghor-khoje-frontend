"use client";

import { useEffect, useState } from "react";
import { MdTune, MdOutlineSort } from "react-icons/md";

import CategoryFilterNav from "@/app/_components/home/CatagoryFilterNav";
import Properties from "./Properties";
import usePlacesStore from "@/app/_store/placesStore";
import Empty from "./Empty";
import FilterModal from "./FilterModal";
import SortModal from "./SortModal";

function SectionProperties() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [numberOfItems, setNumberOfItems] = useState(pageSize);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(true);
  const [isSortModalOpen, setIsSortModalOpen] = useState(true);
  const [filters, setFilters] = useState({ search: "", timeframe: "all" });
  const [sortBy, setSortBy] = useState("default");

  const { places, isLoading, error, getPlaces, nextPage, previousPage } =
    usePlacesStore();

  useEffect(() => {
    const fetchPlaces = async () => {
      await getPlaces(pageSize, page, null, filters, sortBy);
    };

    fetchPlaces();
  }, [page, filters, sortBy]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleApplySort = (newSort) => {
    setSortBy(newSort);
    setPage(1); // Reset to first page when sort changes
  };

  return (
    <section className="mx-auto max-w-screen-2xl px-3 py-8 md:px-6 md:py-10 lg:px-8">
      {/* Filter and Sort Bar */}
      <div className="my-6 flex w-full flex-col gap-4 rounded-2xl bg-white px-4 py-4 shadow-lg md:my-8 md:flex-row md:items-center md:justify-between md:px-6 lg:rounded-full">
        {/* Category Filter Navigation */}
        <div className="order-2 w-full md:order-1 md:w-[70%] lg:w-[75%] xl:w-[80%]">
          <CategoryFilterNav pageSize={pageSize} page={page} />
        </div>

        {/* Filter and Sort Buttons */}
        <div className="order-1 flex w-full items-center justify-center gap-3 md:order-2 md:w-auto md:justify-end">
          <button
            onClick={() => {
              console.log("clicked");
              setIsFilterModalOpen(true);
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 active:scale-95 md:flex-initial"
          >
            <MdTune className="text-lg" />
            <span className="hidden sm:inline">Filters</span>
            {(filters.search || filters.timeframe !== "all") && (
              <span className="ml-1 h-2 w-2 rounded-full bg-blue-500"></span>
            )}
          </button>

          <button
            onClick={() => setIsSortModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 active:scale-95 md:flex-initial"
          >
            <MdOutlineSort className="text-lg" />
            <span className="hidden sm:inline">Sort</span>
            {sortBy !== "default" && (
              <span className="ml-1 h-2 w-2 rounded-full bg-blue-500"></span>
            )}
          </button>
        </div>
      </div>

      {/* Properties Grid or Empty State */}
      {places && Array.isArray(places) && places.length > 0 ? (
        <Properties places={places} />
      ) : (
        <Empty />
      )}

      {/* Load More Button */}
      {places && nextPage && (
        <div className="mt-8 flex justify-center md:mt-12">
          <button
            className="active:scale-98 w-full max-w-md rounded-xl border-2 border-slate-300 py-4 text-base font-semibold uppercase tracking-widest text-gray-600 transition-all hover:border-slate-400 hover:bg-slate-50 md:py-6"
            onClick={() => {
              if (nextPage) {
                setNumberOfItems((current) => current + pageSize);
                getPlaces(numberOfItems, page, null, filters, sortBy);
              }
            }}
          >
            Load More Properties
          </button>
        </div>
      )}

      {/* Modals */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onApplySort={handleApplySort}
        currentSort={sortBy}
      />
    </section>
  );
}

export default SectionProperties;
