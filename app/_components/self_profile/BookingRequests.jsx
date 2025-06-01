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
        title: "vagag",
        slug: "vagag",
        owner: {
          id: 9,
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          profession: "Engineer",
          hosted_places: 6,
          rating: 4.33,
          profile_image:
            "http://127.0.0.1:8000/media/users/profile_images/profile-1.jpg",
        },
        description: "fref",
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
      },
      move_in_date: null,
      move_out_date: "2025-12-01",
      number_of_occupants: 1,
      note: null,
      status: "pending",
    },
    {
      id: 2,
      place: {
        id: 5,
        title: "At unde sequi tenetu",
        slug: "at-unde-sequi-tenetu",
        owner: {
          id: 9,
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          profession: "Engineer",
          hosted_places: 6,
          rating: 4.33,
          profile_image:
            "http://127.0.0.1:8000/media/users/profile_images/profile-1.jpg",
        },
        description: "Dolorem duis quis si",
        category: {
          id: 5,
          name: "Studio Apartment",
          slug: "studio-apartment",
        },
        city: "Ea expedita sit in",
        area_name: "Rina Dickson",
        house_name: "Sasha Oneal",
        house_number: "927",
        apartment_number: "201",
        rent_per_month: "4.00",
        extra_bills: "63.00",
        num_of_bedrooms: 67,
        num_of_bathrooms: 58,
        area_in_sqft: 14,
        capacity: 64,
      },
      booked_by: {
        id: 9,
        full_name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "01748052301",
        profession: "Engineer",
      },
      move_in_date: null,
      move_out_date: "2025-12-01",
      number_of_occupants: 1,
      note: null,
      status: "pending",
    },
    {
      id: 1,
      place: {
        id: 43,
        title: "Aliquip laborum enim",
        slug: "aliquip-laborum-enim",
        owner: {
          id: 9,
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          profession: "Engineer",
          hosted_places: 6,
          rating: 4.33,
          profile_image:
            "http://127.0.0.1:8000/media/users/profile_images/profile-1.jpg",
        },
        description: "Aut fugit minim rer",
        category: {
          id: 12,
          name: "Family",
          slug: "family",
        },
        city: "Obcaecati ipsum quis",
        area_name: "Anthony Mosley",
        house_name: "Yolanda Fitzpatrick",
        house_number: "752",
        apartment_number: "522",
        rent_per_month: "3.00",
        extra_bills: "11.00",
        num_of_bedrooms: 91,
        num_of_bathrooms: 50,
        area_in_sqft: 35,
        capacity: 18,
      },
      booked_by: {
        id: 9,
        full_name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "01748052301",
        profession: "Engineer",
      },
      move_in_date: "2025-06-01",
      move_out_date: "2026-06-01",
      number_of_occupants: 1,
      note: "Clean before we come",
      status: "pending",
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
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Booking Requests
          </h1>
          <p className="text-gray-600">
            Manage and review all property booking requests
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "confirmed", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-4 py-2 font-medium capitalize transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {status === "all" ? "All Requests" : status}
                <span className="ml-2 text-sm">
                  (
                  {status === "all"
                    ? bookings.length
                    : bookings.filter((b) => b.status === status).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-gray-400">
                <Home className="mx-auto h-16 w-16" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No booking requests found
              </h3>
              <p className="text-gray-500">
                {filter === "all"
                  ? "No booking requests have been made yet."
                  : `No ${filter} booking requests found.`}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                {/* Card Header */}
                <div className="border-b border-gray-100 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-semibold text-gray-900">
                            {booking.place.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {booking.place.city}, {booking.place.area_name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Home className="h-4 w-4" />
                              <span>{booking.place.category.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>
                                {formatCurrency(booking.place.rent_per_month)}
                                /month
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Tenant Information */}
                    <div className="space-y-4">
                      <h4 className="border-b pb-2 font-semibold text-gray-900">
                        Tenant Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            {booking.booked_by.full_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            {booking.booked_by.email}
                          </span>
                        </div>
                        {booking.booked_by.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">
                              {booking.booked_by.phone}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            {booking.number_of_occupants} occupant(s)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                      <h4 className="border-b pb-2 font-semibold text-gray-900">
                        Booking Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            Move-in: {formatDate(booking.move_in_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            Move-out: {formatDate(booking.move_out_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            Total:{" "}
                            {formatCurrency(
                              parseFloat(booking.place.rent_per_month) +
                                parseFloat(booking.place.extra_bills),
                            )}
                            /month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Note */}
                  {booking.note && (
                    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <h5 className="mb-2 font-medium text-blue-900">
                        Special Note:
                      </h5>
                      <p className="text-blue-800">{booking.note}</p>
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
                      className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
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
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                        <div>
                          <span className="text-gray-500">Bedrooms:</span>
                          <div className="font-medium">
                            {booking.place.num_of_bedrooms}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Bathrooms:</span>
                          <div className="font-medium">
                            {booking.place.num_of_bathrooms}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Area:</span>
                          <div className="font-medium">
                            {booking.place.area_in_sqft} sqft
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Capacity:</span>
                          <div className="font-medium">
                            {booking.place.capacity} people
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-500">Address:</span>
                        <div className="font-medium">
                          {booking.place.house_name},{" "}
                          {booking.place.house_number},
                          {booking.place.apartment_number &&
                            ` Apt ${booking.place.apartment_number},`}
                          {booking.place.area_name}, {booking.place.city}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking.id, "confirmed")
                          }
                          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Confirm Booking
                        </button>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking.id, "rejected")
                          }
                          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject Booking
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(booking.id, "pending")
                        }
                        className="rounded-lg bg-yellow-600 px-6 py-2 text-white transition-colors hover:bg-yellow-700"
                      >
                        Mark as Pending
                      </button>
                    )}
                    {booking.status === "rejected" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(booking.id, "pending")
                        }
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
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
