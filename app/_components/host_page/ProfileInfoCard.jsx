import { SiVerizon } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { HiMiniFlag } from "react-icons/hi2";

function ProfileInfoCard({ host }) {
  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-300 p-4 dark:border-gray-700">
        <h3 className="text-lg font-semibold">
          {host.full_name}'s Confirmed Information
        </h3>
        <div className="px-4 pt-2">
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2 dark:border-gray-700">
            {host?.profession ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Profession</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2 dark:border-gray-700">
            {host?.email ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Email</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2 dark:border-gray-700">
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
      <Link
        href={"/"}
        className="my-5 flex items-center gap-2 dark:text-gray-300"
      >
        <HiMiniFlag className="text-sm" />
        <span className="text-xs font-bold underline">Report this user</span>
      </Link>
    </div>
  );
}

export default ProfileInfoCard;
