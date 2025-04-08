import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function ImageGellary({ images }) {
  return (
    <div className="mx-auto grid grid-cols-4 gap-3 overflow-hidden rounded-2xl">
      {/* First Column: Single Image with half the width and full height */}
      <div className="col-span-2 h-full grid-rows-2">
        <Image
          src={BASE_URL + images[0].image}
          alt="display"
          width={1000}
          height={1000} // Adjust height for full height if needed
          className="h-full object-cover"
        />
      </div>

      {/* Second Column: Two Images */}
      <div className="col-span-1 flex h-full flex-col gap-3">
        <div className="h-full w-full">
          <Image
            src={BASE_URL + images[1].image}
            alt="display"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
        <div className="h-full w-full">
          <Image
            src={BASE_URL + images[2].image}
            alt="display"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
      </div>

      {/* Third Column: Two Images */}
      <div className="col-span-1 flex flex-col gap-3">
        <div className="h-full w-full">
          <Image
            src={BASE_URL + images[3].image}
            alt="display"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
        <div className="h-full w-full">
          <Image
            src={BASE_URL + images[4].image}
            alt="display"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageGellary;
