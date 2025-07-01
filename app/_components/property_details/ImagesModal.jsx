import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function ImagesModal({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleOverlayClick = (e) => {
    // Only close if the click is directly on the overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleOverlayClick}
    >
      <div className="flex max-h-screen w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="flex justify-between border-b p-4 dark:border-gray-700">
          <h3 className="text-lg font-medium">
            Image {currentIndex + 1} of {images.length}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative flex flex-grow flex-col overflow-hidden md:flex-row">
          {/* Image */}
          <div className="relative flex h-96 w-full flex-grow items-center justify-center bg-gray-100 p-2 dark:bg-gray-800">
            <img
              src={`${currentImage.image || "/api/placeholder/400/400"}`}
              alt={`Room view ${currentIndex + 1}`}
              className="max-h-96 max-w-full object-cover"
            />

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 rounded-full bg-white bg-opacity-70 p-1 shadow-md hover:bg-opacity-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 rounded-full bg-white bg-opacity-70 p-1 shadow-md hover:bg-opacity-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Description */}
          <div className="w-full border-t bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:w-96 md:border-l md:border-t-0">
            <h4 className="mb-2 font-medium">Description</h4>
            <p className="text-sm text-gray-600">{currentImage.description}</p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="overflow-x-auto border-t p-2 dark:border-gray-700">
          <div className="flex space-x-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-16 w-16 flex-shrink-0 rounded border-2 ${
                  idx === currentIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={`${img.image || "/api/placeholder/400/400"}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full rounded object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesModal;
