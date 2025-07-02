"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Star,
  Calendar,
  Info,
  AlertTriangle,
  XCircle,
  Settings,
} from "lucide-react";

import {
  listOfNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/app/_lib/apiCalls";

function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingIds, setMarkingIds] = useState(new Set());

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await listOfNotifications();
        setNotifications(response);
      } catch (error) {
        console.error("Error fetching list of notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Function to get icon and color based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "ERROR":
        return <XCircle size={18} className="text-red-500" />;
      case "INFO":
        return <Info size={18} className="text-blue-500" />;
      case "REVIEW":
        return <Star size={18} className="text-yellow-500" />;
      case "BOOKING":
        return <Calendar size={18} className="text-purple-500" />;
      case "SYSTEM":
        return <Settings size={18} className="text-gray-500" />;
      case "WARNING":
        return <AlertTriangle size={18} className="text-orange-500" />;
      case "SUCCESS":
        return <CheckCircle size={18} className="text-green-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.is_read);
    if (unreadNotifications.length === 0) {
      return; // No unread notifications
    }

    setIsMarkingAllRead(true);
    try {
      await markAllNotificationsAsRead();

      // Update local state - mark all as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          is_read: true,
        })),
      );

      console.log("All notifications marked as read");
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (!notification || notification.is_read) {
      return; // Already read or not found
    }

    setMarkingIds((prev) => new Set([...prev, notificationId]));

    try {
      await markNotificationAsRead(notificationId);

      // Update local state for this specific notification
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, is_read: true } : n,
        ),
      );

      console.log(`Notification ${notificationId} marked as read`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setMarkingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  // Function to format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.is_read)
        : notifications.filter((n) => n.is_read);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) {
    return (
      <div className="min-h-screen sm:px-6">
        <div className="mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
              Notifications
            </h1>
          </div>
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary/80"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:px-6">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Notifications
          </h1>
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

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
          <div className="border-b border-gray-200 bg-gradient-to-r from-primary/80 to-primary/90 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell size={24} className="mr-3 rotate-12 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Activity Center
                </h2>
              </div>
              <div className="flex items-center">
                <span className="mr-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary">
                  {unreadCount} new
                </span>
                <button
                  onClick={markAllAsRead}
                  disabled={isMarkingAllRead || unreadCount === 0}
                  className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isMarkingAllRead ? "Marking..." : "Mark all read"}
                </button>
              </div>
            </div>

            <div className="mt-6 flex space-x-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "all"
                    ? "bg-white text-primary"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("unread")}
                className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "unread"
                    ? "bg-white text-indigo-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setActiveTab("read")}
                className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "read"
                    ? "bg-white text-indigo-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Read
              </button>
            </div>
          </div>

          <div className="p-1">
            {filteredNotifications.length > 0 ? (
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`dark:hover-bg-gray-700 flex items-start p-4 transition hover:bg-gray-800 ${
                      !notification.is_read
                        ? "cursor-pointer bg-blue-50/50"
                        : ""
                    } ${markingIds.has(notification.id) ? "opacity-60" : ""}`}
                  >
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      {notification.title && (
                        <h3
                          className={`mb-1 text-sm font-semibold ${
                            !notification.is_read
                              ? "text-gray-900 dark:text-gray-400"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {notification.title}
                        </h3>
                      )}
                      <p
                        className={`text-sm ${
                          !notification.is_read
                            ? "font-medium text-gray-900 dark:text-gray-400"
                            : "text-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {formatTime(notification.created_at)}
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          {notification.type}
                        </span>
                        {markingIds.has(notification.id) && (
                          <span className="ml-2 text-xs text-blue-600">
                            Marking as read...
                          </span>
                        )}
                      </div>
                    </div>
                    {!notification.is_read && (
                      <div className="ml-2 flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                    )}
                    <button className="ml-4 flex-shrink-0 rounded-full p-1 hover:bg-gray-200">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <Bell
                    size={32}
                    className="text-gray-400 dark:text-gray-300"
                  />
                </div>
                <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-200">
                  No notifications
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You're all caught up! Check back later.
                </p>
              </div>
            )}
          </div>

          {filteredNotifications.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-200">
                  Clear all notifications
                </button>
                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500">
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
