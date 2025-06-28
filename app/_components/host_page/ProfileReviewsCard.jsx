import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

import { toast } from "react-hot-toast";
import { reviewUser } from "@/app/_lib/reviewCalls";

function ProfileReviewsCard({ host }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    overall: 0,
    cleanliness: 0,
    communication: 0,
    financial_transparency: 0,
    maintenance: 0,
    privacy: 0,
    review_text: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUserLoggedIn(true);
    }
  });
  // Function to render horizontal progress bar
  const renderProgressBar = (rating) => {
    const percentage = (rating / 5) * 100;

    return (
      <div className="flex w-full items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Performance metrics configuration
  const performanceMetrics = [
    {
      label: "Average Rating",
      rating: host?.average_rating || 0,
      key: "average",
    },
    {
      label: "Cleanliness",
      rating: host?.cleanliness_rating || 0,
      key: "cleanliness",
    },
    {
      label: "Communication",
      rating: host?.communication_rating || 0,
      key: "communication",
    },
    {
      label: "Financial Transparency",
      rating: host?.financial_transparency_rating || 0,
      key: "financial_transparency",
    },
    {
      label: "Maintenance",
      rating: host?.maintenance_rating || 0,
      key: "maintenance",
    },
    {
      label: "Privacy",
      rating: host?.privacy_rating || 0,
      key: "privacy",
    },
  ];

  // Review form fields configuration
  const reviewFields = [
    { label: "Overall", key: "overall" },
    { label: "Cleanliness", key: "cleanliness" },
    { label: "Communication", key: "communication" },
    { label: "Financial Transparency", key: "financial_transparency" },
    { label: "Maintenance", key: "maintenance" },
    { label: "Privacy", key: "privacy" },
  ];

  const handleRatingChange = (key, rating) => {
    setReviewData((prev) => ({
      ...prev,
      [key]: rating,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const res = await reviewUser(host?.id, reviewData);

    // Handle form submission here
    console.log("Review submitted:", reviewData);
    setIsModalOpen(false);
    // Reset form
    setReviewData({
      overall: 0,
      cleanliness: 0,
      communication: 0,
      financial_transparency: 0,
      maintenance: 0,
      privacy: 0,
      review_text: "",
    });
  };

  const renderRatingInput = (field) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleRatingChange(field.key, rating)}
            className="transition-colors hover:scale-110"
          >
            {reviewData[field.key] >= rating ? (
              <FaStar className="text-lg text-yellow-400" />
            ) : (
              <FaRegStar className="text-lg text-gray-300 hover:text-yellow-200" />
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-300 p-4">
        <h3 className="text-lg font-semibold">
          {host?.full_name}'s Performance Matrices
        </h3>
        <div className="px-4 pt-2">
          {performanceMetrics.map((metric, index) => (
            <div
              key={metric.key}
              className={`flex items-center justify-between px-2 py-3 ${
                index < performanceMetrics.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <div className="flex flex-1 flex-col">
                <p className="text-sm font-medium">{metric.label}</p>
                <div className="mt-2 flex items-center gap-2">
                  {renderProgressBar(metric.rating)}
                  <span className="min-w-[45px] text-xs text-gray-600">
                    {metric.rating.toFixed(1)}/5.0
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {metric.rating.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          if (!userLoggedIn) {
            return toast.error("You must be logged in to give a review.");
          }
          setIsModalOpen(true);
        }}
        className="my-5 flex items-center gap-2 transition-colors hover:text-red-600"
      >
        <MdFeedback className="text-sm" />
        <span className="text-xs font-bold underline">Give a Review</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white">
            <div className="p-6">
              {/* Modal Header */}
              <div className="mb-6 flex items-start justify-between">
                <h2 className="text-xl font-semibold">
                  Review {host?.full_name}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 transition-colors hover:text-gray-700"
                >
                  <IoClose size={24} />
                </button>
              </div>

              {/* Review Form */}
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating Fields */}
                {reviewFields.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center justify-between"
                  >
                    <label className="min-w-[140px] text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {renderRatingInput(field)}
                  </div>
                ))}

                {/* Review Text */}
                <div className="space-y-2 pt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Review
                  </label>
                  <textarea
                    value={reviewData.review_text}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        review_text: e.target.value,
                      }))
                    }
                    placeholder="Share your experience with this host..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileReviewsCard;
