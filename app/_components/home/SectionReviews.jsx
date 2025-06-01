"use client";

import Image from "next/image";
import { dummy_reviews } from "@/public/dummy_data";

function SectionReviews() {
  // Duplicate reviews for smooth looping
  const scrollingReviews = [...dummy_reviews, ...dummy_reviews];

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
    if (comment.length <= maxLength) return comment;
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
            unfiltered reviews from real people who’ve experienced our service
            firsthand. Their feedback not only reflects the quality we strive
            for but also helps you get a clear picture of what to expect.
          </p>
        </div>

        {/* Scrolling Reviews Container */}
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
      </div>
    </section>
  );
}

export default SectionReviews;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
        delay: 1500, // No delay between slides
        disableOnInteraction: false,
      }}
      speed={2000}
      className="px-4"
    >
      {scrollingReviews.map((review, index) => (
        <SwiperSlide
          key={`${review.id}-${index}`}
          className="my-10 flex min-w-[400px] max-w-[400px] flex-col rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Header with avatar and info */}
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={review.reviewer.image}
                alt="Profile"
                width={56}
                height={56}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {review.reviewer.name}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex gap-1">{renderStars(review.rating)}</div>
                <span className="text-sm font-medium text-gray-700">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Review Comment */}
          <div className="flex-1">
            <p className="leading-relaxed text-gray-700">
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
      {/* {partners.map((partner) => (
        <SwiperSlide
          key={partner.id}
          className="flex !w-[120px] items-center justify-center md:!w-[160px]"
        >
          <div className="flex h-36 items-center justify-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full object-contain grayscale transition duration-300 hover:grayscale-0"
            />
          </div>
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
}
