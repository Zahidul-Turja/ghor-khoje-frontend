import { useState, useEffect } from "react";
import Image from "next/image";
import useAuthStore from "@/app/_store/authStore";

function BookingModal({ isOpen, onClose, propertyData }) {
  const { isAuthenticated, userInfo, user } = useAuthStore();
  console.log("userInfo", user);
  const getValidCheckInDate = () => {
    const availableFrom = propertyData?.available_from;
    if (!availableFrom) return "";

    const today = new Date();
    const availableDate = new Date(availableFrom);

    if (availableDate < today.setHours(0, 0, 0, 0)) {
      // If the available date has passed, return 1st of next month
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(1);
      return nextMonth.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    }

    return availableFrom;
  };

  const [formData, setFormData] = useState({
    checkInDate: getValidCheckInDate(),
    checkOutDate: "",
    contractDuration: "",
    numberOfGuests: 1,
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Handle click outside to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      return () => document.removeEventListener("keydown", handleEscKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !propertyData) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const rentPerMonth = parseFloat(propertyData.rent_per_month);
    const extraBills = parseFloat(propertyData.extra_bills);
    const prepaymentMonths = propertyData.num_prepayment_months;

    const monthlyTotal = rentPerMonth + extraBills;
    const securityDeposit = rentPerMonth * 2; // Assuming 2 months security
    const totalUpfront = monthlyTotal * prepaymentMonths + securityDeposit;

    return {
      monthlyRent: rentPerMonth,
      extraBills,
      monthlyTotal,
      securityDeposit,
      prepaymentMonths,
      totalUpfront,
    };
  };

  const costs = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Booking submitted:", formData);
    // Add your booking logic here
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative min-h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-50"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex h-full max-h-[90vh] overflow-hidden">
          {/* Left Side - Property Info */}
          <div className="w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
            <div className="no-scrollbar h-full overflow-y-auto">
              {/* Property Image */}
              {propertyData.images && propertyData.images[0] && (
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={
                      propertyData.images[0].image || "/placeholder-image.jpg"
                    }
                    alt={propertyData.title}
                    width={300}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}

              {/* Property Details */}
              <h2 className="mb-2 text-2xl font-bold">{propertyData.title}</h2>
              <p className="mb-4 text-gray-300">
                {propertyData.house_name}, {propertyData.street_name},{" "}
                {propertyData.area_name}
              </p>

              {/* Category */}
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-primary px-3 py-1 text-sm font-medium">
                  {propertyData.category.name}
                </div>
              </div>

              {/* Property Features */}
              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>{propertyData.num_of_bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{propertyData.num_of_bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span>Capacity: {propertyData.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{propertyData.area_in_sqft} sq ft</span>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="rounded-xl bg-white bg-opacity-10 p-4">
                <h3 className="mb-3 font-semibold">Cost Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span>৳{costs.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extra Bills</span>
                    <span>৳{costs.extraBills.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-white border-opacity-20 pt-2 font-semibold">
                    <span>Monthly Total</span>
                    <span>৳{costs.monthlyTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Security Deposit (2 months)</span>
                    <span>৳{costs.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-white border-opacity-20 pt-2 font-bold text-primary">
                    <span>Total Upfront</span>
                    <span>৳{costs.totalUpfront.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="flex-1 p-6">
            <div className="no-scrollbar h-full overflow-y-auto">
              {/* Step Indicator */}
              <div className="mb-6 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      currentStep >= 1
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`h-1 w-12 ${currentStep > 1 ? "bg-primary" : "bg-gray-200"}`}
                  />
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      currentStep >= 2
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Booking Details
                    </h3>

                    {/* Date Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Move-in Date
                        </label>
                        <input
                          type="date"
                          name="checkInDate"
                          value={formData.checkInDate}
                          // onChange={handleInputChange}
                          disabled
                          min={propertyData.available_from}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 opacity-70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-400">
                          Contract Duration
                        </label>
                        <select
                          name="contractDuration"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                          required
                          value={formData.contractDuration}
                          onChange={handleInputChange}
                        >
                          <option value="">Select duration</option>
                          <option value="6">6 months</option>
                          <option value="12">12 months</option>
                          <option value="24">24 months</option>
                        </select>
                      </div>
                    </div>

                    {/* Number of Occupants */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Number of Occupants
                      </label>
                      <select
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                        required
                      >
                        {Array.from(
                          { length: propertyData.capacity },
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} {i === 0 ? "Person" : "People"}
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="h-60 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                        placeholder="Any special requirements or questions..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                      Continue to Contact Details
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Contact Information
                    </h3>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                        required
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-2 font-semibold text-gray-900">
                        Booking Terms
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Security deposit of 2 months rent required</li>
                        <li>
                          • {propertyData.num_prepayment_months} months advance
                          payment required
                        </li>
                        <li>• Minimum contract duration: 6 months</li>
                        <li>• 24-hour notice required for property visits</li>
                      </ul>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the terms and conditions and privacy policy
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90"
                      >
                        Submit Booking Request
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
