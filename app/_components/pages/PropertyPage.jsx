"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";

import ImageGellary from "@/app/_components/property_details/ImageGellary";
import PropertyDetails from "@/app/_components/property_details/PropertyDetails";
import LocationMap from "@/app/_components/property_details/LocationMap";
import AppointmentCard from "@/app/_components/property_details/AppointmentCard";
import Amenities from "@/app/_components/property_details/Amenities";
import Reviews from "@/app/_components/property_details/Reviews";
import ChatIcon from "@/app/_components/ChatIcon";

import usePlacesStore from "@/app/_store/placesStore";
import ImagesModal from "../property_details/ImagesModal";
import BookingModal from "../property_details/BookingModal";

import { reviewPlace } from "@/app/_lib/reviewCalls";

function PropertyPage() {
  const [openModal, setOpenModal] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  let path = usePathname();
  path = path.replace("/", "");

  const { getPlace, place } = usePlacesStore();

  useEffect(() => {
    getPlace(path);
  }, [path]);

  const handleSubmitReview = async (reviewData) => {
    try {
      await reviewPlace(place?.slug, reviewData);
      await getPlace(path);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      {openBookingModal && (
        <BookingModal
          isOpen={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
          propertyData={place}
        />
      )}
      <div className="mx-auto my-4 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="my-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl">{place?.title}</h1>
          <div className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 hover:bg-gray-300 sm:px-2 sm:py-1">
            <FaRegHeart className="" />
            <span>Save</span>
          </div>
        </div>

        {place && (
          <ImageGellary
            images={place?.images}
            onOpen={() => setOpenModal(true)}
          />
        )}

        {place && openModal && (
          <ImagesModal
            images={place?.images}
            onClose={() => {
              setOpenModal(false);
            }}
          />
        )}

        <div className="my-4 flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="w-full lg:w-[65%]">
            <PropertyDetails
              owner={place?.owner}
              description={place?.description}
              num_of_bedrooms={place?.num_of_bedrooms}
              num_of_bathrooms={place?.num_of_bathrooms}
              num_of_balconies={place?.num_of_balconies}
              area_in_sqft={place?.area_in_sqft}
            />
            <Amenities amenities={place?.facilities} />
          </div>

          <div className="w-full lg:sticky lg:top-16 lg:my-8 lg:h-fit lg:w-[35%]">
            <AppointmentCard
              available_from={place?.available_from}
              capacity={place?.capacity}
              rent_per_month={place?.rent_per_month}
              extra_bills={place?.extra_bills}
              num_prepayment_months={place?.num_prepayment_months}
              total_per_month={place?.total_per_month}
              setOpenBookingModal={setOpenBookingModal}
            />
          </div>
        </div>

        <div className="border-t-2 border-gray-300 py-6 sm:py-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Where You'll Be</h2>
          <div className="my-4 overflow-hidden rounded-lg">
            {place && (
              <LocationMap lat={place?.latitude} lng={place?.longitude} />
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-300 py-6 sm:py-8" id="reviews">
          <h2 className="text-xl font-semibold sm:text-2xl">Reviews</h2>
          {place && (
            <div className="my-4 overflow-hidden rounded-lg">
              <Reviews
                reviews={place?.reviews}
                avgRatings={place?.avg_ratings}
                onSubmitReview={handleSubmitReview}
              />
            </div>
          )}
        </div>

        {place?.owner && <ChatIcon receiver={place?.owner} />}
      </div>
    </>
  );
}

export default PropertyPage;
