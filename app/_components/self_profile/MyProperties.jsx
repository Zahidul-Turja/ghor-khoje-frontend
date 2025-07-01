"use client";

import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { ImFilesEmpty } from "react-icons/im";
import { CiWarning } from "react-icons/ci";

import AddPropertyModal from "./AddPropertyModal";
import Listings from "./Listings";
import ApplyForHostModal from "../ApplyForHostModal";

import {
  getUserProperties,
  createProperty,
  applyForHost,
  hasAppliedForHost,
} from "@/app/_lib/apiCalls";
import useAuthStore from "@/app/_store/authStore";
import toast from "react-hot-toast";

export default function MyProperties() {
  const { user, userInfo } = useAuthStore();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getUserProperties();
        setPlaces(response.results);
        setNextPage(response.next);
        setPrevPage(response.previous);
        setTotalPages(response.count);

        const appliedResponse = await hasAppliedForHost();
        setHasApplied(appliedResponse.has_applied || false);

        console.log("Properties fetched:", response);
        console.log("Has applied for host:", appliedResponse);
        console.log("has appliedForHost State:", hasApplied);
      } catch (error) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleHostSubmission = async () => {
    try {
      await applyForHost();
      setShowApplyModal(false);

      const appliedResponse = await hasAppliedForHost();
      setHasApplied(appliedResponse.has_applied || false);
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  const handleSubmit = (formData) => {
    createProperty(formData)
      .then((response) => {
        console.log("Property created:", response);
        setPlaces((prevPlaces) => [response?.data, ...prevPlaces]);
        console.log("Places after submit:", places);
      })
      .catch((error) => {
        console.error("Error creating property:", error);
      });
    setShowModal(false);
  };

  if (user?.user_type !== "LANDLORD") {
    if (hasApplied) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950 sm:p-8">
            <div className="text-center">
              <h1 className="mb-4 text-xl font-bold text-primary sm:text-2xl lg:text-3xl">
                Your Application is Under Review
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                Thank you for applying to become a landlord. Our team will
                review your application and get back to you soon.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {showApplyModal && (
          <ApplyForHostModal
            setShowModal={setShowApplyModal}
            handleHostSubmission={handleHostSubmission}
          />
        )}
        <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <h1 className="mb-4 flex items-center justify-center text-xl font-bold text-primary sm:text-2xl lg:text-3xl">
                <CiWarning className="mr-2 text-2xl sm:text-3xl lg:text-4xl" />
                Landlord Access Required
              </h1>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                You need to be a landlord to access the property dashboard. If
                you believe this is an error, please contact support or apply to
                become a landlord.
              </p>
              <button
                className="w-full rounded-lg bg-primary/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 dark:text-gray-300 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                onClick={() => setShowApplyModal(true)}
              >
                Apply to become a Landlord
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showModal && (
        <AddPropertyModal
          onClose={() => setShowModal(false)}
          onSubmit={(formData) => {
            handleSubmit(formData);
          }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Property Dashboard
            </h1>

            {/* Add Property Button - Mobile */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary/80 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90 sm:hidden"
            >
              <IoMdAdd className="text-lg" />
              Add Property
            </button>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"></div>
              </div>
            )}

            {error && (
              <div className="p-4 text-center text-red-500 sm:p-6">{error}</div>
            )}

            {!loading && !error && (
              <>
                {places?.length > 0 ? (
                  <Listings
                    places={places}
                    handleSubmit={(formData) => handleSubmit(formData)}
                  />
                ) : (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center sm:gap-6 sm:p-16">
                    <ImFilesEmpty className="h-16 w-16 text-gray-400 sm:h-20 sm:w-20" />
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-gray-700 sm:text-xl">
                        No Properties Found
                      </h2>
                      <p className="text-sm text-gray-500 sm:text-base">
                        Start by adding your first property to the dashboard
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center gap-2 rounded-lg bg-primary/80 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90 sm:px-6 sm:py-3 sm:text-base"
                    >
                      <IoMdAdd className="text-lg sm:text-xl" />
                      Add New Property
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
