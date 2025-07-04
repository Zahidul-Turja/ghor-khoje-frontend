"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaCog,
  FaEnvelope,
  FaChartBar,
  FaTasks,
  FaTimes,
} from "react-icons/fa";
import { RiNotification3Fill } from "react-icons/ri";
import { IoBookmark } from "react-icons/io5";
import { FaCodePullRequest } from "react-icons/fa6";
import { MapPinHouse } from "lucide-react";

const CURRENT_URL = "/user/profile";

function Sidebar({ isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  // Navigation items with their respective icons
  const navItems = [
    { name: "Profile", icon: <FaUser /> },
    { name: "My Properties", icon: <MapPinHouse className="h-5 w-5" /> },
    { name: "Requests", icon: <FaCodePullRequest /> },
    { name: "Book Marks", icon: <IoBookmark /> },
    { name: "Notifications", icon: <RiNotification3Fill /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "Tasks", icon: <FaTasks /> },
    // { name: "Calendar", icon: <FaCalendarAlt /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  // Reset collapsed state on mobile when sidebar opens
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      setCollapsed(false);
    }
  }, [isOpen]);

  const handleNavClick = (itemName) => {
    setActiveSection(itemName.toLowerCase());
    // Close mobile sidebar when item is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`sticky top-0 hidden h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 lg:flex ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Desktop Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          {!collapsed && <h2 className="text-lg font-bold">Navigation</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="no-scrollbar flex-grow overflow-y-auto">
          <ul className="py-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={`${CURRENT_URL}/?section=${item.name.toLowerCase().replace(" ", "-")}`}
                  className={`flex items-center px-4 py-3 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
                    activeSection === item.name.toLowerCase().replace(" ", "-")
                      ? "bg-blue-50 font-semibold text-primary dark:bg-gray-700"
                      : "text-gray-500"
                  } ${collapsed ? "justify-center" : ""}`}
                  onClick={() => handleNavClick(item.name)}
                >
                  <span
                    className={`${collapsed ? "text-lg" : "mr-3 text-base"}`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span className="text-sm">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex h-full w-64 flex-col border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 dark:border-gray-700 dark:bg-gray-950 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="text-lg font-bold">Navigation</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex-grow overflow-y-auto">
          <ul className="py-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={`${CURRENT_URL}/?section=${item.name.toLowerCase().replace(" ", "-")}`}
                  className={`flex items-center px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-400 dark:hover:text-gray-900 ${
                    activeSection === item.name.toLowerCase().replace(" ", "-")
                      ? "bg-blue-50 font-semibold text-primary dark:bg-gray-400 dark:text-gray-900"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => handleNavClick(item.name)}
                >
                  <span className="mr-4 text-lg">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Footer */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Swipe left to close
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
