"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative bg-center bg-cover bg-no-repeat w-full h-[500px] md:h-[650px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/linkerex/bgkate.jpg')",
      }}
    >
      {/* Overlay with Animation */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 px-4 md:px-6 max-w-6xl z-10">
        {/* Text Section with Animation */}
        <motion.div
          className="text-center md:text-left text-white"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Heading */}
          <h1 className="text-[40px] sm:text-[60px] md:text-[100px] font-bold leading-tight">
            We Link Opportunities <br className="hidden sm:block" /> To You
          </h1>

          {/* Button */}
          <div className="mt-6">
            <Link href={"/jobs"}>
              <button className="bg-blue-600 text-white px-6 py-2 font-bold rounded-full hover:border hover:bg-white hover:text-black transition-colors">
                Find A Job Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;