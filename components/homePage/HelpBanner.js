"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BlogCard from "@/components/homePage/content/BlogCard";
import { TrendingUp, Briefcase, Award } from "lucide-react";

const HelpBanner = () => {
  // Ref to track visibility for animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Blog/feature cards data with online images
  const blogCards = [
    {
      imageSrc: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
      title: "Get That Internship You Have Been Searching For",
      icon: Briefcase,
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      title: "Collaborate with Companies on projects",
      icon: TrendingUp,
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      title: "Improve your career experience",
      icon: Award,
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="relative bg-gradient-to-b from-background to-card w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Help Advance Your Career
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            Discover opportunities that match your skills and aspirations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {blogCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <BlogCard
                  imageSrc={card.imageSrc}
                  title={card.title}
                  icon={Icon}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HelpBanner;
