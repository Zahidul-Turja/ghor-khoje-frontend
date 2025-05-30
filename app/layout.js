"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";
import LoadingScreen from "@/app/_components/LoadingScreen"; // Adjust path as needed

import { poppins, raleway } from "@/app/_utils/fonts";

export default function RootLayout({ children }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleInitialLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  return (
    <html lang="en">
      <body
        className={`${raleway.className} relative min-h-screen min-w-full bg-gray-50 text-gray-800 antialiased`}
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
