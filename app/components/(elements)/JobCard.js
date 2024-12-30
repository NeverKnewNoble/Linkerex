// "use client";

// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import Link from "next/link";

// const JobCard = ({
//   title,
//   company,
//   location,
//   category,
//   price,
//   pricingType = "hour", 
//   description,
//   jobType, 
//   className = "", 
// }) => {
//   const [isFavorited, setIsFavorited] = useState(false);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   const getPricingLabel = () => {
//     switch (pricingType) {
//       case "hour":
//         return "per hour";
//       case "month":
//         return "per month";
//       default:
//         return "per hour";
//     }
//   };

//   const getJobTypeStyles = (type) => {
//     switch (type) {
//       case "Full Time":
//         return "bg-purple-500 text-white";
//       case "Part Time":
//         return "bg-red-500 text-white";
//       case "Internship":
//         return "bg-green-500 text-white";
//       default:
//         return "bg-gray-300 text-black";
//     }
//   };

//   return (
//     <div
//       className={`bg-[#1a1a1a] text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between ${className}`}
//     >
//       <div className="">
//         {/* Image Section */}
//         <div className="relative w-full h-20 overflow-hidden">
//           <button
//             className="absolute top-2 right-2 text-gray-400 hover:text-blue-500"
//             onClick={toggleFavorite}
//           >
//             <Icon
//               icon={isFavorited ? "mdi:heart" : "mdi:heart-outline"}
//               className={`text-xl ${isFavorited ? "text-blue-500" : "text-gray-400"}`}
//             />
//           </button>

//           {/* Job Type Tag */}
//           <div
//             className={`absolute top-2 left-2 px-2 py-1 rounded-md max-w-72 w-[300px] text-sm font-semibold ${getJobTypeStyles(
//               jobType
//             )}`}
//           >
//             {jobType}
//           </div>
//         </div>

//         {/* Title */}
//         <div className="flex justify-between items-center ">
//           <h3 className="text-lg font-bold text-wrap">{title}</h3>
//         </div>
//       </div>
      

//       {/* Content Section */}
//       <div className="p-4 flex-grow flex flex-col">


//         {/* Company*/}
//         <div className="flex items-center ">
//           <h3 className="text-wrap">{company}</h3>
//           |
//           <h3 className="text-wrap">{location}</h3>
//         </div>

//         {/* Company*/}
//         <div className="flex justify-between items-center ">
//           <h3 className="text-wrap">{category}</h3>
//         </div>

//         {/* Price Div */}
//         <div>
//           <p className="text-white font-bold">
//             GH₵{price} / {getPricingLabel()}
//           </p>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-400 mb-4">{description}</p>

//         {/* Spacer to push the button to the bottom */}
//         <div className="flex-grow"></div>

//         {/* Apply Button */}
//         <Link href={'/jobs/applying_to_job'} >
//           <button className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4">
//             Apply For This Job
//           </button>
//         </Link>

//       </div>
//     </div>
//   );
// };

// export default JobCard;








"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const JobCard = ({
  title,
  company,
  location,
  category,
  price,
  pricingType = "hour",
  description,
  jobType,
  className = "",
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
      default:
        return "per hour";
    }
  };

  const getJobTypeStyles = (type) => {
    switch (type) {
      case "Full Time":
        return "bg-purple-500 text-white";
      case "Part Time":
        return "bg-red-500 text-white";
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
      {/* Top Section */}
      <div className="relative w-full h-20 bg-gray-800">
        {/* Favorite Button */}
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
          className={`absolute top-2 left-2 px-2 py-1 rounded-md max-w-72 w-full text-sm font-semibold ${getJobTypeStyles(
            jobType
          )}`}
        >
          {jobType}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-wrap mb-1">{title}</h3>

        {/* Company and Location */}
        <div className="text-sm text-gray-300">
          <span>{company}</span> | <span>{location}</span>
        </div>

        {/* Category */}
        <div className="text-sm text-gray-400">{category}</div>

        {/* Price */}
        <div className="">
          <p className="text-white font-bold">
            GH₵{price} / {getPricingLabel()}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-2">{description}</p>

        {/* Spacer to push the button to the bottom */}
        <div className="flex-grow"></div>

        {/* Apply Button */}
        <Link href="/jobs/applying_to_job">
          <button className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4">
            Apply For This Job
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
