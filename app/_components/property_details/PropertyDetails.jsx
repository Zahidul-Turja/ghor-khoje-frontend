import { BsDot } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

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
      <div className="mt-4 sm:mt-6">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Entire villa in Rajshahi, Bangladesh
        </h2>
        <div className="flex flex-wrap items-center text-sm sm:text-base">
          <span>{area_in_sqft} Sqft</span>
          <BsDot className="hidden sm:inline" />
          <span className="ml-2 sm:ml-0">{num_of_bedrooms} Beds</span>
          <BsDot className="hidden sm:inline" />
          <span className="ml-2 sm:ml-0">{num_of_bathrooms} Baths</span>
          <BsDot className="hidden sm:inline" />
          <span className="ml-2 sm:ml-0">{num_of_balconies} Balconies</span>
        </div>
      </div>
      {owner && (
        <div className="flex flex-col gap-4 border-b-2 border-gray-300 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {owner?.profile_image ? (
              <Link
                href={`user/${owner?.id}`}
                className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-full sm:h-16 sm:w-16"
              >
                <Image
                  src={owner?.profile_image}
                  alt="Host"
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </Link>
            ) : (
              <CgProfile className="h-10 w-10 rounded-full text-gray-600 sm:h-12 sm:w-12" />
            )}
            <div>
              <Link
                href={`user/${owner?.id}`}
                className="cursor-pointer text-sm font-semibold sm:text-base"
              >
                Hosted by {owner?.full_name}
              </Link>
              <div className="flex flex-col text-xs sm:flex-row sm:items-center sm:text-sm">
                <p>{owner?.profession}</p>
                <BsDot className="hidden sm:inline" />
                <p className="sm:ml-0">3 years of experience</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-start">
            <div className="flex flex-col items-center">
              <div className="text-base font-bold sm:text-lg">
                {owner?.rating}
              </div>
              <div className="flex text-xs">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <a
              className="border-b-2 border-gray-600 text-sm font-bold sm:text-base"
              href="#reviews"
            >
              Reviews
            </a>
          </div>
        </div>
      )}

      <div className="py-6 sm:py-8">
        <h2 className="mb-3 text-xl font-semibold sm:mb-4 sm:text-2xl">
          Description
        </h2>
        <p className="my-2 text-justify text-sm leading-relaxed sm:text-base md:text-left">
          {description}
        </p>
        <button className="border-b-2 border-gray-600 text-sm font-semibold">
          Read More
        </button>
      </div>
    </div>
  );
}

export default PropertyDetails;
