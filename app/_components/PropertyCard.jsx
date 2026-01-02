import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

function PropertyCard({ property }) {
  const {
    slug,
    image,
    title,
    address,
    owner_full_name,
    avg_rating,
    rent_per_month,
    type,
  } = property;

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-700">
      {/* Property Image */}
      <Link
        href={`/${slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-t-xl"
      >
        {image ? (
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <IoImageOutline className="h-12 w-12 text-gray-400 sm:h-16 sm:w-16" />
          </div>
        )}
      </Link>

      {/* Property Details */}
      <div className="p-3 sm:p-4">
        {/* Title and Rating */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link
            href={`/${slug}`}
            className="flex-1 text-sm font-semibold text-gray-900 hover:text-primary dark:text-gray-200 dark:hover:text-gray-200 sm:text-base"
          >
            <h3 className="line-clamp-2 leading-tight">{title}</h3>
          </Link>

          {avg_rating ? (
            <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300 sm:text-sm">
              <FaStar className="h-3 w-3 text-yellow-400 dark:text-yellow-500 sm:h-4 sm:w-4" />
              <span>{avg_rating}</span>
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-xs font-semibold text-gray-100 dark:text-gray-300 sm:text-sm">
              <span>NEW</span>
            </div>
          )}
        </div>

        {/* Owner Information */}
        {owner_full_name && (
          <p className="mb-3 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            <span className="font-light">Owned by </span>
            <span className="font-medium">{owner_full_name}</span>
          </p>
        )}

        {/* Address */}
        {address && (
          <p className="mb-3 line-clamp-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            {address}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold text-gray-900 dark:text-gray-200 sm:text-lg">
            &#2547;{rent_per_month?.toLocaleString()}
          </span>
          <span className="text-xs font-light text-gray-600 dark:text-gray-400 sm:text-sm">
            /month
          </span>
        </div>

        {/* Property Type Badge */}
        {type && (
          <div className="mt-2">
            <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;
