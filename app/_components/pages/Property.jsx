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

      <div className="my-4 flex gap-8">
        <div className="w-[70%]">
          <PropertyDetails />
        </div>

        <div className="my-8 w-[30%]">
          <AppointmentCard />
        </div>
      </div>

      <div className="border-t-2 border-gray-300 py-8">
        <h2 className="text-2xl font-semibold">Where You'll Be</h2>
        <div className="my-4 overflow-hidden rounded-lg">
          <LocationMap lat={23.789103} lng={90.425049} />
        </div>
      </div>
    </div>
  );
}

export default Property;

import Amenities from "@/app/_components/property_details/Amenities";
import LocationMap from "../property_details/LocationMap";

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

      <div className="border-b-2 border-gray-300 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Description</h2>
        <p className="my-2 text-sm">
          This is a spacious and modern villa located in the heart of the city.
          It features a large living room with a beautiful view of the city, a
          kitchen with modern appliances, a spacious bedroom with a private
          bathroom, and a large balcony with a stunning view of the city. The
          villa is equipped with all the amenities you need for a comfortable
          stay.
        </p>
        <p className="my-2 text-sm">
          This is a spacious and modern villa located in the heart of the city.
          It features a large living room with a beautiful view of the city, a
          kitchen with modern appliances, a spacious bedroom with a private
          bathroom, and a large balcony with a stunning view of the city. The
          villa is equipped with all the amenities you need for a comfortable
          stay.
        </p>
        <button className="border-b-2 border-gray-600 text-sm font-semibold">
          Read More
        </button>
      </div>

      <Amenities />
    </div>
  );
}

function AppointmentCard() {
  return (
    <div className="w-full rounded-xl border-2 border-gray-300 p-4 shadow-md">
      <h3 className="text-center text-xl font-semibold">Make an Appointment</h3>

      <div className="my-6 rounded-lg border-2 border-gray-300 py-2 text-sm">
        <p className="border-b-2 border-gray-300 px-4 pb-2">
          Available from 1st May
        </p>
        <p className="border-b-2 border-gray-300 px-4 py-2">5 guest capacity</p>
        <p className="px-4 pt-2 text-base font-bold">
          20,000 BDT <span className="font-light">per month</span>
        </p>
      </div>

      <button className="w-full rounded-lg bg-primary py-3 text-white">
        Book Now
      </button>
    </div>
  );
}
