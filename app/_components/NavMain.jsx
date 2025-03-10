import Link from "next/link";

function NavMain() {
  return (
    <nav className="flex items-center justify-between px-16 py-4">
      <Link
        href={"/"}
        className="text-3xl font-extrabold uppercase tracking-widest text-primary"
      >
        Ghor Khoje
      </Link>
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
  );
}

export default NavMain;
