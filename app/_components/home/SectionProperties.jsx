import { MdTune, MdOutlineSort } from "react-icons/md";

import CategoryFilterNav from "@/app/_components/home/CatagoryFilterNav";
import Properties from "./Properties";

function SectionProperties() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
      <div className="my-8 flex w-full flex-col items-center justify-between gap-4 rounded-full px-4 shadow-lg md:flex-row">
        <div className="order-2 w-full md:order-1 md:w-[75%] lg:w-[82%]">
          <CategoryFilterNav />
        </div>

        <div className="order-1 flex w-full items-center justify-around gap-2 md:order-2">
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 transition-all hover:bg-gray-100">
            <MdTune className="text-lg" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 transition-all hover:bg-gray-100">
            <MdOutlineSort className="text-lg" />
            <span className="text-sm font-medium">Sort</span>
          </button>
        </div>
      </div>

      <Properties />
    </section>
  );
}

export default SectionProperties;
