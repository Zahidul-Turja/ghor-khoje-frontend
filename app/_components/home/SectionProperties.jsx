"use client";

import { useEffect, useRef, useState } from "react";
import { MdTune } from "react-icons/md";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const fetchPlaces = async () => {
      await getPlaces(pageSize, page);
    };
    fetchPlaces();
  }, [page]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  return (
    <section className="mx-auto max-w-screen-2xl px-3 py-8 md:px-6 md:py-10 lg:px-8">
      {/* Filter and Sort Bar */}
      <div className="my-6 flex w-full flex-col gap-4 rounded-2xl bg-white px-4 py-4 shadow-lg md:my-8 md:flex-row md:items-center md:justify-between md:px-6 lg:rounded-full">
        {/* Category Filter Navigation */}
        <div className="order-2 w-full md:order-1 md:w-[80%] lg:w-[80%] xl:w-[85%]">
          <CategoryFilterNav pageSize={pageSize} page={page} />
        </div>

        {/* Combined Filter & Sort Button */}
        <div className="order-1 flex w-full items-center justify-center gap-3 md:order-2 md:w-auto md:justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 active:scale-95 md:flex-initial"
          >
            <MdTune className="text-lg" />
            <span className="hidden sm:inline">Filters & Sort</span>
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
                getPlaces(numberOfItems, page);
              }
            }}
          >
            Load More Properties
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters & Sort</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search places..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Date Range Filter */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="flex flex-wrap gap-2">
                {["7", "30", "90", "all"].map((day) => (
                  <button
                    key={day}
                    onClick={() => setDateFilter(day)}
                    className={`rounded-full border px-4 py-1 text-sm ${
                      dateFilter === day
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {day === "all" ? "All" : `Last ${day} days`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sort by Price
              </label>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="low"
                    checked={sortOrder === "low"}
                    onChange={() => setSortOrder("low")}
                  />
                  Low to High
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="high"
                    checked={sortOrder === "high"}
                    onChange={() => setSortOrder("high")}
                  />
                  High to Low
                </label>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SectionProperties;
