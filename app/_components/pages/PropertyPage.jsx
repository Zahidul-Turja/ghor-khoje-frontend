"use client";

import { FaRegHeart } from "react-icons/fa";

import ImageGellary from "@/app/_components/property_details/ImageGellary";
import PropertyDetails from "@/app/_components/property_details/PropertyDetails";
import LocationMap from "@/app/_components/property_details/LocationMap";
import AppointmentCard from "@/app/_components/property_details/AppointmentCard";
import Amenities from "@/app/_components/property_details/Amenities";
import Reviews from "@/app/_components/property_details/Reviews";
import { usePathname } from "next/navigation";

import usePlacesStore from "@/app/_store/placesStore";
import { useEffect } from "react";

function PropertyPage() {
  let path = usePathname();
  path = path.replace("/", "");

  const { getPlace, place } = usePlacesStore();

  useEffect(() => {
    getPlace(path);
  }, []);

  return (
    <div className="mx-auto my-4 max-w-screen-2xl">
      <div className="my-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{place?.title}</h1>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-gray-300">
          <FaRegHeart className="" />
          <span>Save</span>
        </div>
      </div>

      {place && <ImageGellary images={place?.images} />}

      <div className="my-4 flex gap-8">
        <div className="w-[70%]">
          <PropertyDetails
            owner={place?.owner}
            description={place?.description}
          />
          <Amenities />
        </div>

        <div className="sticky top-16 my-8 h-fit w-[30%]">
          <AppointmentCard />
        </div>
      </div>

      <div className="border-t-2 border-gray-300 py-8">
        <h2 className="text-2xl font-semibold">Where You'll Be</h2>
        <div className="my-4 overflow-hidden rounded-lg">
          {place && (
            <LocationMap lat={place?.latitude} lng={place?.longitude} />
          )}
        </div>
      </div>

      <div className="border-t-2 border-gray-300 py-8" id="reviews">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="my-4 overflow-hidden rounded-lg">
          {place && <Reviews />}
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
