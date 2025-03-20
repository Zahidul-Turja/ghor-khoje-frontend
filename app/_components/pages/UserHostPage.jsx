"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiMiniFlag } from "react-icons/hi2";

function UserHostPage() {
  const path = usePathname().replace("/user/", "");

  return (
    <div className="flex gap-4 px-52 py-8">
      <div className="flex w-[20.5rem] flex-col gap-8">
        <ProfileCard />
        <ProfileInfoCard />
      </div>

      <div>Right side information</div>
    </div>
  );
}

export default UserHostPage;

import { MdVerifiedUser } from "react-icons/md";

function ProfileCard() {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl px-10 py-8 shadow-[0px_6px_16px_rgba(0,0,0,0.15)]">
      <div className="text-center">
        <div className="relative">
          <div className="relative h-32 w-32 overflow-hidden rounded-full">
            <Image
              src="/profile-1.jpg"
              alt="Host Profile"
              width={1000}
              height={1000}
            />
          </div>
          <div className="absolute bottom-2 right-0 rounded-full bg-primary p-1.5 text-white">
            <MdVerifiedUser />
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
