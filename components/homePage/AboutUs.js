"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      id="about"
      className="h-auto w-full flex flex-col items-center justify-center bg-[#18181b] px-4 sm:px-6 py-12 sm:py-20 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Title Animation */}
      <motion.h1
        className="text-[36px] sm:text-[50px] md:text-[100px] font-bold mb-4 sm:mb-6 text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        About Us
      </motion.h1>

      {/* Paragraph Animation */}
      <motion.p
        className="text-base sm:text-lg md:text-xl text-white max-w-4xl leading-relaxed px-4 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        At Linkerex, we understand the challenges university students face in finding the
        right opportunities to kickstart their careers. The struggle to secure internships,
        part-time jobs, or full-time positions often feels overwhelming, with limited resources
        and guidance to bridge the gap between education and the professional world. Realizing
        this difficulty, we created Linkerex – a platform dedicated to connecting ambitious
        students with companies and organizations eager to discover fresh talent. Whether
        you're searching for a stepping stone to build your experience or a launchpad for your
        career, Linkerex provides the links you need to explore opportunities, grow your
        network, and achieve your goals.
      </motion.p>

      {/* Decorative Line Animation */}
      <motion.div
        className="w-24 sm:w-32 h-1 bg-white mt-6 sm:mt-8"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.2, duration: 1 }}
      />
    </motion.div>
  );
};

export default AboutUs;