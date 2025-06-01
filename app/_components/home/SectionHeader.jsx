import Image from "next/image";
import Link from "next/link";

function SectionHeader() {
  return (
    <header className="px-3 py-4 lg:px-24">
      <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
        {/* Image Section */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 md:h-96 lg:h-[35rem] lg:w-[45%] xl:h-[40rem] xl:w-[40.5%]">
          <Image
            src={"/hero-main.png"}
            alt="Hero"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>

        {/* Content Section */}
        <div className="w-full text-center lg:w-[50%] lg:text-left">
          <h1 className="mb-4 text-2xl font-semibold capitalize leading-tight sm:text-3xl md:text-4xl lg:mb-2 lg:text-5xl xl:text-6xl">
            Discover your perfect home and find your{" "}
            <span className="font-bold uppercase text-primary">Sanctuary</span>{" "}
            here
          </h1>
          <p className="mb-6 text-base tracking-wide sm:text-lg lg:mb-8">
            Experience home like never before. Rent your ideal home now.
          </p>
          <Link
            href={"/"}
            className="inline-block rounded-full bg-primary px-6 py-2.5 text-lg font-semibold text-white transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-xl lg:text-2xl"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SectionHeader;
