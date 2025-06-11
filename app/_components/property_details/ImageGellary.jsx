import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function ImageGallery({ images, onOpen }) {
  // Return early if there are no images
  if (!images || images.length === 0) {
    return (
      <div className="mx-auto grid h-48 grid-cols-1 gap-3 overflow-hidden rounded-xl bg-gray-100 sm:h-64 sm:rounded-2xl">
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  // Function to render the appropriate number of images
  const renderImages = () => {
    // If there's only 1 image, display it full width
    if (images.length === 1) {
      return (
        <div className="col-span-1 sm:col-span-4">
          <Image
            src={images[0].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
            onClick={onOpen}
          />
        </div>
      );
    }

    // If there are 2 images, display them side by side on desktop, stacked on mobile
    if (images.length === 2) {
      return (
        <>
          <div className="col-span-1 sm:col-span-2">
            <Image
              src={images[0].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
              onClick={onOpen}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Image
              src={images[1].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
              onClick={onOpen}
            />
          </div>
        </>
      );
    }

    // If there are 3 images
    if (images.length === 3) {
      return (
        <>
          <div className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2">
            <Image
              src={images[0].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
              onClick={onOpen}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Image
              src={images[1].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
              onClick={onOpen}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Image
              src={images[2].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
              onClick={onOpen}
            />
          </div>
        </>
      );
    }

    // If there are 4 or more images
    return (
      <>
        {/* First Column: Single Image with half the width and full height on desktop */}
        <div className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2">
          <Image
            src={images[0].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full rounded-xl object-cover sm:rounded-l-2xl"
            onClick={onOpen}
          />
        </div>

        {/* Second Column: Two Images - hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:col-span-1 sm:block">
          <button
            onClick={onOpen}
            className="relative hidden cursor-pointer sm:col-span-1 sm:block"
          >
            <Image
              src={images[1].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </button>
        </div>
        <div className="hidden sm:col-span-1 sm:block">
          <button
            onClick={onOpen}
            className="relative hidden cursor-pointer sm:col-span-1 sm:block"
          >
            <Image
              src={images[2].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-tr-2xl object-cover"
            />
          </button>
        </div>

        {/* Third Column: One Image, potentially with overlay - hidden on mobile */}
        <div className="relative hidden sm:col-span-1 sm:block">
          <button
            onClick={onOpen}
            className="relative hidden cursor-pointer sm:col-span-1 sm:block"
          >
            <Image
              src={images[3].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </button>
        </div>
        <button
          onClick={onOpen}
          className="relative hidden cursor-pointer sm:col-span-1 sm:block"
        >
          {images.length > 4 && (
            <>
              <Image
                src={images[4].image}
                alt="Property image"
                width={1000}
                height={1000}
                className="h-full w-full rounded-br-2xl object-cover"
              />
              {images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center rounded-br-2xl bg-black bg-opacity-50">
                  <span className="text-lg font-semibold text-white sm:text-xl">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </>
          )}
          {images.length === 4 && (
            <Image
              src={images[3].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-br-2xl object-cover"
            />
          )}
        </button>

        {/* Mobile: Show view all button */}
        {images.length > 1 && (
          <button
            onClick={onOpen}
            className="col-span-1 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 sm:hidden"
          >
            <span className="text-sm font-semibold">
              View All ({images.length})
            </span>
          </button>
        )}
      </>
    );
  };

  return (
    <div className="mx-auto grid h-48 grid-cols-1 gap-2 overflow-hidden rounded-xl sm:h-auto sm:grid-cols-4 sm:gap-3 sm:rounded-2xl">
      {renderImages()}
    </div>
  );
}

export default ImageGallery;
