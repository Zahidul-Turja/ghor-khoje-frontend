"use client";

import { useState, useEffect, useRef } from "react";
import useAuthStore from "@/app/_store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OTPVerificationModal({ email }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const otpModalOpen = useAuthStore((state) => state.otpModalOpen);
  //   const otpModalOpen = true;
  const user = useAuthStore((state) => state.user);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const resendOtp = useAuthStore((state) => state.resendOtp);
  const closeOtpModal = useAuthStore((state) => state.closeOtpModal);

  const router = useRouter();

  useEffect(() => {
    // Start countdown for resend OTP when modal opens
    if (otpModalOpen && resendCountdown === 0) {
      setResendCountdown(60);
    }
  }, [otpModalOpen]);

  useEffect(() => {
    // Countdown timer for resend OTP
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    // Focus the first input when modal opens
    if (otpModalOpen && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [otpModalOpen]);

  if (!otpModalOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // If pasting multiple digits
      const digits = value.split("").slice(0, 4);
      const newOtp = [...otp];

      digits.forEach((digit, i) => {
        if (index + i < 4) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      // Focus on the appropriate input
      const nextIndex = Math.min(index + digits.length, 3);
      if (nextIndex < 4) {
        inputRefs[nextIndex].current.focus();
      }
    } else {
      // Single digit entered
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(user.email);
      setResendCountdown(60);
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    console.log("OTP Value:", otpValue);

    if (otpValue.length !== 4) {
      // toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      console.log("Verifying OTP...", user);
      setIsLoading(true);
      await verifyOtp(email, otpValue);
      // toast.success("OTP verified successfully");
      router.push("/auth/login");
      // verifyOtp function should handle success notifications and routing
    } catch (error) {
      // Error handling is managed by the store
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          We've sent a 4-digit code to {user?.email}. Enter the code below to
          verify your account.
        </p>

        <div className="mb-6 flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={4}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-14 rounded-md border border-gray-300 text-center text-2xl font-bold focus:border-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/90"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join("").length !== 4}
          className="mb-4 w-full rounded-md bg-primary py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/90 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            {resendCountdown > 0 ? (
              <span className="font-medium text-gray-500">
                Resend in {resendCountdown}s
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                className="font-medium text-primary/90 hover:text-primary/80"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
