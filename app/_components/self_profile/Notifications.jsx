"use client";

import { useState } from "react";
import {
  Bell,
  UserPlus,
  MessageSquare,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
} from "lucide-react";

function Notifications() {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "follow",
      message: "Alex Morgan started following you",
      time: "2 hours ago",
      read: false,
      icon: <UserPlus size={18} className="text-blue-500" />,
    },
    {
      id: 2,
      type: "comment",
      message: 'Sarah commented on your recent post: "This is amazing work!"',
      time: "5 hours ago",
      read: false,
      icon: <MessageSquare size={18} className="text-green-500" />,
    },
    {
      id: 3,
      type: "like",
      message: "Chris liked your photo",
      time: "1 day ago",
      read: true,
      icon: <Heart size={18} className="text-red-500" />,
    },
    {
      id: 4,
      type: "alert",
      message: "Your account password was changed successfully",
      time: "2 days ago",
      read: true,
      icon: <CheckCircle size={18} className="text-emerald-500" />,
    },
    {
      id: 5,
      type: "system",
      message: "System maintenance scheduled for tomorrow at 2:00 AM",
      time: "3 days ago",
      read: true,
      icon: <AlertCircle size={18} className="text-amber-500" />,
    },
  ];

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.read);

  return (
    <div className="min-h-screen sm:px-6">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <div className="flex items-center space-x-2">
            <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="relative">
              <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
                <MoreHorizontal size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="border-b border-gray-200 bg-gradient-to-r from-primary/90 to-primary/80 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell size={24} className="mr-3 rotate-12 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Activity Center
                </h2>
              </div>
              <div className="flex items-center">
                <span className="mr-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary/90">
                  {notifications.filter((n) => !n.read).length} new
                </span>
                <button className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white hover:bg-white/30">
                  Mark all read
                </button>
              </div>
            </div>

            <div className="mt-6 flex space-x-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "all"
                    ? "bg-white text-primary/90"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("unread")}
                className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "unread"
                    ? "bg-white text-primary/90"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setActiveTab("read")}
                className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "read"
                    ? "bg-white text-primary/90"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Read
              </button>
            </div>
          </div>

          <div className="p-1">
            {filteredNotifications.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`flex items-start p-4 transition hover:bg-gray-50 ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
                      {notification.icon}
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`text-sm ${!notification.read ? "font-medium text-gray-900" : "text-gray-800"}`}
                      >
                        {notification.message}
                      </p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {notification.time}
                      </div>
                    </div>
                    <button className="ml-4 flex-shrink-0 rounded-full p-1 hover:bg-gray-200">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Bell size={32} className="text-gray-400" />
                </div>
                <h3 className="mb-1 text-lg font-medium text-gray-900">
                  No notifications
                </h3>
                <p className="text-gray-500">
                  You're all caught up! Check back later.
                </p>
              </div>
            )}
          </div>

          {filteredNotifications.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  Clear all notifications
                </button>
                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                  View all activity
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
