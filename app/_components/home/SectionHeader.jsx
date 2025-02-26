import Image from "next/image";
import Link from "next/link";

function SectionHeader() {
  return (
    <header>
      <nav className="flex items-center justify-between py-4">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-primary">
          Ghor Khoje
        </h1>
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className="border-b-2 border-gray-700 px-1 text-base font-bold tracking-wide"
          >
            Buy
          </Link>
          <Link href={"/"} className="px-1 text-base tracking-wide">
            Rent
          </Link>
          <Link href={"/"} className="px-1 text-base tracking-wide">
            Sell
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={"/"}
            className="rounded-lg border-2 border-primary px-5 py-1 text-lg font-semibold text-primary"
          >
            Login
          </Link>
          <Link
            href={"/"}
            className="rounded-lg border-2 border-primary bg-primary px-5 py-1 text-lg text-white"
          >
            Sign up
          </Link>
        </div>
      </nav>
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
