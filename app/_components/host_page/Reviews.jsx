import { useState } from "react";

const { default: Image } = require("next/image");
const { FaAngleLeft, FaAngleRight } = require("react-icons/fa");

function Reviews({ reviews = [], name = "Guest" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Determine how many reviews to show
  const reviewsToShow = showAll ? reviews : reviews.slice(0, 2);
  const visibleReviews = reviewsToShow.slice(currentIndex, currentIndex + 2);

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex + 2 < reviewsToShow.length;

  const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShowMore = () => {
    setShowAll(true);
    setCurrentIndex(0);
  };

  // Don't render if no reviews
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="my-8 border-y border-gray-300 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{name.split(" ")[0]}'s Reviews</h2>

        {reviewsToShow.length > 2 && (
          <div className="flex items-center gap-2">
            <div
              className={`cursor-pointer rounded-full border border-gray-400 p-1 transition-all duration-300 ${
                canGoLeft
                  ? "opacity-70 hover:opacity-100"
                  : "cursor-not-allowed opacity-30"
              }`}
              onClick={handlePrevious}
            >
              <FaAngleLeft className="text-xs" />
            </div>
            <div
              className={`cursor-pointer rounded-full border border-gray-400 p-1 transition-all duration-300 ${
                canGoRight
                  ? "opacity-70 hover:opacity-100"
                  : "cursor-not-allowed opacity-30"
              }`}
              onClick={handleNext}
            >
              <FaAngleRight className="text-xs" />
            </div>
          </div>
        )}
      </div>

      <div className="my-4 flex items-start gap-2">
        {visibleReviews.map((review, index) => (
          <div
            key={review.id || index}
            className="h-44 w-1/2 rounded-xl border border-gray-300 p-4"
          >
            <p className="line-clamp-4 text-xs font-medium leading-5">
              {review.review_text}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={review.reviewer.profile_image || "/profile-1.jpg"}
                  alt="Reviewer Profile"
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {review.reviewer.full_name}
                </h3>
                <p className="text-xs">{review.timeAgo}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Fill empty space if only one review is visible */}
        {visibleReviews.length === 1 && <div className="w-1/2"></div>}
      </div>

      {!showAll && reviews.length > 2 && (
        <button
          onClick={handleShowMore}
          className="mt-3 cursor-pointer border-none bg-transparent p-0 text-sm font-bold text-gray-700 underline"
        >
          Show more reviews ({reviews.length - 2} more)
        </button>
      )}
    </div>
  );
}

export default Reviews;
