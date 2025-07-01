import useAuthStore from "@/app/_store/authStore";
import { Calendar, Users, DollarSign, Clock } from "lucide-react";
import { useState } from "react";

function AppointmentCard({
  capacity,
  rent_per_month,
  total_per_month,
  extra_bills,
  available_from,
  num_prepayment_months,
  setOpenBookingModal,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, userInfo } = useAuthStore();

  return (
    <div className="w-full rounded-xl border-2 border-gray-300 p-4 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500">
      <h3 className="mb-1 text-center text-xl font-semibold dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-500">
        Make an Appointment
      </h3>
      <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Book your stay today
      </p>

      <div className="my-6 divide-y divide-gray-300 rounded-lg border-2 border-gray-300 text-sm dark:divide-gray-600 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <Calendar size={18} className="flex-shrink-0 text-gray-500" />
          <p>
            Available from <span className="font-medium">{available_from}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <Users size={18} className="flex-shrink-0 text-gray-500" />
          <p>
            <span className="font-medium">{capacity}</span> guest capacity
          </p>
        </div>

        <div className="px-4 py-3">
          <div className="mb-2 flex items-center gap-3">
            <DollarSign size={18} className="flex-shrink-0 text-gray-500" />
            <p className="font-medium">Pricing details</p>
          </div>

          <div className="space-y-2 pl-8">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Rent</span>
              <span className="font-medium">{rent_per_month} BDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Extra bills
              </span>
              <span className="font-medium">{extra_bills} BDT</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-1 dark:border-gray-600">
              <span className="font-medium">Total per month</span>
              <span className="text-base font-bold">{total_per_month} BDT</span>
            </div>
          </div>
        </div>

        {num_prepayment_months > 0 && (
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 dark:bg-gray-700">
            <Clock size={18} className="flex-shrink-0 text-gray-500" />
            <p>
              <span className="font-medium">
                {num_prepayment_months} months
              </span>{" "}
              prepayment required
            </p>
          </div>
        )}
      </div>

      <button
        className={`w-full rounded-lg py-3 text-white transition-colors duration-300 ${isHovered ? "bg-primary/90" : "bg-primary/80"} ${
          isAuthenticated ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }`}
        title={isAuthenticated ? "Click to book" : "Please log in to book"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setOpenBookingModal(true)}
        disabled={!isAuthenticated}
      >
        Book Now
      </button>
    </div>
  );
}

export default AppointmentCard;
