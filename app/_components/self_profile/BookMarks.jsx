"use client";

import { Construction } from "lucide-react";
import InProgress from "../InProgress";

import { getBookmarkedPlaces } from "@/app/_lib/apiCalls";
import { useEffect, useState } from "react";
import Properties from "../home/Properties";
import { IoBookmark } from "react-icons/io5";

function BookMarks() {
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);

  useEffect(() => {
    const fetchBookmarkedPlaces = async () => {
      try {
        const res = await getBookmarkedPlaces();
        console.log("Bookmarked places:", res.places);
        setBookmarkedPlaces(res.places);
      } catch (error) {
        console.error("Error fetching bookmarked places:", error);
      }
    };

    fetchBookmarkedPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary/70 to-primary/90 shadow-lg">
                <IoBookmark className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Bookmarks
              </h1>
              <p className="mt-1 text-gray-600">
                You've bookmarked these places
              </p>
            </div>
          </div>
        </div>

        {bookmarkedPlaces && bookmarkedPlaces?.length > 0 && (
          <div className="mt-6">
            <Properties places={bookmarkedPlaces} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookMarks;
