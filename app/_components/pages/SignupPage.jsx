"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_store/authStore";
import { FaChevronLeft } from "react-icons/fa";
import OTPVerificationModal from "@/app/_components/OTPVerificationModal"; // Import the OTP modal

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signup = useAuthStore((state) => state.signup);
  const otpModalOpen = useAuthStore((state) => state.otpModalOpen);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError("Please fill in all fields");
      return false;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError("");

      // Using the Zustand signup function
      await signup({
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      // The OTP modal will show automatically based on otpModalOpen state
      // No need to redirect yet - this will happen after OTP verification
    } catch (err) {
      // Error handling is already managed by the Zustand store with toast notifications
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md space-y-8 rounded-lg border border-gray-200 px-10 py-12 shadow-md dark:border-gray-700">
        <div>
          <a
            href="/"
            className="absolute left-6 top-6 rounded-full border border-gray-200 p-3"
          >
            <FaChevronLeft />
          </a>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
            Create your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary/90 hover:text-primary/80 dark:text-primary"
            >
              Log in
            </Link>
          </p>
        </div>

        {error && (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary/90 focus:outline-none focus:ring-primary/90 dark:bg-gray-900 dark:text-gray-200 sm:text-sm"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary/90 focus:outline-none focus:ring-primary/90 dark:bg-gray-900 dark:text-gray-200 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary/90 focus:outline-none focus:ring-primary/90 dark:bg-gray-900 dark:text-gray-200 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary/90 focus:outline-none focus:ring-primary/90 dark:bg-gray-900 dark:text-gray-200 sm:text-sm"
                placeholder="Confirm password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/90 focus:ring-offset-2"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-primary/90 hover:text-primary/80"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary/90 hover:text-primary/80"
            >
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>

      {/* OTP Verification Modal */}
      <OTPVerificationModal email={formData.email} />
    </div>
  );
}

export default SignupPage;
