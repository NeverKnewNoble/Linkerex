import React from "react";
import { FaFacebook, FaTwitter, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white font-bold text-lg">Linkerex</span>
            </div>
            <p className="text-sm">
              We Provide the opportunities to improve your career.
            </p>
            {/* <div className="flex space-x-4 mt-4">
              <FaFacebook className="hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
              <FaGithub className="hover:text-gray-300 cursor-pointer" />
              <FaYoutube className="hover:text-red-500 cursor-pointer" />
            </div> */}
          </div>




          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contents</h4>
            <ul className="space-y-2 text-sm">
              <li> <Link href={"/#home"}>Home</Link> </li>
              <li> <Link href={"/jobs"}>Jobs</Link> </li>
              <li> <Link href={"/#about"}>About</Link> </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © 2024 Linkerex, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
