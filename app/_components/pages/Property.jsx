import { FaRegHeart } from "react-icons/fa";

import ImageGellary from "@/app/_components/property_details/ImageGellary";
import PropertyDetails from "@/app/_components/property_details/PropertyDetails";
import LocationMap from "@/app/_components/property_details/LocationMap";
import AppointmentCard from "@/app/_components/property_details/AppointmentCard";
import Footer from "@/app/_components/Footer";

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
