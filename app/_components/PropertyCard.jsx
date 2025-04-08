import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

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
        className="relative h-52 w-full overflow-hidden rounded-lg"
      >
        <Image
          src={BASE_ENDPOINT + images[0].image}
          alt={title}
          width={400}
          height={200}
          className="rounded-lg object-cover"
        />
      </Link>

      <div className="py-2">
        <div className="flex items-start justify-between">
          <Link href={`/${slug}`} className="w-[85%] text-lg font-semibold">
            {title}
          </Link>
          <p className="flex items-center gap-1 pt-1 text-sm font-semibold">
            <FaStar />
            {owner.rating}
          </p>
        </div>
        <p className="text-xs font-extralight">Owned by {owner.full_name}</p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">&#2547;{rent_per_month}</span>{" "}
          <span className="text-xs font-extralight"> /month</span>
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
