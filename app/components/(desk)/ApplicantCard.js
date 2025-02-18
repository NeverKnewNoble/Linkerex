"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const ApplicantCard = ({
  appliedId,
  name,
  email,
  jobCategory,
  jobTitle, 
  className = "",
}) => {

  const router = useRouter(); // Use Next.js router


  return (
    <div
      className={`bg-white border text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between p-4 ${className}`}
    >
      {/* Image Section */}
      <div className="flex items-center gap-4">
        <Image
          src={"/linkerex/user1.png"} 
          alt={`${name}'s Avatar`}
          width={80}
          height={80}
          className="w-[80px] h-[80px] rounded-full border-4 border-white shadow-md object-cover overflow-hidden"
        />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-700 text-sm">Student</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Job Title */}
        <div className="flex items-center gap-2">
          <Icon icon="mdi:briefcase-outline" className="text-xl text-gray-600" />
          <p className="text-gray-700 font-medium">{jobTitle}</p>
        </div>

        {/* Job Category */}
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:tag-outline"
            className="text-xl text-gray-600"
          />
          <p className="text-gray-700">{jobCategory}</p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Icon icon="mdi:email-outline" className="text-xl text-gray-600" />
          <p className="text-gray-700">{email}</p>
        </div>
      </div>

      {/* Spacer to push the button to the bottom */}
      <div className="flex-grow"></div>

      {/* View Button */}
      <button
        onClick={() => router.push(`/desk/applicants/application_details?id=${appliedId}`)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4"
      >
        View
      </button>
    </div>
  );
};

export default ApplicantCard;
