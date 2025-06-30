"use client";

import { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

function FilterModal({ isOpen, onClose, onApplyFilters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");

  const timeframes = [
    { value: "all", label: "All time" },
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
  ];

  const handleApply = () => {
    onApplyFilters({
      search: searchTerm,
      timeframe: selectedTimeframe,
    });
    onClose();
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedTimeframe("all");
    onApplyFilters({
      search: "",
      timeframe: "all",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <MdClose className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Search Properties
          </label>
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Time Filter */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="space-y-2">
            {timeframes.map((timeframe) => (
              <label
                key={timeframe.value}
                className="flex cursor-pointer items-center rounded-lg p-2 transition-colors hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="timeframe"
                  value={timeframe.value}
                  checked={selectedTimeframe === timeframe.value}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{timeframe.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 rounded-xl bg-black px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
