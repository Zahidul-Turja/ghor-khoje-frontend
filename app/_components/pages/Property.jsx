import { FaRegHeart, FaStar } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

import ImageGellary from "@/app/_components/property_details/ImageGellary";
import Image from "next/image";

function Property() {
  return (
    <div className="mx-auto my-4 max-w-screen-2xl">
      <div className="my-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          ALPHA HOUSE, Design villa w full concierge service
        </h1>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-gray-300">
          <FaRegHeart className="" />
          <span>Save</span>
        </div>
      </div>
      <ImageGellary />

      <div className="my-4 flex gap-4">
        <div className="w-[70%]">
          <PropertyDetails />
        </div>

        <div className="">
          <AppointmentCard />
        </div>
      </div>
    </div>
  );
}

export default Property;

function PropertyDetails() {
  return (
    <div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">
          Entire villa in Rajshahi, Bangladesh
        </h2>
        <p className="flex items-center">
          <span>1400 Sqft</span>
          <BsDot />
          <span>5 Beds</span>
          <BsDot />
          <span>5 Baths</span>
          <BsDot />
          <span>2 Balconies</span>
        </p>
      </div>

      <div className="flex items-center justify-between border-b-2 border-gray-300 py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={"/profile-1.jpg"}
              width={1000}
              height={1000}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold">Hosted by John Doe</h3>
            <div className="flex items-center text-sm">
              <p>Engineer</p> <BsDot />
              <p>3 years of experience</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold">4.83</div>
            <div className="flex text-xs">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <button className="border-b-2 border-gray-600 font-bold">
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

function AppointmentCard() {
  return (
    <div className="rounded-lg border-2 border-gray-300 p-4 shadow-md">
      <h3 className="text-xl font-bold">Book Now</h3>
    </div>
  );
}
