"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";
import {
  Construction,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Star,
  Calendar,
  MapPin,
  Clock,
  Award,
} from "lucide-react";

// Enhanced dummy data
const bookingsData = [
  { month: "Jan", bookings: 12, revenue: 5400, avgPrice: 450 },
  { month: "Feb", bookings: 18, revenue: 7200, avgPrice: 400 },
  { month: "Mar", bookings: 9, revenue: 3600, avgPrice: 400 },
  { month: "Apr", bookings: 20, revenue: 8200, avgPrice: 410 },
  { month: "May", bookings: 15, revenue: 6000, avgPrice: 400 },
  { month: "Jun", bookings: 25, revenue: 10500, avgPrice: 420 },
];

const occupancyData = [
  { month: "Jan", occupancyRate: 65, bookings: 12 },
  { month: "Feb", occupancyRate: 78, bookings: 18 },
  { month: "Mar", occupancyRate: 45, bookings: 9 },
  { month: "Apr", occupancyRate: 85, bookings: 20 },
  { month: "May", occupancyRate: 72, bookings: 15 },
  { month: "Jun", occupancyRate: 92, bookings: 25 },
];

const topListingsData = [
  { name: "Luxury Suite Downtown", bookings: 25, revenue: 8750, rating: 4.8 },
  { name: "Cozy Garden Apartment", bookings: 18, revenue: 5400, rating: 4.6 },
  { name: "Modern Loft Studio", bookings: 12, revenue: 4200, rating: 4.4 },
  { name: "Seaside Villa", bookings: 8, revenue: 4800, rating: 4.9 },
  { name: "Urban Penthouse", bookings: 6, revenue: 3600, rating: 4.3 },
];

const bookingSourceData = [
  { name: "Direct Booking", value: 35, color: "#4f46e5" },
  { name: "Airbnb", value: 28, color: "#10b981" },
  { name: "Booking.com", value: 20, color: "#f59e0b" },
  { name: "Expedia", value: 12, color: "#ef4444" },
  { name: "Others", value: 5, color: "#8b5cf6" },
];

const guestTypeData = [
  { name: "Business", value: 40, color: "#3b82f6" },
  { name: "Leisure", value: 45, color: "#10b981" },
  { name: "Family", value: 15, color: "#f59e0b" },
];

const seasonalTrendsData = [
  { month: "Jan", avgStay: 3.2, revenue: 5400, guests: 28 },
  { month: "Feb", avgStay: 2.8, revenue: 7200, guests: 42 },
  { month: "Mar", avgStay: 3.5, revenue: 3600, guests: 18 },
  { month: "Apr", avgStay: 2.9, revenue: 8200, guests: 48 },
  { month: "May", avgStay: 3.1, revenue: 6000, guests: 35 },
  { month: "Jun", avgStay: 2.6, revenue: 10500, guests: 58 },
];

const performanceMetrics = [
  { metric: "Response Rate", value: 95, target: 90, color: "#10b981" },
  { metric: "Check-in Rating", value: 4.7, target: 4.5, color: "#3b82f6" },
  { metric: "Cleanliness", value: 4.8, target: 4.5, color: "#f59e0b" },
  { metric: "Communication", value: 4.6, target: 4.3, color: "#8b5cf6" },
];

const priceOptimizationData = [
  { price: 200, bookings: 15, revenue: 3000 },
  { price: 250, bookings: 22, revenue: 5500 },
  { price: 300, bookings: 18, revenue: 5400 },
  { price: 350, bookings: 12, revenue: 4200 },
  { price: 400, bookings: 8, revenue: 3200 },
  { price: 450, bookings: 5, revenue: 2250 },
];

const cancellationData = [
  { month: "Jan", cancellations: 2, bookings: 12, rate: 16.7 },
  { month: "Feb", cancellations: 1, bookings: 18, rate: 5.6 },
  { month: "Mar", cancellations: 3, bookings: 9, rate: 33.3 },
  { month: "Apr", cancellations: 2, bookings: 20, rate: 10.0 },
  { month: "May", cancellations: 1, bookings: 15, rate: 6.7 },
  { month: "Jun", cancellations: 3, bookings: 25, rate: 12.0 },
];

function Analytics() {
  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      red: "bg-red-500",
    };

    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p
                className={`text-sm ${change > 0 ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
              >
                <TrendingUp size={12} />
                {change > 0 ? "+" : ""}
                {change}%
              </p>
            )}
          </div>
          <div className={`${colorClasses[color]} rounded-lg p-3`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-4xl font-bold text-transparent">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Track your rental performance and insights
            </p>
          </div>
          <div className="flex gap-2">
            <div className="rounded-full bg-gradient-to-r from-primary/80 to-primary p-3 shadow-lg">
              <Construction size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$42,900"
            change={15.3}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Total Bookings"
            value="109"
            change={8.2}
            icon={Calendar}
            color="blue"
          />
          <StatCard
            title="Avg Rating"
            value="4.7"
            change={2.1}
            icon={Star}
            color="orange"
          />
          <StatCard
            title="Occupancy Rate"
            value="73%"
            change={-1.2}
            icon={Users}
            color="purple"
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue & Bookings Combined */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <TrendingUp className="text-blue-500" size={20} />
              Revenue & Bookings Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="bookings"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Bookings"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Revenue ($)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Occupancy Rate */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Users className="text-purple-500" size={20} />
              Occupancy Rate
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient
                    id="colorOccupancy"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Occupancy Rate"]}
                />
                <Area
                  type="monotone"
                  dataKey="occupancyRate"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOccupancy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Booking Sources */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <MapPin className="text-green-500" size={20} />
              Booking Sources
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={bookingSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookingSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Guest Types */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Users className="text-blue-500" size={20} />
              Guest Types
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={guestTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {guestTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Award className="text-orange-500" size={20} />
              Performance Metrics
            </h2>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {metric.metric}
                    </span>
                    <span className="text-sm font-bold">
                      {metric.value}
                      {metric.metric.includes("Rate") ? "%" : "/5"}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(metric.value / (metric.metric.includes("Rate") ? 100 : 5)) * 100}%`,
                        backgroundColor: metric.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Listings */}
        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Star className="text-yellow-500" size={20} />
            Top Performing Listings
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topListingsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="bookings" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Price Optimization */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="text-green-500" size={20} />
              Price vs Bookings Analysis
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={priceOptimizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="price" name="Price" unit="$" />
                <YAxis dataKey="bookings" name="Bookings" />
                <ZAxis
                  dataKey="revenue"
                  range={[50, 400]}
                  name="Revenue"
                  unit="$"
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value, name) => {
                    if (name === "revenue") return [`$${value}`, "Revenue"];
                    if (name === "bookings") return [value, "Bookings"];
                    return [value, name];
                  }}
                />
                <Scatter dataKey="bookings" fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Seasonal Trends */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Clock className="text-indigo-500" size={20} />
              Average Stay Duration
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={seasonalTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [`${value} days`, "Avg Stay"]}
                />
                <Line
                  type="monotone"
                  dataKey="avgStay"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cancellation Analysis */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Eye className="text-red-500" size={20} />
            Cancellation Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={cancellationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="cancellations"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                name="Cancellations"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Cancellation Rate (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
