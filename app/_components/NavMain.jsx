"use client";

import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

import useAuthStore from "@/app/_store/authStore";

function NavMain({ classes }) {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className={`flex items-center justify-between px-24 py-4 ${classes}`}>
      <Link
        href={"/"}
        className="text-xl font-extrabold uppercase tracking-widest text-primary"
      >
        Ghor Khoje
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href={"/"}
          className="border-b-2 border-gray-700 px-1 text-sm font-bold tracking-wide"
        >
          Buy
        </Link>
        <Link href={"/"} className="px-1 text-sm tracking-wide">
          Rent
        </Link>
        <Link href={"/"} className="px-1 text-sm tracking-wide">
          Sell
        </Link>
      </div>

      {!isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link
            href={"/auth/login"}
            className="rounded-lg border-2 border-primary px-5 py-1 text-sm font-semibold text-primary"
          >
            Login
          </Link>
          <Link
            href={"/auth/signup"}
            className="rounded-lg border-2 border-primary bg-primary px-5 py-1 text-sm text-white"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.full_name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <CgProfile className="h-8 w-8 rounded-full text-gray-600" />
            )}
            <span className="text-sm font-light text-gray-800">
              {user?.full_name}
            </span>
          </button>
          <button className="text-xl text-primary" onClick={logout}>
            <LuLogOut />
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavMain;
