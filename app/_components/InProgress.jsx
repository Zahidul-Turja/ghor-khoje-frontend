import { Clock, AlertCircle, Construction } from "lucide-react";

function InProgress() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="border-b border-gray-200 bg-gradient-to-r from-primary/80 to-primary/90 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Construction size={24} className="mr-3 text-white" />
            <h2 className="text-2xl font-bold text-white">
              Under Construction
            </h2>
          </div>
          <div className="flex items-center">
            <span className="flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
              <Clock size={14} className="mr-1" />
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div id="lottie-container" className="h-32 w-64">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"></div>
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-bold text-gray-800">
          We're Building Something Amazing!
        </h3>
        <p className="mt-2 max-w-md text-gray-600">
          Our new feature is currently under development. We're working hard to
          bring you a something amazing.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-primary/60 to-primary/70"></div>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-600">67% Complete</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex items-center rounded-lg bg-blue-50 p-3 text-blue-600">
            <AlertCircle size={18} className="mr-2" />
            <span className="text-sm font-medium">
              Expected Launch: Auguest, 2025
            </span>
          </div>

          <button
            disabled
            className="flex cursor-not-allowed items-center rounded-lg bg-primary/80 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-primary/90 disabled:opacity-70"
          >
            Get Notified
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Have questions? Contact{" "}
            <span className="font-medium text-indigo-600">
              zahidulturja@gmail.com
            </span>
          </p>
          <button className="rounded-md bg-white px-3 py-1 text-sm text-gray-600 shadow-sm hover:bg-gray-100">
            Help
          </button>
        </div>
      </div>
    </div>
  );
}

export default InProgress;
