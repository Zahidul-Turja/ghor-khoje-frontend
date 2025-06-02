"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { HiMiniFlag } from "react-icons/hi2";

import { aboutHost } from "@/app/_lib/apiCalls";

function UserHostPage() {
  const user_id = usePathname().replace("/user/", "");
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        setLoading(true);
        const data = await aboutHost(user_id);
        setHost(data.data);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchHostData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!host) {
    return (
      <div className="flex h-screen items-center justify-center">
        Host not found
      </div>
    );
  }

  return (
    <div className="flex justify-between px-52 py-8">
      <div className="sticky top-8 flex h-screen w-[30%] flex-col gap-8">
        <ProfileCard host={host} />
        <ProfileInfoCard host={host} />
      </div>

      <div className="w-[65%]">
        <ProfileDescription host={host} />
      </div>
    </div>
  );
}

export default UserHostPage;

import { MdVerifiedUser } from "react-icons/md";

function ProfileCard({ host }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl px-8 py-6 shadow-[0px_6px_16px_rgba(0,0,0,0.15)]">
      <div className="text-center">
        <div className="relative">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
            <Image
              src={host?.profile_image}
              alt="Host Profile"
              width={1000}
              height={1000}
            />
          </div>
          <div className="absolute bottom-2 right-2 rounded-full bg-primary p-1 text-white">
            <MdVerifiedUser className="text-sm" />
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-bold">{host?.full_name}</h3>
          <p className="text-xs font-medium">
            {host?.profession} by Profession
          </p>
        </div>
      </div>

      <div>
        <div className="py-2">
          <h3 className="text-base font-extrabold">
            {host?.reviews?.length || 0}
          </h3>
          <p className="text-xs font-medium">Reviws</p>
        </div>
        <div className="border-y border-gray-300 py-2">
          <h3 className="text-base font-extrabold">{host?.average_rating}</h3>
          <p className="text-xs font-medium">Rating</p>
        </div>
        <div className="py-2">
          <h3 className="text-base font-extrabold">
            {host?.hosted_places?.length || 0}
          </h3>
          <p className="text-xs font-medium">Places hosted</p>
        </div>
      </div>
    </div>
  );
}

import { SiVerizon } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";

function ProfileInfoCard({ host }) {
  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-300 p-4">
        <h3 className="text-lg font-semibold">John's Confirmed Information</h3>
        <div className="px-4 pt-2">
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            {host?.profession ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Profession</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            {host?.email ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Email</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            {host?.phone ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Phone</p>
          </div>
          <div className="flex gap-2 px-2 py-2">
            {host?.address ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Address</p>
          </div>
        </div>
      </div>
      <Link href={"/"} className="my-5 flex items-center gap-2">
        <HiMiniFlag className="text-sm" />
        <span className="text-xs font-bold underline">Report this user</span>
      </Link>
    </div>
  );
}

import { GrMapLocation } from "react-icons/gr";

function ProfileDescription({ host }) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold">About {host?.full_name}</h2>

      <div className="my-6 flex items-center gap-2">
        <GrMapLocation />{" "}
        <span className="text-sm">Lives in {host?.address?.address}</span>
      </div>

      <p className="text-justify text-sm font-medium tracking-wider">
        {host?.bio}
      </p>

      <Reviews reviews={host?.reviews} name={host?.full_name} />

      <Listings property={host?.hosted_places} />
    </div>
  );
}

function Reviews({ reviews = [], name = "Guest" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Determine how many reviews to show
  const reviewsToShow = showAll ? reviews : reviews.slice(0, 2);
  const visibleReviews = reviewsToShow.slice(currentIndex, currentIndex + 2);

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex + 2 < reviewsToShow.length;

  const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShowMore = () => {
    setShowAll(true);
    setCurrentIndex(0);
  };

  // Don't render if no reviews
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="my-8 border-y border-gray-300 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{name.split(" ")[0]}'s Reviews</h2>

        {reviewsToShow.length > 2 && (
          <div className="flex items-center gap-2">
            <div
              className={`cursor-pointer rounded-full border border-gray-400 p-1 transition-all duration-300 ${
                canGoLeft
                  ? "opacity-70 hover:opacity-100"
                  : "cursor-not-allowed opacity-30"
              }`}
              onClick={handlePrevious}
            >
              <FaAngleLeft className="text-xs" />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-gray-400 p-1 transition-all duration-300 ${
                canGoRight
                  ? "opacity-70 hover:opacity-100"
                  : "cursor-not-allowed opacity-30"
              }`}
              onClick={handleNext}
            >
              <FaAngleRight className="text-xs" />
            </div>
          </div>
        )}
      </div>

      <div className="my-4 flex items-start gap-2">
        {visibleReviews.map((review, index) => (
          <div
            key={review.id || index}
            className="h-44 w-1/2 rounded-xl border border-gray-300 p-4"
          >
            <p className="line-clamp-4 text-xs font-medium leading-5">
              {review.review_text}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={review.reviewer.profile_image || "/profile-1.jpg"}
                  alt="Reviewer Profile"
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {review.reviewer.full_name}
                </h3>
                <p className="text-xs">{review.timeAgo}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Fill empty space if only one review is visible */}
        {visibleReviews.length === 1 && <div className="w-1/2"></div>}
      </div>

      {!showAll && reviews.length > 2 && (
        <button
          onClick={handleShowMore}
          className="mt-3 cursor-pointer border-none bg-transparent p-0 text-sm font-bold text-gray-700 underline"
        >
          Show more reviews ({reviews.length - 2} more)
        </button>
      )}
    </div>
  );
}

const dummy_properties_data = [
  {
    id: 1,
    slug: "property-1",
    image: "/house-1.jpg",
    title: "Property 1",
    address: "Bangkok, Thailand",
    description:
      "We loved our stay at this villa. Putu and all the staff went above and beyond. Our breakfast was amazing every day. ",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 2,
    slug: "property-2",
    image: "/house-2.jpg",
    title: "Property 2",
    address: "Dhaka, Bangladesh",
    description:
      "We loved our stay at this villa. Putu and all the staff went above and beyond. Our breakfast was amazing every day. ",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
];

function Listings({ property }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">John's Listings</h2>

        <div className="flex items-center gap-2">
          <div className="cursor-pointer rounded-full border border-gray-400 p-1 opacity-70 transition-all duration-300 hover:opacity-100">
            <FaAngleLeft className="text-xs" />
          </div>
          <div className="cursor-pointer rounded-full border border-gray-400 p-1 opacity-70 transition-all duration-300 hover:opacity-100">
            <FaAngleRight className="text-xs" />
          </div>
        </div>
      </div>

      <div className="my-4 flex items-center gap-3">
        {dummy_properties_data.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>

      <Link
        href={"/"}
        className="mt-3 text-sm font-bold text-gray-700 underline"
      >
        Show more listings
      </Link>
    </div>
  );
}

function Property({ property }) {
  const {
    id,
    slug,
    image,
    title,
    address,
    owner,
    description,
    price,
    rating,
    type,
  } = property;

  return (
    <div className="overflow-hidden rounded-lg">
      <Link
        href={`/${slug}`}
        className="relative h-52 w-full overflow-hidden rounded-lg"
      >
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="rounded-lg object-cover"
        />
      </Link>

      <div className="py-2">
        <div className="flex items-center justify-between">
          <Link href={`/${slug}`} className="text-sm font-semibold">
            {address}
          </Link>
          <p className="flex items-center gap-1 text-xs font-semibold">
            <FaStar />
            {rating}
          </p>
        </div>
      </div>
      <p className="truncate text-xs">{description}</p>
    </div>
  );
}
