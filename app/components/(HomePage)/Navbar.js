import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans text-black">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/linkerex/linknobgcrop.png"
            alt="Linkerex Logo"
            width={144}
            height={30}
            className="cursor-pointer"
          />
        </Link>

        {/* Static */}
        {/* Login Button */}
        <div className="flex items-center">
          <Link
            className="px-4 py-2 rounded focus:outline-none hover:underline underline-offset-1"
            href={"/#hero"}
          >
            HOME
          </Link>
          <Link
            href={"/jobs"}
            className="px-4 py-2 rounded focus:outline-none hover:underline underline-offset-1"
          >
            <span>JOBS</span>
          </Link>
          <button className="px-4 py-2 rounded font-semibold focus:outline-none hover:underline underline-offset-1">
            LOGIN
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
