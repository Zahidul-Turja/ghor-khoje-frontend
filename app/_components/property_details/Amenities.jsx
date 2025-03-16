import { FaWifi, FaSwimmingPool } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { CgGym } from "react-icons/cg";
import { GiCctvCamera } from "react-icons/gi";
import { TbCarGarage, TbAirConditioning } from "react-icons/tb";

const amenitiesList = [
  {
    icon: <FaWifi className="text-xl" />,
    title: "Free Wifi",
  },
  {
    icon: <TbCarGarage className="text-xl" />,
    title: "Garage",
  },
  {
    icon: <FaTv className="text-xl" />,
    title: "Television",
  },
  {
    icon: <TbAirConditioning className="text-xl" />,
    title: "Air Conditioning",
  },
  {
    icon: <FaSwimmingPool className="text-xl" />,
    title: "Swimming Pool",
  },
  {
    icon: <LuTrees className="text-xl" />,
    title: "Garden",
  },
  {
    icon: <CgGym className="text-xl" />,
    title: "Gym",
  },
  {
    icon: <GiCctvCamera className="text-xl" />,
    title: "CCTV",
  },
];

function Amenities() {
  return (
    <div className="border-b-2 border-gray-300 py-8">
      <h3 className="mb-4 text-2xl font-semibold">What This Place Offers</h3>
      <div className="grid grid-cols-2">
        {amenitiesList.map((amenity, index) => (
          <div key={index} className="flex items-center gap-4 py-2 font-medium">
            {amenity.icon}
            {amenity.title}
          </div>
        ))}
      </div>

      <button className="mt-4 cursor-pointer rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold">
        Show All Amenities(9)
      </button>
    </div>
  );
}

export default Amenities;
