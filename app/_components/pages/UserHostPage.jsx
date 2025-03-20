"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiMiniFlag } from "react-icons/hi2";

function UserHostPage() {
  const path = usePathname().replace("/user/", "");

  return (
    <div className="flex justify-between px-52 py-8">
      <div className="sticky top-8 flex h-screen w-[30%] flex-col gap-8">
        <ProfileCard />
        <ProfileInfoCard />
      </div>

      <div className="w-[65%]">
        <ProfileDescription />
      </div>
    </div>
  );
}

export default UserHostPage;

import { MdVerifiedUser } from "react-icons/md";

function ProfileCard() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl px-8 py-6 shadow-[0px_6px_16px_rgba(0,0,0,0.15)]">
      <div className="text-center">
        <div className="relative">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
            <Image
              src="/profile-1.jpg"
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
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-xs font-medium">Engineer by Profession</p>
        </div>
      </div>

      <div>
        <div className="py-2">
          <h3 className="text-base font-extrabold">573</h3>
          <p className="text-xs font-medium">Reviws</p>
        </div>
        <div className="border-y border-gray-300 py-2">
          <h3 className="text-base font-extrabold">4.83</h3>
          <p className="text-xs font-medium">Rating</p>
        </div>
        <div className="py-2">
          <h3 className="text-base font-extrabold">11</h3>
          <p className="text-xs font-medium">Places hosted</p>
        </div>
      </div>
    </div>
  );
}

import { SiVerizon } from "react-icons/si";

function ProfileInfoCard() {
  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-300 p-4">
        <h3 className="text-lg font-semibold">John's Confirmed Information</h3>
        <div className="px-4 pt-2">
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            <SiVerizon />
            <p className="text-sm">Profession</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            <SiVerizon />
            <p className="text-sm">Email</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            <SiVerizon />
            <p className="text-sm">Phone</p>
          </div>
          <div className="flex gap-2 px-2 py-2">
            <SiVerizon />
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

function ProfileDescription() {
  return (
    <div className="">
      <h2 className="text-2xl font-bold">About John Doe</h2>

      <div className="my-6 flex items-center gap-2">
        <GrMapLocation />{" "}
        <span className="text-sm">Lives in Rajshahi, Bangladesh</span>
      </div>

      <p className="text-justify text-sm font-medium tracking-wider">
        Hi! I am John Doe and I will make sure you have a very pleasant stay! I
        manage properties in Rajshahi. I have a lot of experience in this field
        and I will make sure you have a very pleasant stay!
      </p>

      <Reviews />

      <Listings />
    </div>
  );
}

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

function Reviews() {
  return (
    <div className="my-8 border-y border-gray-300 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">John's Reviews</h2>

        <div className="flex items-center gap-2">
          <div className="cursor-pointer rounded-full border border-gray-400 p-1 opacity-70 transition-all duration-300 hover:opacity-100">
            <FaAngleLeft className="text-xs" />
          </div>
          <div className="cursor-pointer rounded-full border border-gray-400 p-1 opacity-70 transition-all duration-300 hover:opacity-100">
            <FaAngleRight className="text-xs" />
          </div>
        </div>
      </div>

      <div className="my-4 flex items-center gap-2">
        <div className="w-1/2 rounded-xl border border-gray-300 p-4">
          <p className="text-xs font-medium leading-5">
            Wow wow wow! We loved our stay at this villa. Putu and all the staff
            went above and beyond. Our breakfast was amazing every day. No need
            to stress about what activities you would like to do whilst on the
            island
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={"/profile-1.jpg"}
                alt="Host Profile"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold">John Doe</h3>
              <p className="text-xs">5 days ago</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 rounded-xl border border-gray-300 p-4">
          <p className="text-xs font-medium leading-5">
            Wow wow wow! We loved our stay at this villa. Putu and all the staff
            went above and beyond. Our breakfast was amazing every day. No need
            to stress about what activities you would like to do whilst on the
            island
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={"/profile-1.jpg"}
                alt="Host Profile"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold">John Doe</h3>
              <p className="text-xs">5 days ago</p>
            </div>
          </div>
        </div>
      </div>

      <Link
        href={"/"}
        className="mt-3 text-sm font-bold text-gray-700 underline"
      >
        Show more reviews
      </Link>
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
  // {
  //   id: 3,
  //   slug: "property-3",
  //   image: "/house-3.jpg",
  //   title: "Property 3",
  //   address: "Istanbul, Turkey",
  //   description: "Description 3",
  //   price: 3000,
  //   rating: 4.5,
  //   type: "Apartment",
  //   owner: "John Doe",
  // },
  // {
  //   id: 4,
  //   slug: "property-4",
  //   image: "/house-4.jpg",
  //   title: "Property 4",
  //   address: "Islamabaad, Pakistan",
  //   description: "Description 4",
  //   price: 4000,
  //   rating: 4.5,
  //   type: "Apartment",
  //   owner: "John Doe",
  // },
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
