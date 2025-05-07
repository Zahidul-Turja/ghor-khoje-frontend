import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function ImageGallery({ images, onOpen }) {
  // Return early if there are no images
  if (!images || images.length === 0) {
    return (
      <div className="mx-auto grid h-64 grid-cols-1 gap-3 overflow-hidden rounded-2xl bg-gray-100">
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
        <div className="col-span-4">
          <Image
            src={BASE_URL + images[0].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      );
    }

    // If there are 2 images, display them side by side
    if (images.length === 2) {
      return (
        <>
          <div className="col-span-2">
            <Image
              src={BASE_URL + images[0].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="col-span-2">
            <Image
              src={BASE_URL + images[1].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </>
      );
    }

    // If there are 3 images
    if (images.length === 3) {
      return (
        <>
          <div className="col-span-2 row-span-2">
            <Image
              src={BASE_URL + images[0].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="col-span-2">
            <Image
              src={BASE_URL + images[1].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="col-span-2">
            <Image
              src={BASE_URL + images[2].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </>
      );
    }

    // If there are 4 or more images
    return (
      <>
        {/* First Column: Single Image with half the width and full height */}
        <div className="col-span-2 row-span-2">
          <Image
            src={BASE_URL + images[0].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full rounded-l-2xl object-cover"
          />
        </div>

        {/* Second Column: Two Images */}
        <div className="col-span-1">
          <Image
            src={BASE_URL + images[1].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1">
          <Image
            src={BASE_URL + images[2].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full rounded-tr-2xl object-cover"
          />
        </div>

        {/* Third Column: One Image, potentially with overlay */}
        <div className="relative col-span-1">
          <Image
            src={BASE_URL + images[3].image}
            alt="Property image"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <button onClick={onOpen} className="relative col-span-1 cursor-pointer">
          {images.length > 4 && (
            <>
              <Image
                src={BASE_URL + images[4].image}
                alt="Property image"
                width={1000}
                height={1000}
                className="h-full w-full rounded-br-2xl object-cover"
              />
              {images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center rounded-br-2xl bg-black bg-opacity-50">
                  <span className="text-xl font-semibold text-white">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </>
          )}
          {images.length === 4 && (
            <Image
              src={BASE_URL + images[3].image}
              alt="Property image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-br-2xl object-cover"
            />
          )}
        </button>
      </>
    );
  };

  return (
    <div className="mx-auto grid grid-cols-4 gap-3 overflow-hidden rounded-2xl">
      {renderImages()}
    </div>
  );
}

export default ImageGallery;
