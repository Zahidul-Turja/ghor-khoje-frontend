"use client";

const dummy_properties_data = [
  {
    id: 1,
    slug: "property-1",
    images: [{ image: "/house-1.jpg" }],
    title: "Property 1",
    address: "Bangkok, Thailand",
    description: "Description 1",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 2,
    slug: "property-2",
    images: [{ image: "/house-2.jpg" }],
    title: "Property 2",
    address: "Dhaka, Bangladesh",
    description: "Description 2",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 3,
    slug: "property-3",
    images: [{ image: "/house-3.jpg" }],
    title: "Property 3",
    address: "Istanbul, Turkey",
    description: "Description 3",
    price: 3000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 4,
    slug: "property-4",
    images: [{ image: "/house-4.jpg" }],
    title: "Property 4",
    address: "Islamabaad, Pakistan",
    description: "Description 4",
    price: 4000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 5,
    slug: "property-5",
    images: [{ image: "/house-5.jpg" }],
    title: "Property 5",
    address: "Gulshan, Dhaka, Bangladesh",
    description: "Description 5",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 6,
    slug: "property-6",
    images: [{ image: "/house-6.jpg" }],
    title: "Property 6",
    address: "Address 6",
    description: "Description 6",
    price: 6000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
];

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import PropertyCard from "../PropertyCard"; // adjust path
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function SectionFeatured() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="mx-auto max-w-screen-2xl px-0 pt-32 md:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-gray-800">
        <span className="font-extralight">Featured</span> Properties
      </h2>

      <div className="flex justify-end gap-8">
        <button ref={prevRef} className="font-semibold text-black">
          <FaChevronLeft className="text-2xl" />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {dummy_properties_data.map((property) => (
            <SwiperSlide key={property.id}>
              <PropertyCard
                property={property}
                image={property.images[0].image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button ref={nextRef} className="font-semibold text-black">
          <FaChevronRight className="text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default SectionFeatured;
