import { BsDot } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import Image from "next/image";
import { CgProfile } from "react-icons/cg";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function PropertyDetails({
  owner,
  description,
  area_in_sqft,
  num_of_bedrooms,
  num_of_bathrooms,
  num_of_balconies,
}) {
  return (
    <div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">
          Entire villa in Rajshahi, Bangladesh
        </h2>
        <p className="flex items-center">
          <span>{area_in_sqft} Sqft</span>
          <BsDot />
          <span>{num_of_bedrooms} Beds</span>
          <BsDot />
          <span>{num_of_bathrooms} Baths</span>
          <BsDot />
          <span>{num_of_balconies} Balconies</span>
        </p>
      </div>
      {owner && (
        <div className="flex items-center justify-between border-b-2 border-gray-300 py-4">
          <div className="flex items-center gap-4">
            {owner?.profile_image ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={BASE_URL + owner?.profile_image}
                  alt="Host"
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </div>
            ) : (
              <CgProfile className="h-12 w-12 rounded-full text-gray-600" />
            )}
            <div>
              <h3 className="font-bold">Hosted by {owner?.full_name}</h3>
              <div className="flex items-center text-sm">
                <p>{owner?.profession}</p> <BsDot />
                <p>3 years of experience</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">{owner?.rating}</div>
              <div className="flex text-xs">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <a className="border-b-2 border-gray-600 font-bold" href="#reviews">
              Reviews
            </a>
          </div>
        </div>
      )}

      <div className="py-8">
        <h2 className="mb-4 text-2xl font-semibold">Description</h2>
        <p className="my-2 text-sm">{description}</p>
        <button className="border-b-2 border-gray-600 text-sm font-semibold">
          Read More
        </button>
      </div>
    </div>
  );
}

export default PropertyDetails;
