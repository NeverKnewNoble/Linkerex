import React from "react";

const CatCards = ({ acronym, title, jobs, color }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm">
      {/* Acronym Section */}
      <div
        className={`flex items-center justify-center w-16 h-16 ${color} text-white font-bold text-lg`}
      >
        {acronym}
      </div>

      {/* Details Section */}
      <div className="flex-1 px-4 py-2">
        <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
        <div className="flex gap-2">
          <p className="text-gray-600 text-xs">{jobs} Jobs</p>
          <p className="text-gray-600 text-xs">{jobs} Internships</p>
        </div>
      </div>

      {/* Dots Icon */}
      <div className="flex items-center justify-center px-4">
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CatCards;
