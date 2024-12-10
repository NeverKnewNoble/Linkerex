"use client";

import {
  Button,
} from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative bg-center bg-cover bg-no-repeat w-full h-[650px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/linkerex/bgkate.jpg')",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 max-w-6xl  z-10">
        {/* Text Section with Animation */}
        <motion.div
          className="text-center md:text-left text-white"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-[80px] md:text-[100px] font-bold  leading-tight">
            We Link Opportunities <br />
            To You
          </h1>

          <Link href={"/jobs"}>
          <Button variant="faded"  className="ml-3 bg-[#2f71c7] text-white hover:bg-white hover:text-black font-bold border-none w-[200px]">
            Find A Job Now
          </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
