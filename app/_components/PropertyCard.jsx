import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

function PropertyCard({ property }) {
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
          <Link href={`/${slug}`} className="text-lg font-semibold">
            {address}
          </Link>
          <p className="flex items-center gap-1 text-sm font-semibold">
            <FaStar />
            {rating}
          </p>
        </div>
        <p className="text-xs font-extralight">Owned by {owner}</p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">${price}</span>{" "}
          <span className="text-xs font-extralight"> month</span>
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
