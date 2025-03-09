import Image from "next/image";
import Link from "next/link";

function SectionHeader() {
  return (
    <header>
      <div className="flex w-full items-center justify-between">
        <div className="relative h-[40rem] w-[40.5vw] overflow-hidden py-2">
          <Image
            src={"/hero-main.png"}
            alt="Hero"
            width={1000}
            height={1000}
            className="object-cover"
          />
        </div>
        <div className="w-[50%]">
          <h1 className="mb-2 text-5xl font-semibold capitalize leading-tight">
            Discover your perfect home and find your{" "}
            <span className="font-bold uppercase text-primary">Sanctuary</span>{" "}
            here
          </h1>
          <p className="mb-8 text-lg tracking-wide">
            Experience home like never before. Rent your ideal home now.
          </p>
          <Link
            href={"/"}
            className="mt-4 inline-block rounded-full bg-primary px-8 py-3 text-2xl font-semibold text-white"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SectionHeader;
