import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

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
        {" "}
        {image ? (
          <Image
            src={image}
            alt={title}
            width={400}
            height={200}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-gray-100">
            <Image
              src={"/property-placeholder.png"}
              alt={title}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>
        )}
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

export default Property;
