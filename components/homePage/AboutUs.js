"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Rocket, Award } from "lucide-react";

const AboutUs = () => {
  // Features/icons for the about section
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Connecting students with their dream opportunities",
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Supporting students and companies alike",
    },
    {
      icon: Rocket,
      title: "Career Launchpad",
      description: "Your gateway to professional growth",
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Reliable connections you can count on",
    },
  ];

  return (
    <motion.div
      id="about"
      className="relative w-full bg-gradient-to-b from-background via-card to-background py-16 sm:py-20 lg:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Us
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted leading-relaxed text-center mb-12 lg:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
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

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon
                        size={32}
                        className="text-primary group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
