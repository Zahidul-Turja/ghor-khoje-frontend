import { BsDot } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import Image from "next/image";

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
              alt="Host"
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

      <div className="py-8">
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
    </div>
  );
}

export default PropertyDetails;
