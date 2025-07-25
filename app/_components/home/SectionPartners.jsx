"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const partners = [
  { id: 1, name: "Airbnb", logo: "/partners/logoipsum-1.png" },
  { id: 2, name: "Next.js", logo: "/partners/logoipsum-2.png" },
  { id: 3, name: "Partner Three", logo: "/partners/logoipsum-3.png" },
  { id: 4, name: "Partner Four", logo: "/partners/logoipsum-4.png" },
  { id: 5, name: "Partner Five", logo: "/partners/logoipsum-5.png" },
  { id: 6, name: "Partner Five", logo: "/partners/logoipsum-6.png" },
  { id: 7, name: "Partner Five", logo: "/partners/logoipsum-7.png" },
  { id: 8, name: "Partner Five", logo: "/partners/logoipsum-8.png" },
  { id: 9, name: "Partner Five", logo: "/partners/logoipsum-9.png" },
  { id: 10, name: "Next.js", logo: "/partners/next.jpeg" },
];

function SectionPartners() {
  return (
    <section className="mx-auto overflow-hidden bg-gradient-to-br from-gray-50 to-white px-3 py-24 pt-16 md:px-6 md:pt-32 lg:px-8 dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900">
      {/* Section Header */}
      <div className="mb-6 text-center md:mb-8">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-gray-800 md:text-3xl lg:text-4xl dark:text-gray-200">
          <span className="font-extralight">Our</span> Partners
        </h2>
        <p className="mx-auto mt-4 text-center text-gray-600 md:w-[80vw] md:text-lg lg:w-[60vw] dark:text-gray-300">
          We’re proud to collaborate with trusted partners who share our vision
          and values. These partnerships play a key role in helping us deliver
          exceptional solutions and grow together. Take a look at some of the
          amazing organizations we work with.
        </p>
      </div>

      <div className="flex w-full items-center justify-center pt-8">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={32}
          loop={true}
          centeredSlides={true}
          grabCursor={true}
          freeMode={true}
          autoplay={{
            delay: 0, // No delay between slides
            disableOnInteraction: false,
          }}
          speed={2000}
          className="px-4"
        >
          {partners.map((partner) => (
            <SwiperSlide
              key={partner.id}
              className="flex !w-[120px] items-center justify-center md:!w-[160px]"
            >
              <div className="flex h-24 items-center justify-center md:h-36">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale transition duration-300 hover:grayscale-0"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SectionPartners;
