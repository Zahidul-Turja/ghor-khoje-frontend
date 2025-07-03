import React, { useState, useEffect } from "react";
import { Home, Wifi, Database } from "lucide-react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [stepStatus, setStepStatus] = useState([false, false, false]); // [server, db, properties]

  const steps = [
    { icon: Wifi, text: "Waking up server...", delay: 800 },
    { icon: Database, text: "Connecting to database...", delay: 1200 },
    { icon: Home, text: "Loading property data...", delay: 1000 },
  ];

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "http://localhost:8000";

  const checkServerHealth = async () => {
    try {
      const response = await fetch(`${BASE_URL}/health/`);
      if (response.status === 200) {
        setStepStatus((prev) => [true, prev[1], prev[2]]);
        setProgress(33);
        setCurrentStep(1);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Server not ready, retrying...");
      return false;
    }
  };

  const checkDatabase = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/places/list/`);
      if (response.ok) {
        setStepStatus((prev) => [prev[0], true, prev[2]]);
        setProgress(66);
        setCurrentStep(2);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Database connection failed");
      return false;
    }
  };

  const loadProperties = async () => {
    // Simulate property loading completion
    setStepStatus([true, true, true]);
    setProgress(100);
    setIsComplete(true);
    if (onLoadingComplete) {
      setTimeout(() => onLoadingComplete(), 500);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      // Step 1: Check server health
      let serverReady = await checkServerHealth();

      // If server not ready, keep trying every 3 seconds
      while (!serverReady) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        serverReady = await checkServerHealth();
      }

      // Step 2: Check database connection
      const dbReady = await checkDatabase();
      if (dbReady) {
        // Step 3: Complete loading
        await loadProperties();
      }
    };

    initializeApp();
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-20 top-20 h-32 w-32 animate-pulse rounded-full bg-blue-200"></div>
        <div className="absolute right-32 top-40 h-24 w-24 animate-pulse rounded-full bg-indigo-200 delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-purple-200 delay-500"></div>
      </div>

      <div className="w-full max-w-md space-y-8 p-8 text-center">
        {/* Main Logo/Icon */}
        <div className="relative">
          <div
            className={`transition-all duration-1000 ${isComplete ? "rotate-12 scale-110" : "scale-100"}`}
          >
            <div className="mx-auto flex h-20 w-20 transform items-center justify-center rounded-2xl bg-gradient-to-r from-primary/50 to-primary/90 shadow-lg transition-transform hover:scale-105">
              <Home className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 animate-ping rounded-full border-2 border-primary/50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 animate-ping rounded-full border border-primary/30 delay-500"></div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-primary/70 to-primary bg-clip-text text-3xl font-bold text-transparent">
            GhorKhojee
          </h1>
          <p className="font-medium text-gray-600">Your Dream Home Awaits</p>
          {/* Developer Note */}
          {currentStep === 0 && !stepStatus[0] && (
            <div className="mt-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-amber-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    <span className="font-semibold">Note:</span> Backend hosted
                    on Render's free tier -{" "}
                    <span className="font-bold">
                      cold starts can take upto 70 seconds
                    </span>{" "}
                    as the server spins up from sleep mode. This simulates
                    real-world deployment scenarios and cost-effective scaling
                    strategies.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {Math.round(Math.min(progress, 100))}% Complete
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isPassed = index < currentStep;

            return (
              <div
                key={index}
                className={`flex items-center space-x-3 rounded-lg p-3 transition-all duration-500 ${
                  isActive
                    ? "scale-105 transform bg-blue-50 text-blue-700"
                    : isPassed
                      ? "bg-green-50 text-green-700"
                      : "text-gray-400"
                }`}
              >
                <div
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isActive ? "animate-spin" : isPassed ? "animate-bounce" : ""
                  }`}
                >
                  <StepIcon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{step.text}</span>
                {isPassed && (
                  <div className="ml-auto">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Animation */}
        {isComplete && (
          <div className="animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="mt-4 font-semibold text-green-600">
              Ready to explore properties!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
