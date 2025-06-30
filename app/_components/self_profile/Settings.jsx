"use client";

import { useState } from "react";
import {
  Construction,
  Eye,
  EyeOff,
  Lock,
  User,
  Bell,
  Shield,
  Save,
  Moon,
  Sun,
  CreditCard,
  Trash2,
  MessageCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  Download,
  ExternalLink,
} from "lucide-react";

import { useRouter } from "next/navigation";

import useAuthStore from "@/app/_store/authStore";
import toast from "react-hot-toast";

function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {},
  );

  const { changePassword, deactivateAccount, setTheme } = useAuthStore();
  const theme = useAuthStore((state) => state.theme);

  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [profile, setProfile] = useState({
    phone: "",
    email: "",
    timezone: "UTC",
  });
  const [chatSettings, setChatSettings] = useState({
    openToChat: true,
    showOnlineStatus: true,
    allowDirectMessages: false,
  });
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    changePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword,
      passwordForm.confirmPassword,
    );
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleChatSettingChange = (setting) => {
    setChatSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleAccountDeactivate = async () => {
    const result = await deactivateAccount();
    setShowDeactivateModal(false);
    if (result) {
      router.push("/auth/login");
    }
  };

  const toggleDarkMode = () => {
    setTheme(darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
    // In a real app, you'd also update the global theme here
  };

  const baseClasses = darkMode
    ? "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    : "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900";

  const cardClasses = darkMode
    ? "rounded-lg bg-gray-800 border border-gray-700 p-6 shadow-sm"
    : "rounded-lg bg-white p-6 shadow-sm";

  const inputClasses = darkMode
    ? "w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
    : "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <div className={`${baseClasses} rounded-lg p-12 sm:px-6`}>
      <div className="mx-auto w-full px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleDarkMode}
              className={`rounded-full p-2 shadow-md transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-primary/70 hover:bg-primary/80"
              }`}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-white" />
              )}
            </button>
            <div
              className={`rounded-full p-2 shadow-md ${darkMode ? "bg-gray-700" : "bg-primary/70"}`}
            >
              <Construction size={20} className="text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className={cardClasses}>
            <div className="mb-4 flex items-center gap-2">
              {darkMode ? (
                <Moon className="h-5 w-5 text-indigo-400" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Dark Mode</h3>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Switch between light and dark themes
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                  darkMode ? "bg-primary/90" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Profile Settings */}
          <div className={cardClasses}>
            <div className="mb-4 flex items-center gap-2">
              <User
                className={`h-5 w-5 ${darkMode ? "text-indigo-400" : "text-primary"}`}
              />
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  value={user.phone || "N/A"}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  disabled
                  className={`${inputClasses} disabled:opacity-50`}
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email || "N/A"}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, email: e.target.value }))
                  }
                  disabled
                  className={`${inputClasses} disabled:opacity-50`}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Chat Settings */}
          <div className={cardClasses}>
            <div className="mb-4 flex items-center gap-2">
              <MessageCircle
                className={`h-5 w-5 ${darkMode ? "text-indigo-400" : "text-primary"}`}
              />
              <h2 className="text-xl font-semibold">Chat & Communication</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Open to Chat</h3>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Allow others to start conversations with you
                  </p>
                </div>
                <button
                  onClick={() => handleChatSettingChange("openToChat")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                    chatSettings.openToChat ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      chatSettings.openToChat
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Show Online Status</h3>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Display when you're online to other users
                  </p>
                </div>
                <button
                  onClick={() => handleChatSettingChange("showOnlineStatus")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                    chatSettings.showOnlineStatus ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      chatSettings.showOnlineStatus
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Allow Direct Messages</h3>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Let users send you private messages
                  </p>
                </div>
                <button
                  onClick={() => handleChatSettingChange("allowDirectMessages")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                    chatSettings.allowDirectMessages
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      chatSettings.allowDirectMessages
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className={cardClasses}>
            <div className="mb-4 flex items-center gap-2">
              <Lock
                className={`h-5 w-5 ${darkMode ? "text-indigo-400" : "text-primary/80"}`}
              />
              <h2 className="text-xl font-semibold">Change Password</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className={inputClasses}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className={inputClasses}
                    placeholder="Enter new password (min 8 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className={inputClasses}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              <button
                onClick={handlePasswordChange}
                className="inline-flex items-center gap-2 rounded-md bg-primary/70 px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                <Shield size={16} />
                Change Password
              </button>
            </div>
          </div>

          {/* Billing & Payment */}
          <div className={`${cardClasses} opacity-60`}>
            <div className="mb-4 flex items-center gap-2">
              <CreditCard
                className={`h-5 w-5 ${darkMode ? "text-indigo-400" : "text-primary"}`}
              />
              <h2 className="text-xl font-semibold">Billing & Payment</h2>
            </div>
            <div className="space-y-4">
              <div
                className={`rounded-lg p-4 ${darkMode ? "border border-gray-600 bg-gray-700" : "border border-gray-200 bg-gray-50"}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">Current Plan</h3>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Pro Plan
                  </span>
                </div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  $29/month • Next billing: January 15, 2025
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <CreditCard size={16} />
                  Update Payment Method
                </button>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Download size={16} />
                  Download Invoices
                </button>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <DollarSign size={16} />
                  Change Plan
                </button>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <ExternalLink size={16} />
                  Billing Portal
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className={cardClasses}>
            <div className="mb-4 flex items-center gap-2">
              <Bell
                className={`h-5 w-5 ${darkMode ? "text-indigo-400" : "text-primary"}`}
              />
              <h2 className="text-xl font-semibold">
                Notification Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("email")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    notifications.email ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between opacity-60">
                <div>
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Receive push notifications on your device
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("push")}
                  disabled
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    notifications.push ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.push ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between opacity-60">
                <div>
                  <h3 className="text-sm font-medium">SMS Notifications</h3>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Receive text message alerts
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("sms")}
                  disabled
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    notifications.sms ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.sms ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className={cardClasses}>
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-red-500">
                Account Management
              </h2>
            </div>
            <div className="space-y-4">
              <div
                className={`rounded-lg p-4 ${darkMode ? "border border-red-800 bg-red-900/20" : "border border-red-200 bg-red-50"}`}
              >
                <h3 className="mb-1 text-sm font-medium text-red-800">
                  Danger Zone
                </h3>
                <p
                  className={`mb-3 text-sm ${darkMode ? "text-red-300" : "text-red-600"}`}
                >
                  These actions are permanent and cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Trash2 size={16} />
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deactivate Account Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`mx-4 w-full max-w-md rounded-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold">Deactivate Account</h3>
              </div>
              <p
                className={`mb-6 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Are you sure you want to deactivate your account? This action
                will:
              </p>
              <ul
                className={`mb-6 space-y-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                <li>• Remove access to all your data</li>
                <li>• Disable your account</li>
                <li>• Need to ask support to reactivate</li>
                <li>
                  • Delete your profile and data permanently (after 30 days)
                </li>
              </ul>
              <div className="flex gap-3">
                <button
                  onClick={handleAccountDeactivate}
                  className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Yes, Deactivate
                </button>
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
