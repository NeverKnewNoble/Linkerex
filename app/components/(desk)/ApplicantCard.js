"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const ApplicantCard = ({
  appliedId,
  name,
  email,
  status,
  jobCategory,
  jobTitle,
  className = "",
}) => {
  const router = useRouter();

  // Get status badge styling
  const getStatusBadge = (status) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Pending":
        bgColor = "bg-yellow-500/20";
        textColor = "text-yellow-300";
        break;
      case "Interview Scheduled":
        bgColor = "bg-blue-500/20";
        textColor = "text-blue-300";
        break;
      case "Accepted":
        bgColor = "bg-green-500/20";
        textColor = "text-green-300";
        break;
      case "Rejected":
        bgColor = "bg-red-500/20";
        textColor = "text-red-300";
        break;
      default:
        bgColor = "bg-gray-500/20";
        textColor = "text-gray-300";
    }

    return (
      <div className={`py-2 px-4 mt-4 rounded-lg text-sm font-semibold text-center shadow-md ${bgColor} ${textColor}`}>
        {status}
      </div>
    );
  };

  return (
    <div
      className={`relative bg-black text-white border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-6 flex flex-col justify-between ${className}`}
    >
      {/* Image Section */}
      <div className="flex items-center gap-4">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={"/linkerex/user1.png"}
            alt={`${name}'s Avatar`}
            width={80}
            height={80}
            className="rounded-full border-2 border-blue-500 shadow-md object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-400 text-sm">Student</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-5 flex flex-col gap-4">
        {/* Job Title */}
        <div className="flex items-center gap-3">
          <Icon icon="mdi:briefcase-outline" className="text-2xl text-blue-400" />
          <p className="text-gray-300 font-medium">{jobTitle}</p>
        </div>

        {/* Job Category */}
        <div className="flex items-center gap-3">
          <Icon icon="mdi:tag-outline" className="text-2xl text-blue-400" />
          <p className="text-gray-300">{jobCategory}</p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Icon icon="mdi:email-outline" className="text-2xl text-blue-400" />
          <p className="text-gray-300">{email}</p>
        </div>
      </div>

      {/* Status Badge */}
      {getStatusBadge(status)}

      {/* View Button */}
      <button
        onClick={() => router.push(`/desk/applicants/application_details?id=${appliedId}`)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-300 mt-5 shadow-md"
      >
        View Application
      </button>
    </div>
  );
};

export default ApplicantCard;
