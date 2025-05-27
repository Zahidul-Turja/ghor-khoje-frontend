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
      <section className="mx-auto max-w-screen-2xl px-0 pt-32 md:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-gray-800">
          <span className="font-extralight">Featured</span> Properties
        </h2>
        <p className="text-gray-500">No featured properties available.</p>
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
    <section className="mx-auto max-w-screen-2xl px-0 pt-32 md:px-6 lg:px-8">
      <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-gray-800">
        <span className="font-extralight">Featured</span> Properties
      </h2>

      <div className="flex gap-8">
        {showNavigation && (
          <button ref={prevRef} className="font-semibold text-black">
            <FaChevronLeft className="text-2xl" />
          </button>
        )}

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
                  delay: 3000,
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
          className="w-full"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id} className="!w-auto">
              <div className="w-72 lg:w-80">
                <PropertyCard
                  property={property}
                  image={property.images[0]?.image}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <button ref={nextRef} className="font-semibold text-black">
            <FaChevronRight className="text-2xl" />
          </button>
        )}
      </div>
    </section>
  );
}

export default SectionFeatured;
