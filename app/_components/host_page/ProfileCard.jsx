import Image from "next/image";
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

export default ProfileCard;
