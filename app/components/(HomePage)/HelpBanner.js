"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BlogCard from "../(elements)/BlogCard";

const HelpBanner = () => {
  // Ref to track visibility
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Triggers animation when 50px into viewport

  return (
    <motion.div
      ref={ref}
      className="relative bg-white bg-center bg-no-repeat w-full h-auto py-10 text-[#18181b] pb-[100px] pt-[100px]"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Header Section */}
      <div className="flex justify-center text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
          Help Advance Your Career
        </h1>
      </div>

      <div className="flex justify-center align-center">
      {/* Blog Cards Section */}
      <motion.div
        className="container  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 "
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <BlogCard
          imageSrc="/linkerex/monitorlooks.jpg"
          title="Get That Internship You Have Been Searching For"
        />
        <BlogCard
          imageSrc="/linkerex/sitting.jpg"
          title="Collaborate with Companies on projects"
        />
        <BlogCard
          imageSrc="/linkerex/thinking.jpg"
          title="Improve your career experience"
        />
      </motion.div>
      </div>

    </motion.div>
  );
};

export default HelpBanner;
