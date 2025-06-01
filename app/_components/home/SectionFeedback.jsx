"use client";

import React, { useState, useEffect } from "react";

const SectionFeedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    want_to_be_contacted: false,
    feedback_type: "",
  });

  const [feedbackTypes, setFeedbackTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch feedback types on component mount
  useEffect(() => {
    const fetchFeedbackTypes = async () => {
      try {
        // Simulating API call with fallback data
        setFeedbackTypes([
          { id: 1, name: "Feature Request" },
          { id: 2, name: "Bug Report" },
          { id: 3, name: "General Feedback" },
          { id: 4, name: "Support" },
        ]);
      } catch (error) {
        console.error("Error fetching feedback types:", error);
      }
    };

    fetchFeedbackTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.message || !formData.feedback_type) {
      alert(
        "Please fill in all required fields (name, message and topic) before submitting your feedback.",
      );
      return;
    }

    setIsLoading(true);

    try {
      if (formData.want_to_be_contacted && !formData.email) {
        alert("You've selected to be contacted but didn't provide an email.");
        setIsLoading(false);
        return;
      }

      const requestBody = {
        email: formData.email,
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
        want_to_be_contacted: formData.want_to_be_contacted,
        feedback_type: parseInt(formData.feedback_type),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        want_to_be_contacted: false,
        feedback_type: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-white px-4 py-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-black sm:text-2xl">
              Thank you for your feedback!
            </h2>
            <p className="mb-6 text-sm text-gray-600 sm:text-base">
              We've received your message and will get back to you soon.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="rounded-lg bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Content */}
          <div className="order-2 flex flex-col justify-between space-y-6 py-0 sm:space-y-8 lg:order-1 lg:py-12">
            <div>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
                Your Feedback helps us improve
              </h2>

              {/* Additional content below the main text */}
              <div className="text-sm text-gray-600 sm:text-base">
                <p className="mb-4 text-gray-600">
                  We are here to help you and we'd love to connect with you.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  <div className="group flex items-center space-x-3 sm:space-x-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-800 sm:text-base">
                        Lightning fast responses
                      </span>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        Usually within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center space-x-3 sm:space-x-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-800 sm:text-base">
                        Trusted by thousands
                      </span>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        10,000+ happy users worldwide
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center space-x-3 sm:space-x-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-800 sm:text-base">
                        Privacy first
                      </span>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        Your data is secure with us
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contribute to Open Source */}
            <div className="mt-8 rounded-2xl border border-gray-300 bg-gray-100 px-4 py-4 shadow-lg sm:px-7 sm:py-6 lg:mt-12">
              <h3 className="text-base font-bold text-gray-800 sm:text-lg">
                Contribute to Our Project
              </h3>
              <p className="my-2 text-xs text-gray-600 sm:text-sm">
                We are an open-source project and your contributions are
                welcome. Please check out our GitHub repositories to see if
                you're interested in contributing.
              </p>
              <a
                href="https://github.com/Zahidul-Turja/ghor-khoje-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:mt-4 sm:px-4"
                title="View on GitHub"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="order-1 rounded-2xl p-4 sm:p-8 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              {/* Topic */}
              <div>
                <label
                  htmlFor="feedback_type"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Topic
                </label>
                <select
                  id="feedback_type"
                  name="feedback_type"
                  value={formData.feedback_type}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-gray-400 sm:text-base"
                >
                  <option value="">Select a topic</option>
                  {feedbackTypes?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-gray-400 sm:text-base"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-gray-400 sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-gray-400 sm:text-base"
                  placeholder="Brief subject of your feedback"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="resize-vertical w-full rounded-2xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-gray-400 sm:text-base"
                  placeholder="Tell us more about your feedback..."
                />
              </div>

              {/* Want to be contacted */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="want_to_be_contacted"
                  name="want_to_be_contacted"
                  checked={formData.want_to_be_contacted}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 bg-gray-100 text-gray-500 focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:ring-offset-2"
                />
                <label
                  htmlFor="want_to_be_contacted"
                  className="cursor-pointer text-xs text-gray-700 sm:text-sm"
                >
                  I would like to be contacted regarding this feedback
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gray-950 focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
              >
                {isLoading ? "Sending..." : "Send Feedback"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFeedback;
