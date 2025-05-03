import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function PropertyCard({ property }) {
  const {
    id,
    slug,
    images,
    title,
    address,
    owner,
    description,
    rent_per_month,
    type,
  } = property;
  return (
    <div className="overflow-hidden rounded-lg">
      <Link
        href={`/${slug}`}
        className="relative h-96 w-full overflow-hidden rounded-lg"
      >
        {images.length > 0 ? (
          <div className="h-40 w-full overflow-hidden rounded-lg">
            <Image
              src={BASE_ENDPOINT + images[0].image}
              alt={title}
              width={400}
              height={400}
              className="absolute h-full w-full rounded-lg object-cover"
            />
          </div>
        ) : (
          <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-200">
            <IoImageOutline className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-200 text-gray-400" />
          </div>
        )}
      </Link>

      <div className="py-2">
        <div className="flex items-start justify-between">
          <Link href={`/${slug}`} className="w-[85%] text-sm font-semibold">
            {title}
          </Link>
          <p className="flex items-center gap-1 pt-1 text-sm font-semibold">
            <FaStar />
            {owner.rating}
          </p>
        </div>
        <p className="text-xs font-light">
          <span className="font-extralight text-gray-600">Owned by</span>{" "}
          {owner.full_name}
        </p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">&#2547;{rent_per_month}</span>{" "}
          <span className="text-xs font-extralight"> /month</span>
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
