"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  Star,
  MessageSquare,
} from "lucide-react";

// Mock data - replace with your actual data
const mockData = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 3,
      place: {
        id: 41,
        title: "Modern Penthouse with City View",
        slug: "vagag",
        owner: {
          id: 9,
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          profession: "Engineer",
          hosted_places: 6,
          rating: 4.33,
          profile_image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
        description: "Luxury penthouse with stunning city views",
        category: {
          id: 8,
          name: "Penthouse",
          slug: "penthouse",
        },
        city: "Rajshahi",
        area_name: "Aftabnagar",
        house_name: "Sergeant Tower",
        house_number: "917",
        apartment_number: "331",
        rent_per_month: "32344.00",
        extra_bills: "4444.00",
        num_of_bedrooms: 1,
        num_of_bathrooms: 1,
        area_in_sqft: 12,
        capacity: 1,
      },
      booked_by: {
        id: 9,
        full_name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "01748052301",
        profession: "Engineer",
        profile_image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      full_name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone_number: "01712345678",
      move_in_date: "2025-07-01",
      move_out_date: "2025-12-01",
      number_of_occupants: 2,
      note: "Looking for a quiet place for remote work",
      status: "pending",
    },
    {
      id: 2,
      place: {
        id: 5,
        title: "Cozy Studio Apartment",
        slug: "at-unde-sequi-tenetu",
        owner: {
          id: 9,
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          profession: "Engineer",
          hosted_places: 6,
          rating: 4.33,
          profile_image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
        description: "Perfect studio for young professionals",
        category: {
          id: 5,
          name: "Studio Apartment",
          slug: "studio-apartment",
        },
        city: "Dhaka",
        area_name: "Gulshan",
        house_name: "Azure Heights",
        house_number: "927",
        apartment_number: "201",
        rent_per_month: "25000.00",
        extra_bills: "3000.00",
        num_of_bedrooms: 1,
        num_of_bathrooms: 1,
        area_in_sqft: 450,
        capacity: 2,
      },
      booked_by: {
        id: 10,
        full_name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "01798765432",
        profession: "Designer",
        profile_image:
          "https://images.unsplash.com/photo-1494790108755-2616b332c63b?w=150&h=150&fit=crop&crop=face",
      },
      full_name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone_number: "01798765432",
      move_in_date: "2025-06-15",
      move_out_date: "2025-12-01",
      number_of_occupants: 1,
      note: null,
      status: "confirmed",
    },
    {
      id: 1,
      place: {
        id: 43,
        title: "Spacious Family Home",
        slug: "aliquip-laborum-enim",
        owner: {
          id: 9,
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          profession: "Engineer",
          hosted_places: 6,
          rating: 4.33,
          profile_image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
        description: "Perfect for families with children",
        category: {
          id: 12,
          name: "Family",
          slug: "family",
        },
        city: "Chittagong",
        area_name: "Nasirabad",
        house_name: "Green Villa",
        house_number: "752",
        apartment_number: "522",
        rent_per_month: "45000.00",
        extra_bills: "5000.00",
        num_of_bedrooms: 3,
        num_of_bathrooms: 2,
        area_in_sqft: 1200,
        capacity: 6,
      },
      booked_by: {
        id: 11,
        full_name: "Mike Rahman",
        email: "mike.rahman@email.com",
        phone: "01823456789",
        profession: "Doctor",
        profile_image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      full_name: "Mike Rahman",
      email: "mike.rahman@email.com",
      phone_number: "01823456789",
      move_in_date: "2025-06-01",
      move_out_date: "2026-06-01",
      number_of_occupants: 4,
      note: "Clean before we come. Family with 2 children.",
      status: "rejected",
    },
  ],
};

function BookingRequests() {
  const [bookings, setBookings] = useState(mockData.results);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filter, setFilter] = useState("all");

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking,
      ),
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
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
      case "confirmed":
        return "bg-emerald-500 text-white shadow-emerald-200";
      case "rejected":
        return "bg-rose-500 text-white shadow-rose-200";
      case "pending":
        return "bg-amber-500 text-white shadow-amber-200";
      default:
        return "bg-slate-500 text-white shadow-slate-200";
    }
  };

  const filteredBookings = bookings.filter(
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3 shadow-lg">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold text-transparent">
                Booking Requests
              </h1>
              <p className="mt-1 text-slate-600">
                Manage and review all property booking requests
              </p>
            </div>
          </div>
        </div>

        {/* Modern Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/20 bg-white/70 p-1 shadow-lg backdrop-blur-sm">
            {["all", "pending", "confirmed", "rejected"].map((status) => {
              const count =
                status === "all"
                  ? bookings.length
                  : bookings.filter((b) => b.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 font-medium capitalize transition-all duration-200 ${
                    filter === status
                      ? "scale-105 transform bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200"
                      : "text-slate-600 hover:bg-white/80 hover:shadow-md"
                  }`}
                >
                  <span>{status === "all" ? "All Requests" : status}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      filter === status ? "bg-white/20" : "bg-slate-100"
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
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                <Home className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                No booking requests found
              </h3>
              <p className="mx-auto max-w-md text-slate-500">
                {filter === "all"
                  ? "No booking requests have been made yet. New requests will appear here."
                  : `No ${filter} booking requests found. Try switching to a different filter.`}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="group overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
              >
                {/* Status Banner */}
                <div
                  className={`h-2 ${
                    booking.status === "confirmed"
                      ? "bg-gradient-to-r from-emerald-500 to-green-500"
                      : booking.status === "rejected"
                        ? "bg-gradient-to-r from-rose-500 to-red-500"
                        : "bg-gradient-to-r from-amber-500 to-yellow-500"
                  }`}
                />

                {/* Card Header */}
                <div className="p-8 pb-6">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Property Info */}
                    <div className="flex-1">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="mb-2 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                            {booking.place.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-slate-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              <span className="font-medium">
                                {booking.place.city}, {booking.place.area_name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-indigo-500" />
                              <span>{booking.place.category.name}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-lg ${getStatusStyle(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="font-semibold capitalize">
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="mb-1 text-sm text-slate-600">
                              Monthly Rent
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                              {formatCurrency(booking.place.rent_per_month)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="mb-1 text-sm text-slate-600">
                              Total (with bills)
                            </p>
                            <p className="text-xl font-semibold text-blue-600">
                              {formatCurrency(
                                parseFloat(booking.place.rent_per_month) +
                                  parseFloat(booking.place.extra_bills),
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* User Who Booked */}
                    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6">
                      <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                        <User className="h-5 w-5 text-blue-500" />
                        Account Holder
                      </h4>
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg ring-4 ring-white">
                          <img
                            src={
                              booking.booked_by.profile_image ||
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            }
                            alt={booking.booked_by.full_name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="mb-1 font-semibold text-slate-900">
                            {booking.booked_by.full_name}
                          </h5>
                          <p className="mb-2 text-sm text-slate-600">
                            {booking.booked_by.profession}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-slate-400" />
                              <span className="truncate text-slate-600">
                                {booking.booked_by.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-600">
                                {booking.booked_by.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Information */}
                    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                      <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                        <Calendar className="h-5 w-5 text-indigo-500" />
                        Booking Details
                      </h4>
                      <div className="space-y-4">
                        {booking.full_name &&
                          booking.full_name !== booking.booked_by.full_name && (
                            <div>
                              <p className="mb-1 text-sm text-slate-600">
                                Tenant Name
                              </p>
                              <p className="font-medium text-slate-900">
                                {booking.full_name}
                              </p>
                            </div>
                          )}
                        {booking.email &&
                          booking.email !== booking.booked_by.email && (
                            <div>
                              <p className="mb-1 text-sm text-slate-600">
                                Tenant Email
                              </p>
                              <p className="font-medium text-slate-900">
                                {booking.email}
                              </p>
                            </div>
                          )}
                        {booking.phone_number && (
                          <div>
                            <p className="mb-1 text-sm text-slate-600">
                              Contact Number
                            </p>
                            <p className="font-medium text-slate-900">
                              {booking.phone_number}
                            </p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="mb-1 text-sm text-slate-600">
                              Move-in
                            </p>
                            <p className="font-medium text-slate-900">
                              {formatDate(booking.move_in_date)}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-slate-600">
                              Move-out
                            </p>
                            <p className="font-medium text-slate-900">
                              {formatDate(booking.move_out_date)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 text-sm text-slate-600">
                            Occupants
                          </p>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-indigo-500" />
                            <span className="font-medium text-slate-900">
                              {booking.number_of_occupants} person(s)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Note */}
                  {booking.note && (
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                        <div>
                          <h5 className="mb-2 font-semibold text-amber-900">
                            Special Note
                          </h5>
                          <p className="leading-relaxed text-amber-800">
                            {booking.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Property Details Toggle */}
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        setExpandedCard(
                          expandedCard === booking.id ? null : booking.id,
                        )
                      }
                      className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
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
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
                      <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center">
                          <div className="text-2xl font-bold text-slate-900">
                            {booking.place.num_of_bedrooms}
                          </div>
                          <div className="text-sm text-slate-600">Bedrooms</div>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center">
                          <div className="text-2xl font-bold text-slate-900">
                            {booking.place.num_of_bathrooms}
                          </div>
                          <div className="text-sm text-slate-600">
                            Bathrooms
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center">
                          <div className="text-2xl font-bold text-slate-900">
                            {booking.place.area_in_sqft}
                          </div>
                          <div className="text-sm text-slate-600">Sq Ft</div>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center">
                          <div className="text-2xl font-bold text-slate-900">
                            {booking.place.capacity}
                          </div>
                          <div className="text-sm text-slate-600">
                            Max People
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-white p-4">
                        <h6 className="mb-2 font-semibold text-slate-900">
                          Full Address
                        </h6>
                        <p className="leading-relaxed text-slate-700">
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
                  <div className="mt-8 flex flex-wrap gap-4">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking.id, "confirmed")
                          }
                          className="flex transform items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-green-600 hover:shadow-xl hover:shadow-emerald-300"
                        >
                          <CheckCircle className="h-5 w-5" />
                          Confirm Booking
                        </button>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking.id, "rejected")
                          }
                          className="flex transform items-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition-all duration-200 hover:scale-105 hover:from-rose-600 hover:to-red-600 hover:shadow-xl hover:shadow-rose-300"
                        >
                          <XCircle className="h-5 w-5" />
                          Reject Booking
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(booking.id, "pending")
                        }
                        className="transform rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-200 transition-all duration-200 hover:scale-105 hover:from-amber-600 hover:to-yellow-600 hover:shadow-xl hover:shadow-amber-300"
                      >
                        Mark as Pending
                      </button>
                    )}
                    {booking.status === "rejected" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(booking.id, "pending")
                        }
                        className="transform rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl hover:shadow-blue-300"
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
