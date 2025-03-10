import Image from "next/image";

function ImageGellary() {
  return (
    <div className="mx-auto grid grid-cols-4 gap-3 overflow-hidden rounded-2xl">
      {/* First Column: Single Image with half the width and full height */}
      <div className="col-span-2 h-full grid-rows-2">
        <Image
          src="/detail-1.jpg"
          width={1000}
          height={1000} // Adjust height for full height if needed
          className="h-full object-cover"
        />
      </div>

      {/* Second Column: Two Images */}
      <div className="col-span-1 flex h-full flex-col gap-3">
        <div className="h-full w-full">
          <Image
            src="/detail-2.jpg"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
        <div className="h-full w-full">
          <Image
            src="/detail-3.jpg"
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
            src="/detail-4.jpg"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
        <div className="h-full w-full">
          <Image
            src="/detail-5.jpg"
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
