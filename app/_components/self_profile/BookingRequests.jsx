"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

import { getBookingRequests, updateBookingStatus } from "@/app/_lib/apiCalls";

function BookingRequests() {
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookingRequests();
      if (response && response.results) {
        setBookings(response.results);
        console.log("Bookings fetched:", response);
      }

      setLoading(false);
    };
    fetchBookings();
  }, []);

  const HandleUpdateStatus = (bookingId, newStatus) => {
    const updateBooking = async () => {
      try {
        const response = await updateBookingStatus(bookingId, newStatus);
        if (response && response.status === "success") {
          console.log("Booking status updated:", response);
          setBookings((prev) =>
            prev.map((booking) =>
              booking.id === bookingId
                ? { ...booking, status: newStatus }
                : booking,
            ),
          );
          return response;
        } else {
          console.error("Failed to update booking status:", response);
        }
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    };
    updateBooking();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none";
      case "rejected":
        return "bg-rose-500 text-white shadow-rose-200 dark:shadow-none";
      case "pending":
        return "bg-amber-500 text-white shadow-amber-200 dark:shadow-none";
      default:
        return "bg-slate-500 text-white shadow-slate-200 dark:shadow-none";
    }
  };

  const filteredBookings = bookings?.filter(
    (booking) => filter === "all" || booking.status === filter,
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary/80"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-2 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="mb-3 flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-gradient-to-r from-primary/90 to-primary p-2 shadow-lg sm:rounded-xl sm:p-3">
              <Home className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent dark:text-gray-200 sm:text-2xl">
                Booking Requests
              </h1>
              <p className="mt-0 text-sm text-slate-600 dark:text-gray-300 sm:text-base">
                Manage and review all property booking requests
              </p>
            </div>
          </div>
        </div>

        {/* Modern Filter Tabs */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-wrap gap-1 rounded-xl border border-white/20 bg-white/70 p-1 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/70 sm:gap-2 sm:rounded-2xl">
            {["all", "pending", "accepted", "rejected"].map((status) => {
              const count =
                status === "all"
                  ? bookings?.length
                  : bookings?.filter((b) => b.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium capitalize transition-all duration-200 sm:gap-2 sm:rounded-xl sm:px-4 sm:text-sm ${
                    filter === status
                      ? "scale-105 transform bg-gradient-to-r from-primary/80 to-primary/90 text-white shadow-lg shadow-blue-200 dark:shadow-gray-700"
                      : "text-slate-600 hover:bg-white/80 hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {status === "all" ? "All" : status}
                  </span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs sm:px-2 sm:py-1 ${
                      filter === status
                        ? "bg-white/20"
                        : "bg-slate-100 dark:bg-gray-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Booking Cards */}
        <div className="space-y-4 sm:space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center sm:py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-950 dark:to-gray-900 dark:text-gray-300 sm:mb-6 sm:h-24 sm:w-24">
                <Home className="h-8 w-8 text-slate-400 sm:h-12 sm:w-12" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-gray-200 sm:text-xl">
                No booking requests found
              </h3>
              <p className="mx-auto max-w-md px-4 text-sm text-slate-500 dark:text-gray-400 sm:text-base">
                {filter === "all"
                  ? "No booking requests have been made yet. New requests will appear here."
                  : `No ${filter} booking requests found. Try switching to a different filter.`}
              </p>
            </div>
          ) : (
            filteredBookings?.map((booking) => (
              <div
                key={booking?.id}
                className="group overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800/80 dark:hover:shadow-2xl sm:rounded-3xl lg:shadow-lg lg:hover:shadow-xl"
              >
                {/* Status Banner */}
                <div
                  className={`h-1.5 sm:h-2 ${
                    booking?.status === "accepted"
                      ? "bg-gradient-to-r from-emerald-500 to-green-500"
                      : booking?.status === "rejected"
                        ? "bg-gradient-to-r from-rose-500 to-red-500"
                        : "bg-gradient-to-r from-amber-500 to-yellow-500"
                  }`}
                />

                {/* Card Header */}
                <div className="p-4 pb-3 sm:p-6 sm:pb-4 lg:p-8 lg:pb-6">
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {/* Property Info */}
                    <div className="flex-1">
                      <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary/90 dark:text-gray-200 sm:text-xl">
                            {booking?.place.title}
                          </h3>
                          <div className="flex flex-col gap-2 text-slate-600 dark:text-gray-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 flex-shrink-0 text-blue-500" />
                              <span className="truncate text-sm font-medium sm:text-base">
                                {booking?.place.city},{" "}
                                {booking?.place.area_name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 flex-shrink-0 text-indigo-500" />
                              <span className="text-sm sm:text-base">
                                {booking?.place.category.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1.5 shadow-lg sm:px-4 sm:py-2 ${getStatusStyle(booking?.status)}`}
                        >
                          {getStatusIcon(booking?.status)}
                          <span className="text-sm font-semibold capitalize sm:text-base">
                            {booking?.status}
                          </span>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 dark:border-gray-700 dark:bg-gray-800/80 dark:from-gray-800 dark:to-gray-900 sm:rounded-2xl sm:p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                          <div>
                            <p className="mb-1 text-xs text-slate-600 dark:text-gray-200 sm:text-sm">
                              Monthly Rent
                            </p>
                            <p className="text-base font-bold text-slate-900 dark:text-gray-300 sm:text-lg">
                              {formatCurrency(booking?.rent_per_month)}
                            </p>
                          </div>
                          <div className="sm:text-right">
                            <p className="mb-1 text-xs text-slate-600 dark:text-gray-300 sm:text-sm">
                              Total (with bills)
                            </p>
                            <p className="text-lg font-semibold text-primary sm:text-xl">
                              {formatCurrency(
                                parseFloat(booking?.rent_per_month) +
                                  parseFloat(booking?.extra_bills),
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* User Who Booked */}
                    <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 dark:border-gray-700 dark:from-gray-900 dark:to-gray-900 sm:rounded-2xl sm:p-6">
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-gray-200 sm:mb-4 sm:text-base">
                        <User className="h-4 w-4 text-blue-500 dark:text-primary sm:h-5 sm:w-5" />
                        Booked By
                      </h4>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl shadow-lg ring-2 ring-white dark:ring-gray-800 sm:h-16 sm:w-16 sm:rounded-2xl sm:ring-4">
                          <img
                            src={
                              booking?.booked_by.profile_image ||
                              "/avatar-male.png"
                            }
                            alt={booking?.booked_by.full_name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="mb-1 line-clamp-1 text-sm font-semibold text-slate-900 dark:text-gray-300 sm:text-base">
                            {booking.booked_by.full_name}
                          </h5>
                          <p className="mb-2 line-clamp-1 text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                            {booking.booked_by.profession}
                          </p>
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                              <Mail className="h-3 w-3 flex-shrink-0 text-slate-400 dark:text-primary sm:h-4 sm:w-4" />
                              <span className="truncate text-slate-600 dark:text-gray-200">
                                {booking.booked_by.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                              <Phone className="h-3 w-3 flex-shrink-0 text-slate-400 dark:text-primary sm:h-4 sm:w-4" />
                              <span className="text-slate-600 dark:text-gray-200">
                                {booking.booked_by.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Information */}
                    <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-gray-700 dark:from-gray-900 dark:to-gray-900 sm:rounded-2xl sm:p-6">
                      <h4 className="dark: mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-gray-200 sm:mb-4 sm:text-base">
                        <Calendar className="h-4 w-4 text-indigo-500 dark:text-primary sm:h-5 sm:w-5" />
                        Booking Details
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        {booking.full_name &&
                          booking.full_name !== booking.booked_by.full_name && (
                            <div>
                              <p className="mb-1 text-xs text-slate-600 dark:text-gray-300 sm:text-sm">
                                Tenant Name
                              </p>
                              <p className="line-clamp-1 text-sm font-medium text-slate-900 dark:text-gray-300 sm:text-base">
                                {booking.full_name}
                              </p>
                            </div>
                          )}
                        {booking.email &&
                          booking.email !== booking.booked_by.email && (
                            <div>
                              <p className="mb-1 text-xs text-slate-600 dark:text-gray-300 sm:text-sm">
                                Tenant Email
                              </p>
                              <p className="truncate text-sm font-medium text-slate-900 dark:text-gray-200 sm:text-base">
                                {booking.email}
                              </p>
                            </div>
                          )}
                        {booking.phone_number && (
                          <div>
                            <p className="mb-1 text-xs text-slate-600 sm:text-sm">
                              Contact Number
                            </p>
                            <p className="text-sm font-medium text-slate-900 sm:text-base">
                              {booking.phone_number}
                            </p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <p className="mb-1 text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                              Move-in
                            </p>
                            <p className="text-xs font-medium text-slate-900 dark:text-gray-300 sm:text-sm">
                              {formatDate(booking.move_in_date)}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                              Move-out
                            </p>
                            <p className="text-xs font-medium text-slate-900 dark:text-gray-300 sm:text-sm">
                              {formatDate(booking.move_out_date)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                            Occupants
                          </p>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 text-indigo-500 dark:text-primary sm:h-4 sm:w-4" />
                            <span className="text-sm font-medium text-slate-900 dark:text-gray-300 sm:text-base">
                              {booking.number_of_occupants} person(s)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Note */}
                  {booking.note && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 sm:mt-6 sm:rounded-2xl sm:p-6">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 sm:h-5 sm:w-5" />
                        <div>
                          <h5 className="mb-2 text-sm font-semibold text-amber-900 dark:text-amber-300 sm:text-base">
                            Special Note
                          </h5>
                          <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200 sm:text-base">
                            {booking.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Property Details Toggle */}
                  <div className="mt-4 sm:mt-6">
                    <button
                      onClick={() =>
                        setExpandedCard(
                          expandedCard === booking.id ? null : booking.id,
                        )
                      }
                      className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary/90 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary/90 sm:rounded-xl sm:px-4 sm:text-base lg:px-6 lg:py-3"
                    >
                      <Eye className="h-4 w-4" />
                      {expandedCard === booking.id ? "Hide" : "View"} Property
                      Details
                      {expandedCard === booking.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Property Details */}
                  {expandedCard === booking.id && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 sm:mt-6 sm:rounded-2xl sm:p-6">
                      <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:grid-cols-4 sm:gap-4 lg:gap-6">
                        <div className="rounded-lg border border-slate-100 bg-white p-3 text-center dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl sm:p-4">
                          <div className="text-xl font-bold text-slate-900 dark:text-gray-200 sm:text-2xl">
                            {booking.place.num_of_bedrooms}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                            Bedrooms
                          </div>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-white p-3 text-center dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl sm:p-4">
                          <div className="text-xl font-bold text-slate-900 dark:text-gray-200 sm:text-2xl">
                            {booking.place.num_of_bathrooms}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                            Bathrooms
                          </div>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-white p-3 text-center dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl sm:p-4">
                          <div className="text-xl font-bold text-slate-900 dark:text-gray-200 sm:text-2xl">
                            {booking.place.area_in_sqft}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                            Sq Ft
                          </div>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-white p-3 text-center dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl sm:p-4">
                          <div className="text-xl font-bold text-slate-900 dark:text-gray-200 sm:text-2xl">
                            {booking.place.capacity}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
                            Max People
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-900 sm:rounded-xl sm:p-4">
                        <h6 className="mb-2 text-sm font-semibold text-slate-900 dark:text-gray-200 sm:text-base">
                          Full Address
                        </h6>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-gray-400 sm:text-base">
                          {booking.place.house_name},{" "}
                          {booking.place.house_number}
                          {booking.place.apartment_number &&
                            `, Apt ${booking.place.apartment_number}`}
                          ,{booking.place.area_name}, {booking.place.city}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-col flex-wrap gap-3 sm:mt-6 sm:flex-row sm:gap-4 lg:mt-8">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            HandleUpdateStatus(booking.id, "accepted")
                          }
                          className="flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-200 hover:from-emerald-600 hover:to-green-600 hover:shadow-xl hover:shadow-emerald-300 dark:shadow-none sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base lg:px-8"
                        >
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          Confirm Booking
                        </button>
                        <button
                          onClick={() =>
                            HandleUpdateStatus(booking.id, "rejected")
                          }
                          className="flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-all duration-200 hover:from-rose-600 hover:to-red-600 hover:shadow-xl hover:shadow-rose-300 dark:shadow-none sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base lg:px-8"
                        >
                          <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          Reject Booking
                        </button>
                      </>
                    )}
                    {booking.status === "accepted" && (
                      <button
                        onClick={() =>
                          HandleUpdateStatus(booking.id, "pending")
                        }
                        className="transform rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-200 transition-all duration-200 hover:scale-105 hover:from-amber-600 hover:to-yellow-600 hover:shadow-xl hover:shadow-amber-300 dark:shadow-none sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base lg:px-8"
                      >
                        Mark as Pending
                      </button>
                    )}
                    {booking.status === "rejected" && (
                      <button
                        onClick={() =>
                          HandleUpdateStatus(booking.id, "pending")
                        }
                        className="transform rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl hover:shadow-blue-300 dark:shadow-none sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base lg:px-8"
                      >
                        Reconsider Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingRequests;
