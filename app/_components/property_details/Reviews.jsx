import React, { useState } from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoClose, IoAdd } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function Reviews({ reviews, avgRatings, onSubmitReview }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Average Ratings Section */}
      {avgRatings && (
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 shadow-lg">
          <div className="absolute right-4 top-4 text-purple-200">
            <HiSparkles size={24} />
          </div>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-primary/70 to-primary/90 p-2">
              <FaStar className="text-lg text-white" />
            </div>
            <h3 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
              Guest Reviews
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {Object.entries(avgRatings).map(([key, value]) => (
              <div key={key} className="group">
                <div className="flex items-center justify-between rounded-xl border border-white/40 bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-md">
                  <div>
                    <span className="block text-sm font-semibold capitalize text-gray-700">
                      {key.replace("_", " ")}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex text-xs">
                        {Array.from({ length: Math.floor(value) }).map(
                          (_, index) => (
                            <FaStar key={index} className="text-amber-400" />
                          ),
                        )}
                        {value % 1 !== 0 && (
                          <FaStar className="text-amber-400 opacity-50" />
                        )}
                        {Array.from({ length: 5 - Math.ceil(value) }).map(
                          (_, index) => (
                            <FaRegStar
                              key={index + Math.ceil(value)}
                              className="text-gray-300"
                            />
                          ),
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-800">
                        {value.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Review Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary/70 to-primary/90 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative flex items-center gap-2">
            <IoAdd size={20} />
            <span>Write a Review</span>
          </div>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {reviews?.map((review, index) => (
          <ReviewCard key={review.id} {...review} index={index} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onSubmitReview}
        />
      )}
    </div>
  );
}

export default Reviews;

function ReviewCard({
  reviewer,
  review_date,
  overall,
  review_text,
  reviewed_days_ago,
  index,
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-purple-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gray-100 transition-all duration-300 group-hover:ring-blue-200">
              {reviewer?.profile_image ? (
                <Image
                  src={BASE_URL + reviewer.profile_image}
                  alt="Reviewer Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <CgProfile className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-green-100 p-1">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
              {reviewer.full_name}
            </h3>
            <p className="text-xs text-gray-500">{reviewed_days_ago}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: overall }).map((_, index) => (
              <FaStar key={index} className="text-sm text-amber-400" />
            ))}
            {Array.from({ length: 5 - overall }).map((_, index) => (
              <FaRegStar
                key={index + overall}
                className="text-sm text-gray-300"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800">{overall}</span>
            <span className="text-xs text-gray-400">/ 5</span>
          </div>
        </div>

        {/* Review Text */}
        <div className="relative">
          <p className="line-clamp-4 text-sm leading-relaxed text-gray-700 transition-all duration-300 group-hover:line-clamp-none">
            {review_text}
          </p>
          <div className="absolute left-0 top-0 -ml-6 h-full w-1 rounded-full bg-gradient-to-b from-primary/50 to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    cleanliness: 5,
    description_match: 5,
    location_convenience: 5,
    value_for_money: 5,
    neighborhood: 5,
    review_text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState({});

  const handleRatingChange = (field, rating) => {
    setFormData((prev) => ({
      ...prev,
      [field]: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        cleanliness: 5,
        description_match: 5,
        location_convenience: 5,
        value_for_money: 5,
        neighborhood: 5,
        review_text: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-modal-in max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary/70 to-primary/90 p-6 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Share Your Experience</h2>
              <p className="mt-1 text-blue-100">
                Help others make informed decisions
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 transition-colors duration-200 hover:bg-white/30"
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-8">
              {/* Rating Fields */}
              {Object.entries({
                cleanliness: "Cleanliness",
                description_match: "Description Match",
                location_convenience: "Location Convenience",
                value_for_money: "Value for Money",
                neighborhood: "Neighborhood",
              }).map(([field, label]) => (
                <div key={field} className="group">
                  <label className="mb-3 block text-sm font-semibold text-gray-800">
                    {label}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(field, rating)}
                        onMouseEnter={() =>
                          setHoveredRating({
                            ...hoveredRating,
                            [field]: rating,
                          })
                        }
                        onMouseLeave={() =>
                          setHoveredRating({ ...hoveredRating, [field]: null })
                        }
                        className="text-3xl transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <FaStar
                          className={
                            rating <= (hoveredRating[field] || formData[field])
                              ? "text-amber-400 drop-shadow-sm"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-3 flex items-center text-sm font-medium text-gray-600">
                      {formData[field]} / 5
                    </span>
                  </div>
                </div>
              ))}

              {/* Review Text */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-800">
                  Tell us about your experience
                </label>
                <div className="relative">
                  <textarea
                    value={formData.review_text}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        review_text: e.target.value,
                      }))
                    }
                    placeholder="Share the highlights of your stay, what made it special, and any tips for future guests..."
                    rows={4}
                    className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 shadow-sm transition-all duration-200 focus:border-primary/70 focus:outline-none focus:ring-4 focus:ring-primary/10"
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {formData.review_text.length} characters
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4 border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary/70 to-primary/90 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  {isSubmitting ? "Publishing..." : "Publish Review"}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Custom animations */
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes modal-in {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  .animate-modal-in {
    animation: modal-in 0.3s ease-out;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-none {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
  }
`;
document.head.appendChild(style);
