"use client";

import { useState } from "react";
import {
  FaCity,
  FaUmbrellaBeach,
  FaWater,
  FaCampground,
  FaHome,
} from "react-icons/fa";
import { LiaBedSolid } from "react-icons/lia";
import {
  TbMountain,
  TbArmchair,
  TbTrees,
  TbBuildingCottage,
} from "react-icons/tb";
import { GiWoodCabin, GiMicrochip, GiTennisCourt } from "react-icons/gi";
import { MdOutlineFoodBank } from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const categories = [
  {
    id: 1,
    name: "City",
    icon: <FaCity />,
  },
  {
    id: 2,
    name: "Room",
    icon: <LiaBedSolid />,
  },
  {
    id: 3,
    name: "Seat",
    icon: <TbArmchair />,
  },
  {
    id: 4,
    name: "Mountains",
    icon: <TbMountain />,
  },
  {
    id: 5,
    name: "Countryside",
    icon: <TbTrees />,
  },
  {
    id: 6,
    name: "Luxury",
    icon: <MdOutlineFoodBank />,
  },
  {
    id: 7,
    name: "Bed & Breakfast",
    icon: <MdOutlineFoodBank />,
  },
  {
    id: 8,
    name: "Beachfront",
    icon: <FaUmbrellaBeach />,
  },
  {
    id: 9,
    name: "Lakefront",
    icon: <FaWater />,
  },
  {
    id: 10,
    name: "Camping",
    icon: <FaCampground />,
  },
  {
    id: 11,
    name: "Cabin",
    icon: <GiWoodCabin />,
  },
  {
    id: 12,
    name: "Wooden",
    icon: <BsHouseDoor />,
  },
  {
    id: 13,
    name: "Modern",
    icon: <GiMicrochip />,
  },
  {
    id: 14,
    name: "Mountains",
    icon: <TbMountain />,
  },
  {
    id: 15,
    name: "Rural",
    icon: <TbBuildingCottage />,
  },
  {
    id: 16,
    name: "Luxury",
    icon: <TbArmchair />,
  },
  {
    id: 17,
    name: "Sport",
    icon: <GiTennisCourt />,
  },
  {
    id: 18,
    name: "City",
    icon: <FaCity />,
  },
  {
    id: 19,
    name: "Home",
    icon: <FaHome />,
  },
];

function CategoryFilterNav() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById("category-container");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-screen-xl">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        style={{ display: scrollPosition <= 0 ? "none" : "block" }}
      >
        <FaChevronLeft />
      </button>

      <div className="flex items-center justify-between overflow-hidden px-8">
        <div
          id="category-container"
          className="no-scrollbar flex items-center gap-6 overflow-x-auto scroll-smooth px-2 py-4"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex min-w-fit cursor-pointer flex-col items-center gap-2 rounded-xl px-2 py-3 transition-all hover:bg-gray-100 ${activeCategory === category.id ? "border-b-2 border-black font-medium" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="text-2xl">{category.icon}</div>
              <p className="whitespace-nowrap text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default CategoryFilterNav;
