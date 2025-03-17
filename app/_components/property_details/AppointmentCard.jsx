function AppointmentCard() {
  return (
    <div className="w-full rounded-xl border-2 border-gray-300 p-4 shadow-md">
      <h3 className="text-center text-xl font-semibold">Make an Appointment</h3>

      <div className="my-6 rounded-lg border-2 border-gray-300 py-2 text-sm">
        <p className="border-b-2 border-gray-300 px-4 pb-2">
          Available from 1st May
        </p>
        <p className="border-b-2 border-gray-300 px-4 py-2">5 guest capacity</p>
        <p className="px-4 pt-2 text-base font-bold">
          20,000 BDT <span className="font-light">per month</span>
        </p>
      </div>

      <button className="w-full rounded-lg bg-primary py-3 text-white">
        Book Now
      </button>
    </div>
  );
}

export default AppointmentCard;
