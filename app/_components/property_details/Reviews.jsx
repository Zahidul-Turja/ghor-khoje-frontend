import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaStar } from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function Reviews({ reviews }) {
  return (
    <div className="grid grid-cols-2 gap-8 border-t border-gray-200">
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
  );
}

export default Reviews;

function ReviewCard({
  reviewer,
  review_date,
  rating,
  review_text,
  reviewed_days_ago,
}) {
  return (
    <div className="">
      <div className="flex items-center gap-4 p-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          {reviewer?.profile_image ? (
            <Image
              src={BASE_URL + reviewer.profile_image}
              alt="Host Profile"
              width={60}
              height={60}
              className="object-cover"
            />
          ) : (
            <CgProfile className="h-10 w-10 rounded-full text-gray-600" />
          )}
        </div>
        <div>
          <h3 className="font-bold">{reviewer.full_name}</h3>
          <p className="text-xs">{reviewed_days_ago} </p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="flex text-xs">
          {Array.from({ length: rating }).map((_, index) => (
            <FaStar key={index} />
          ))}
          {Array.from({ length: 5 - rating }).map((_, index) => (
            <FaStar key={index + rating} className="text-gray-300" />
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-700">{rating}</span>
      </div>
      <p className="p-4 text-xs font-semibold">{review_text}</p>
    </div>
  );
}
