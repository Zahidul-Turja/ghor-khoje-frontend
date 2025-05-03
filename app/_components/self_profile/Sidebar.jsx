"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaEnvelope,
  FaChartBar,
  FaFileAlt,
  FaUsers,
  FaFolderOpen,
  FaTasks,
  FaCalendarAlt,
  FaBook,
  FaLifeRing,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import { RiNotification3Fill } from "react-icons/ri";

const CURRENT_URL = "/user/profile";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  // Navigation items with their respective icons
  const navItems = [
    { name: "Profile", icon: <FaUser /> },
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Notifications", icon: <RiNotification3Fill /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "Reports", icon: <FaFileAlt /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Projects", icon: <FaFolderOpen /> },
    { name: "Tasks", icon: <FaTasks /> },
    { name: "Calendar", icon: <FaCalendarAlt /> },
    { name: "Documentation", icon: <FaBook /> },
    { name: "Support", icon: <FaLifeRing /> },
    { name: "FAQ", icon: <FaQuestionCircle /> },
    { name: "Contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <div
      className={`sticky top-0 flex h-[calc(100vh-64px)] flex-col border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        {!collapsed && <h2 className="text-lg font-bold">Navigation</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="no-scrollbar flex-grow overflow-y-auto">
        <ul className="py-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={`${CURRENT_URL}/?section=${item.name.toLowerCase()}`}
                className={`flex items-center px-4 py-3 hover:bg-gray-100 ${collapsed ? "justify-center" : ""}`}
              >
                <span
                  className={`text-gray-500 ${collapsed ? "text-lg" : "mr-3"}`}
                >
                  {item.icon}
                </span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
