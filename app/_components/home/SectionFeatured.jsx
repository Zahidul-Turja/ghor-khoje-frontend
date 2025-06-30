"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import PropertyCard from "../PropertyCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { getFeaturedProperties } from "@/app/_lib/apiCalls";

function SectionFeatured() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [properties, setProperties] = useState([]);

  // Check if navigation is needed based on screen size and property count
  const shouldShowNavigation = () => {
    if (typeof window === "undefined") return false;

    const width = window.innerWidth;
    let maxVisibleSlides;

    if (width >= 1024) maxVisibleSlides = 4;
    else if (width >= 768) maxVisibleSlides = 3;
    else if (width >= 640) maxVisibleSlides = 2;
    else maxVisibleSlides = 1;

    return properties.length > maxVisibleSlides;
  };

  const [showNavigation, setShowNavigation] = useState(shouldShowNavigation());

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const places = await getFeaturedProperties();
        setProperties(places || []);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowNavigation(shouldShowNavigation());
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [properties.length]);

  if (properties.length === 0) {
    return (
      <section className="mx-auto max-w-screen-2xl px-3 pt-16 md:px-6 md:pt-32 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-gray-800 md:text-3xl lg:text-4xl dark:text-gray-200">
          <span className="font-extralight">Featured</span> Properties
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          No featured properties available.
        </p>
      </section>
    );
  }

  const slidesCount = properties.length;

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: Math.min(2, slidesCount),
      spaceBetween: 16,
    },
    768: {
      slidesPerView: Math.min(3, slidesCount),
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: Math.min(4, slidesCount),
      spaceBetween: 24,
    },
  };

  const shouldEnableLoop = properties.length > 4;

  return (
    <section className="mx-auto max-w-screen-2xl px-3 pt-16 md:px-6 md:pt-32 lg:px-8">
      {/* Section Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800 md:text-3xl lg:text-4xl dark:text-gray-200">
          <span className="font-extralight">Featured</span> Properties
        </h2>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        {/* Desktop Navigation - Positioned outside swiper */}
        {showNavigation && (
          <div className="hidden md:block">
            <button
              ref={prevRef}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 font-semibold text-black shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl lg:-left-6 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <FaChevronLeft className="text-xl lg:text-2xl" />
            </button>
            <button
              ref={nextRef}
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 font-semibold text-black shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl lg:-right-6 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <FaChevronRight className="text-xl lg:text-2xl" />
            </button>
          </div>
        )}

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          centeredSlides={false}
          grabCursor={true}
          slidesPerView="auto"
          loop={shouldEnableLoop}
          autoplay={
            shouldEnableLoop
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
              : false
          }
          onBeforeInit={(swiper) => {
            if (showNavigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={breakpoints}
          className="w-full overflow-visible"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id} className="!w-auto">
              <div className="w-64 sm:w-72 lg:w-80">
                <PropertyCard
                  property={property}
                  image={property.images[0]?.image}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Navigation Dots/Indicators */}
        {showNavigation && (
          <div className="mt-6 flex justify-center gap-2 md:hidden">
            <button
              onClick={() => {
                if (prevRef.current) prevRef.current.click();
              }}
              className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={() => {
                if (nextRef.current) nextRef.current.click();
              }}
              className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SectionFeatured;
