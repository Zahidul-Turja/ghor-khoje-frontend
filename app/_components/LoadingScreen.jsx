import React, { useState, useEffect, useCallback } from "react";
import {
  Home,
  Wifi,
  Database,
  Server,
  Wrench,
  Zap,
  WifiOff,
  RefreshCw,
  Check,
  AlertTriangle,
} from "lucide-react";

const MAX_HEALTH_ATTEMPTS = 3;
const HEALTH_RETRY_DELAY_MS = 3000;

const MAX_DB_ATTEMPTS = 3;
const DB_RETRY_DELAY_MS = 2500;

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [stepStatus, setStepStatus] = useState([false, false, false]); // [server, db, properties]
  const [serverDown, setServerDown] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const steps = [
    { icon: Wifi, text: "Checking server status..." },
    { icon: Database, text: "Connecting to database..." },
    { icon: Home, text: "Loading property data..." },
  ];

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "http://localhost:8000";

  const pingHealth = async () => {
    try {
      const response = await fetch(`${BASE_URL}/health/`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const pingDatabase = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/places/list/`);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Tries the health check a few times (in case it's just a brief blip)
  // before concluding the server is actually down.
  const checkServerHealth = async () => {
    for (let attempt = 1; attempt <= MAX_HEALTH_ATTEMPTS; attempt++) {
      const healthy = await pingHealth();
      if (healthy) {
        setStepStatus((prev) => [true, prev[1], prev[2]]);
        setProgress(33);
        setCurrentStep(1);
        return true;
      }
      if (attempt < MAX_HEALTH_ATTEMPTS) {
        await new Promise((resolve) =>
          setTimeout(resolve, HEALTH_RETRY_DELAY_MS),
        );
      }
    }
    return false;
  };

  // Server responded fine here, so this is a separate failure mode
  // (e.g. DB down, API error) — not the "server offline" case.
  const checkDatabase = async () => {
    for (let attempt = 1; attempt <= MAX_DB_ATTEMPTS; attempt++) {
      const ok = await pingDatabase();
      if (ok) {
        setStepStatus((prev) => [prev[0], true, prev[2]]);
        setProgress(66);
        setCurrentStep(2);
        return true;
      }
      if (attempt < MAX_DB_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, DB_RETRY_DELAY_MS));
      }
    }
    return false;
  };

  const loadProperties = async () => {
    setStepStatus([true, true, true]);
    setProgress(100);
    setIsComplete(true);
    if (onLoadingComplete) {
      setTimeout(() => onLoadingComplete(), 500);
    }
  };

  const initializeApp = useCallback(async () => {
    setServerDown(false);
    setDataError(false);

    const serverReady = await checkServerHealth();
    if (!serverReady) {
      setServerDown(true);
      return;
    }

    const dbReady = await checkDatabase();
    if (!dbReady) {
      setDataError(true);
      return;
    }

    await loadProperties();
  }, [onLoadingComplete]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setProgress(0);
    setCurrentStep(0);
    setStepStatus([false, false, false]);
    await initializeApp();
    setIsRetrying(false);
  };

  // ---- Server down state ----
  if (serverDown) {
    const reasons = [
      {
        icon: Wrench,
        title: "Scheduled maintenance",
        description: "The server may be temporarily offline for updates.",
      },
      {
        icon: Zap,
        title: "Power outage",
        description: "The machine hosting this site may have lost power.",
      },
      {
        icon: WifiOff,
        title: "ISP / connection issue",
        description: "The home internet connection it relies on may be down.",
      },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-gray-200">
        <div className="w-full max-w-md animate-[fadeUp_0.4s_ease-out] space-y-6 text-center">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
            <Server className="h-10 w-10 text-white" />
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 ring-4 ring-white dark:ring-gray-900">
              <span className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Server is currently offline
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This is a self-hosted project running on a personal server rather
              than commercial cloud infrastructure, so it can go offline from
              time to time. Likely reasons:
            </p>
          </div>

          <div className="space-y-3 text-left">
            {reasons.map(({ icon: ReasonIcon, title, description }, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 rounded-lg border border-amber-100 bg-amber-50/60 p-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex-shrink-0 rounded-md bg-amber-100 p-2 dark:bg-gray-700">
                  <ReasonIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
            />
            <span>{isRetrying ? "Checking again..." : "Try again"}</span>
          </button>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Thanks for your patience — it should be back up shortly.
          </p>
        </div>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // ---- Data/DB error state (server itself is fine) ----
  if (dataError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 p-6 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-gray-200">
        <div className="w-full max-w-md animate-[fadeUp_0.4s_ease-out] space-y-6 text-center">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 shadow-lg">
            <Database className="h-10 w-10 text-white" />
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 ring-4 ring-white dark:ring-gray-900">
              <AlertTriangle className="h-3.5 w-3.5 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Trouble loading data
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Good news — the server itself is up and responding. The issue is
              with loading property data, likely a database hiccup on the
              backend. This should resolve itself shortly.
            </p>
          </div>

          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
            />
            <span>{isRetrying ? "Checking again..." : "Try again"}</span>
          </button>
        </div>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // ---- Normal loading state ----
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-20 top-20 h-32 w-32 animate-pulse rounded-full bg-blue-200"></div>
        <div className="absolute right-32 top-40 h-24 w-24 animate-pulse rounded-full bg-indigo-200 [animation-delay:1s]"></div>
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-purple-200 [animation-delay:0.5s]"></div>
      </div>

      <div className="w-full max-w-md space-y-8 p-8 text-center">
        {/* Main Logo/Icon */}
        <div className="relative">
          <div
            className={`transition-all duration-700 ${isComplete ? "scale-110" : "scale-100"}`}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-primary/50 to-primary/90 shadow-lg">
              <Home className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Single soft pulse ring — quieter than two overlapping pings */}
          {!isComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 animate-ping rounded-full border-2 border-primary/30 [animation-duration:2s]"></div>
            </div>
          )}
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-primary/70 to-primary bg-clip-text text-3xl font-bold text-transparent">
            GhorKhojee
          </h1>
          <p className="font-medium text-gray-600 dark:text-gray-300">
            Your Dream Home Awaits
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {Math.round(Math.min(progress, 100))}% Complete
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep && !isComplete;
            const isPassed = index < currentStep || isComplete;

            return (
              <div
                key={index}
                className={`flex items-center space-x-3 rounded-lg p-3 transition-all duration-500 ${
                  isActive
                    ? "scale-[1.02] transform bg-blue-50 text-blue-700 dark:bg-gray-600 dark:text-blue-500"
                    : isPassed
                      ? "bg-green-50 text-green-700 dark:bg-green-800 dark:text-green-400"
                      : "text-gray-400"
                }`}
              >
                <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                  {isActive && (
                    <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400/40 [animation-duration:1.4s]"></span>
                  )}
                  <StepIcon
                    className={`relative h-5 w-5 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : ""
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">{step.text}</span>
                {isPassed && (
                  <div className="ml-auto animate-[popIn_0.3s_ease-out]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Animation */}
        {isComplete && (
          <div className="animate-[fadeUp_0.4s_ease-out]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
              <Check className="h-8 w-8 text-white" strokeWidth={3} />
            </div>
            <p className="mt-4 font-semibold text-green-600">
              Ready to explore properties!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.6);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
