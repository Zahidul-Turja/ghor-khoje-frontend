"use client";

import React from "react";

const LoadingProfile = () => {
  return (
    <div className="mt-20 min-h-screen overflow-hidden bg-gray-50">
      <div className="flex">
        {/* Left Sidebar Skeleton */}
        <div className="min-h-screen w-64 border-r border-gray-200 bg-white shadow-sm">
          <div className="space-y-6 p-6">
            {/* Navigation Menu Skeleton */}
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-3 rounded-lg p-3"
                >
                  {/* <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div> */}
                  <div className="h-6 flex-1 animate-pulse rounded bg-gray-200"></div>
                </div>
              ))}
            </div>

            {/* Stats Section Skeleton */}
            <div className="space-y-3 border-t pt-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((stat) => (
                  <div key={stat} className="space-y-1 text-center">
                    <div className="h-6 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Cover Image Skeleton */}
          <div className="relative">
            <div className="h-72 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300">
              {/* Cover image loading effect */}
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
            </div>

            {/* Edit Cover Button Skeleton */}
            <div className="absolute right-4 top-4">
              <div className="h-10 w-32 animate-pulse rounded-lg bg-white/20 backdrop-blur-sm"></div>
            </div>
          </div>

          {/* Profile Header Section */}
          <div className="bg-white shadow-sm">
            <div className="mx-auto max-w-4xl px-6">
              <div className="relative pb-6">
                {/* Profile Picture Skeleton */}
                <div className="absolute -top-16 left-0">
                  <div className="h-32 w-32 animate-pulse rounded-full border-4 border-white bg-gray-300">
                    <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  </div>
                  {/* Camera icon skeleton */}
                  <div className="absolute bottom-2 right-2 h-8 w-8 animate-pulse rounded-full bg-gray-400"></div>
                </div>

                {/* Profile Info Skeleton */}
                <div className="pb-4 pt-20">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-3">
                      {/* Name */}
                      <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
                      {/* Bio */}
                      <div className="space-y-2">
                        <div className="h-4 w-80 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-4 w-60 animate-pulse rounded bg-gray-200"></div>
                      </div>
                      {/* Location & Join Date */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="mt-4 flex space-x-3 sm:mt-0">
                      <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"></div>
                      <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200"></div>
                    </div>
                  </div>
                </div>

                {/* Profile Stats Skeleton */}
                <div className="border-t pt-4">
                  <div className="flex space-x-8">
                    {[1, 2, 3, 4].map((stat) => (
                      <div key={stat} className="space-y-1 text-center">
                        <div className="h-6 w-12 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs Skeleton */}
          <div className="border-b bg-white">
            <div className="mx-auto max-w-4xl px-6">
              <div className="flex space-x-8">
                {["Posts", "About", "Photos", "Reviews", "More"].map((tab) => (
                  <div key={tab} className="py-4">
                    <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingProfile;
