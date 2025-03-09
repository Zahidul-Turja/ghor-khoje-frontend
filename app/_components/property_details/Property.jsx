import Image from "next/image";

function Property() {
  return (
    <div className="mx-auto my-10 max-w-screen-2xl">
      <div className="mx-auto grid grid-cols-4 gap-4">
        {/* First Column: Single Image with half the width and full height */}
        <div className="col-span-2 h-full grid-rows-2">
          <Image
            src="/house-1.jpg"
            width={1000}
            height={800} // Adjust height for full height if needed
            className="h-full object-cover"
          />
        </div>

        {/* Second Column: Two Images */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="w-full">
            <Image
              src="/house-1.jpg"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <Image
              src="/house-1.jpg"
              width={1000}
              height={600}
              className="object-cover"
            />
          </div>
        </div>

        {/* Third Column: Two Images */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="w-full">
            <Image
              src="/house-1.jpg"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <Image
              src="/house-1.jpg"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
