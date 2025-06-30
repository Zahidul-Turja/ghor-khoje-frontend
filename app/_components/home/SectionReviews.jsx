"use client";

import Image from "next/image";
import { getReviews } from "@/app/_lib/generals";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";

function SectionReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from the API
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Transform API data to match the component structure
  const transformedReviews = reviews.map((review) => ({
    id: review.id,
    reviewer: {
      name: review.reviewer.full_name,
      image: review.reviewer.profile_image || "/default-avatar.png", // Fallback image
    },
    rating: review.overall,
    comment: review.review_text,
    date: review.created_at,
  }));

  // Duplicate reviews for smooth looping (only if we have reviews)
  const scrollingReviews =
    transformedReviews.length > 0
      ? [...transformedReviews, ...transformedReviews]
      : [];

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Helper function to truncate comment
  const truncateComment = (comment, maxLength = 120) => {
    if (!comment || comment.length <= maxLength) return comment;
    return comment.slice(0, maxLength).trim() + "...";
  };

  return (
    <section className="mx-auto overflow-hidden bg-gradient-to-br from-gray-50 to-white px-3 py-24 pt-16 md:px-6 md:pt-32 lg:px-8">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800 md:text-3xl lg:text-4xl">
            <span className="font-extralight">What Our</span> Customers Say
          </h2>
          <p className="mx-auto mt-4 text-gray-600 md:w-[80vw] md:text-lg lg:w-[60vw]">
            Discover what our customers truly think about us. These are honest,
            unfiltered reviews from real people who've experienced our service
            firsthand. Their feedback not only reflects the quality we strive
            for but also helps you get a clear picture of what to expect.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-800"></div>
          </div>
        )}

        {/* No Reviews State */}
        {!loading && transformedReviews.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              No Reviews Yet
            </h3>
            <p className="mx-auto max-w-md text-gray-600">
              Be the first to share your experience! We'd love to hear your
              feedback and help others make informed decisions.
            </p>
          </div>
        )}

        {/* Reviews Display */}
        {!loading && scrollingReviews.length > 0 && (
          <div className="relative overflow-x-hidden">
            <SwiperSlider
              scrollingReviews={scrollingReviews}
              renderStars={renderStars}
              truncateComment={truncateComment}
            />

            {/* Enhanced gradient fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent md:block" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent md:block" />
          </div>
        )}
      </div>
    </section>
  );
}

function SwiperSlider({ scrollingReviews, renderStars, truncateComment }) {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      spaceBetween={32}
      loop={true}
      centeredSlides={true}
      grabCursor={true}
      freeMode={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      speed={2000}
      className="px-4"
    >
      {scrollingReviews.map((review, index) => (
        <SwiperSlide
          key={`${review.id}-${index}`}
          className="my-10 flex min-w-[350px] max-w-[350px] flex-col rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:min-w-[400px] md:max-w-[400px]"
        >
          {/* Header with avatar and info */}
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={review.reviewer.image}
                alt={`${review.reviewer.name}'s profile`}
                width={56}
                height={56}
                className="h-16 w-16 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-avatar.png"; // Fallback if image fails to load
                }}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {review.reviewer.name}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex gap-1">{renderStars(review.rating)}</div>
                <span className="text-sm font-medium text-gray-700">
                  {review.rating}/5
                </span>
              </div>
            </div>
          </div>

          {/* Review Comment */}
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              "{truncateComment(review.comment)}"
            </p>
          </div>

          {/* Date */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <time className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SectionReviews;
