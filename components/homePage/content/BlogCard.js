"use client";

import { motion } from "framer-motion";

const BlogCard = ({ imageSrc, title, icon: Icon = null }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden border border-border bg-card group cursor-pointer h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10 pointer-events-none z-[1]" />
        
        {/* Icon Badge */}
        {Icon && (
          <div className="absolute top-4 right-4 p-3 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30 z-[2]">
            <Icon size={24} className="text-primary" />
          </div>
        )}
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300 drop-shadow-lg">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default BlogCard;
