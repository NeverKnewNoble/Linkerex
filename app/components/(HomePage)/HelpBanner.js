import React from "react";
import BlogCard from "../(elements)/BlogCard";

const HelpBanner = () => {
  return (
    <div className="relative bg-[#2f71c7] bg-center bg-no-repeat w-full h-auto py-10 text-white pb-20">
      {/* Header Section */}
      <div className="flex justify-center text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
          Help Advance Your Career
        </h1>
      </div>

      {/* Blog Cards Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <BlogCard
          imageSrc="/linkerex/monitorlooks.jpg"
          date="Mar 16, 2020"
          author="Michael Foster"
          title="Get That Internship You Have Been Searching For"
        />
        <BlogCard
          imageSrc="/linkerex/sitting.jpg"
          date="Mar 10, 2020"
          author="Lindsay Walton"
          title="Collaborate with Companies on projects"
        />
        <BlogCard
          imageSrc="/linkerex/thinking.jpg"
          date="Feb 12, 2020"
          author="Tom Cook"
          title="Improve your career experience"
        />
      </div>
    </div>
  );
};

export default HelpBanner;
