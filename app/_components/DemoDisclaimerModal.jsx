"use client";

import { useEffect, useRef } from "react";
import { Home, Mail, X } from "lucide-react";

export default function DemoDisclaimerModal({ open, onClose }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    // Only close if the click started on the backdrop itself, not inside the card
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-notice-title"
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-gray-800"
        style={{ animation: "demoNoticeIn 0.22s ease-out" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Logo, matching the loading/health-check screens */}
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-primary/50 to-primary/90 shadow-lg">
          <Home className="h-8 w-8 text-white" />
        </div>

        {/* Title + subtitle */}
        <h2
          id="demo-notice-title"
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
        >
          This is a demo project
        </h2>
        <p className="mt-1 bg-gradient-to-r from-primary/70 to-primary bg-clip-text text-sm font-semibold text-transparent">
          Built to showcase full-stack development
        </p>

        {/* Body */}
        <div className="mt-5 space-y-3 text-left">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            GhorKhojee isn&apos;t a real business — it&apos;s a portfolio
            project. None of the listings or data shown here are real, and some
            images have been sourced from public places such as Google and
            Facebook purely for demonstration purposes.
          </p>

          <div className="flex items-start space-x-2.5 rounded-lg border border-blue-100 bg-blue-50/70 p-3 dark:border-gray-700 dark:bg-gray-900/40">
            <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              If any image here is yours and you&apos;d like it removed, email{" "}
              <a
                href="mailto:zahidulturja@gmail.com"
                className="font-medium text-primary underline underline-offset-2"
              >
                zahidulturja@gmail.com
              </a>{" "}
              and it will be taken down promptly.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-primary/50 to-primary/90 px-4 py-2.5 text-sm font-medium text-white shadow transition-transform hover:scale-[1.02]"
        >
          Got it
        </button>
      </div>

      <style jsx>{`
        @keyframes demoNoticeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
