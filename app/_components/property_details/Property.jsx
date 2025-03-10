import { FaRegHeart } from "react-icons/fa";

import ImageGellary from "./ImageGellary";

function Property() {
  return (
    <div className="mx-auto my-4 max-w-screen-2xl">
      <div className="my-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          ALPHA HOUSE, Design villa w full concierge service
        </h1>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-gray-300">
          <FaRegHeart className="" />
          <span>Save</span>
        </div>
      </div>
      <ImageGellary />
    </div>
  );
}

export default Property;
