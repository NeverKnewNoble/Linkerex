import React from "react";
import ButtonComp from "./ButtonComp";

const JobCard = ({ title, amount, description, postedDate, type, company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Content Section */}
      <div className="p-6">
        {/* Opportunity Type */}
        <p
          className={`text-sm font-bold mb-2 uppercase ${
            type === "Internship"
              ? "text-purple-600"
              : type === "Part-Time"
              ? "text-green-600"
              : "text-blue-600"
          }`}
        >
          {type}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Company Name */}
        <p className="text-sm text-gray-600 mb-2">📍 {company}</p>

        {/* Amount Paid per Hour */}
        <p className="text-sm text-gray-600 mb-2">₵ {amount} per hour</p>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4">{description}</p>

        {/* Posted Date */}
        <p className="text-xs text-gray-500 mb-4">Posted on: {postedDate}</p>

        {/* Apply Now Button */}
        <ButtonComp
          label="Apply Now"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
          textColor="text-white"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default JobCard;
