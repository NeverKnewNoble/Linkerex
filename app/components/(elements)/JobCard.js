"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const JobCard = ({
  title,
  price,
  pricingType = "hour", // Default pricing type is "hourly"
  description,
  image,
  ratings,
  reviews,
  jobType, // Add jobType prop for job classification
  className = "", // Add a className prop for dynamic styling
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const getPricingLabel = () => {
    switch (pricingType) {
      case "hour":
        return "per hour";
      case "month":
        return "per month";
      case "project":
        return "per project";
      case "contract":
        return "per contract";
      default:
        return "per hour";
    }
  };

  const getJobTypeStyles = (type) => {
    switch (type) {
      case "Full Time":
        return "bg-purple-500 text-white";
      case "Part Time":
        return "bg-orange-500 text-white";
      case "Internship":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div
      className={`bg-[#1a1a1a] text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between ${className}`}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-blue-500"
          onClick={toggleFavorite}
        >
          <Icon
            icon={isFavorited ? "mdi:heart" : "mdi:heart-outline"}
            className={`text-xl ${isFavorited ? "text-blue-500" : "text-gray-400"}`}
          />
        </button>
        {/* Job Type Tag */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 rounded-md text-sm font-semibold ${getJobTypeStyles(
            jobType
          )}`}
        >
          {jobType}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Title */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-wrap">{title}</h3>
        </div>

        {/* Price Div */}
        <div>
          <p className="text-blue-500 font-bold">
            GH₵{price} / {getPricingLabel()}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4">{description}</p>

        {/* Ratings and Reviews */}
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                icon={index < ratings ? "mdi:star" : "mdi:star-outline"}
                className="text-lg"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{reviews} reviews</p>
        </div>

        {/* Spacer to push the button to the bottom */}
        <div className="flex-grow"></div>

        {/* Apply Button */}
        <Link href={'/jobs/applying_to_job'} >
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4">
            Apply For This Job
          </button>
        </Link>

      </div>
    </div>
  );
};

export default JobCard;
