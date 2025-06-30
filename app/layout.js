"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";
import LoadingScreen from "@/app/_components/LoadingScreen";
import useAuthStore from "@/app/_store/authStore";

import { poppins, raleway } from "@/app/_utils/fonts";

export default function RootLayout({ children }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const theme = useAuthStore((state) => state.theme);

  useEffect(() => {
    // Apply theme class to <html>
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleInitialLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body
        className={`${raleway.className} relative min-h-screen min-w-full bg-gray-50 text-gray-800 antialiased dark:bg-gray-900 dark:text-white`}
      >
        {isInitialLoading && (
          <LoadingScreen onLoadingComplete={handleInitialLoadingComplete} />
        )}

        {!isInitialLoading && children}

        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
