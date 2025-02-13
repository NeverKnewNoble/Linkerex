// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import Link from "next/link";

// const JobCard = ({
//   id, // Job ID
//   title,
//   company,
//   location,
//   category,
//   price,
//   pricingType = "hour",
//   description,
//   jobType,
//   className = "",
//   appliedJobs, // Applied jobs data
//   userId, // Logged-in user ID
// }) => {
//   const [isFavorited, setIsFavorited] = useState(false);

//   // Check if the user has already applied for this job
//   const hasApplied = appliedJobs.some(
//     (job) =>
//       job.jobId === id &&
//       job.studentId === userId &&
//       job.studentAction === "Submitted"
//   );

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   const getPricingLabel = () => {
//     switch (pricingType) {
//       case "Salary":
//         return "per month";
//       case "Wage":
//         return "per hour";
//       default:
//         return "";
//     }
//   };

//   const getJobTypeStyles = (type) => {
//     switch (type) {
//       case "Full-Time":
//         return "bg-purple-500 text-white";
//       case "Part-Time":
//         return "bg-red-500 text-white";
//       case "Internship":
//         return "bg-green-500 text-white";
//       default:
//         return "bg-gray-300 text-black";
//     }
//   };

//   const buttonStatus = () => {
//     if (hasApplied) {
//       return "Applied"; // Change button text if applied
//     } else if (jobType === "Full-Time" || jobType === "Part-Time") {
//       return "Apply For GH₵5";
//     } else if (jobType === "Internship") {
//       return "Apply For This Job";
//     } else {
//       return "Unavailable";
//     }
//   };

//   const Pricing = () => {
//     if (jobType === "Full-Time" || jobType === "Part-Time") {
//       return `GH₵${price} / ${getPricingLabel()}`;
//     } else {
//       return "";
//     }
//   };

//   return (
//     <div
//       className={`bg-[#1a1a1a] text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between ${className}`}
//     >
//       <div className="relative w-full h-20 bg-gray-800">
//         <button
//           className="absolute top-2 right-2 text-gray-400 hover:text-blue-500"
//           onClick={toggleFavorite}
//         >
//           <Icon
//             icon={isFavorited ? "mdi:heart" : "mdi:heart-outline"}
//             className={`text-xl ${isFavorited ? "text-blue-500" : "text-gray-400"}`}
//           />
//         </button>

//         <div
//           className={`absolute top-2 left-2 px-2 py-1 rounded-md max-w-72 w-full text-sm font-semibold ${getJobTypeStyles(
//             jobType
//           )}`}
//         >
//           {jobType}
//         </div>
//       </div>

//       <div className="p-4 flex flex-col gap-2 flex-grow">
//         <h3 className="text-lg font-bold text-wrap mb-1">{title}</h3>
//         <div className="text-sm text-gray-300">
//           <span>{company}</span> | <span>{location}</span>
//         </div>
//         <div className="text-sm text-gray-400">{category}</div>
//         <div className="">
//           <p className="text-white font-bold">{Pricing()}</p>
//         </div>
//         <p className="text-sm text-gray-400 mt-2">{description}</p>
//         <div className="flex-grow"></div>

//         {jobType === "Internship" ? (
//           <Link href={`/jobs/applying_to_job?id=${id}`}>
//             <button
//               className={`w-full ${
//                 hasApplied ? "bg-green-600" : "bg-blue-700"
//               } text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300 mt-4`}
             
//             >
//               {buttonStatus()}
//             </button>
//           </Link>
//         ) : (
//           <Link href="/jobs/payment">
//             <button
//               className={`w-full ${
//                 hasApplied ? "bg-green-600" : "bg-blue-700"
//               } text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300 mt-4`}
             
//             >
//               {buttonStatus()}
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobCard;







import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const JobCard = ({
  id, // Job ID
  title,
  company,
  location,
  category,
  price,
  pricingType = "hour",
  description,
  jobType,
  className = "",
  appliedJobs, // Applied jobs data
  userId, // Logged-in user ID
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if the user has already applied for this job
  const hasApplied = appliedJobs.some(
    (job) =>
      job.jobId === id &&
      job.studentId === userId &&
      job.studentAction === "Submitted"
  );

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const getPricingLabel = () => {
    switch (pricingType) {
      case "Salary":
        return "per month";
      case "Wage":
        return "per hour";
      default:
        return "";
    }
  };

  const getJobTypeStyles = (type) => {
    switch (type) {
      case "Full-Time":
        return "bg-purple-500 text-white";
      case "Part-Time":
        return "bg-red-500 text-white";
      case "Internship":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const buttonStatus = () => {
    if (hasApplied) {
      return (
        <div className="flex items-center justify-center">
          <span>Applied</span>
          <Icon icon="mdi:check" className="text-white text-[25px]" /> {/* Checkmark icon */} 
        </div>
      );
    } else if (jobType === "Full-Time" || jobType === "Part-Time") {
      return "Apply For GH₵5";
    } else if (jobType === "Internship") {
      return "Apply For This Job";
    } else {
      return "Unavailable";
    }
  };

  const Pricing = () => {
    if (jobType === "Full-Time" || jobType === "Part-Time") {
      return `GH₵${price} / ${getPricingLabel()}`;
    } else {
      return "";
    }
  };

  return (
    <div
      className={`bg-[#1a1a1a] text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="relative w-full h-20 bg-gray-800">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-blue-500"
          onClick={toggleFavorite}
        >
          <Icon
            icon={isFavorited ? "mdi:heart" : "mdi:heart-outline"}
            className={`text-xl ${isFavorited ? "text-blue-500" : "text-gray-400"}`}
          />
        </button>

        <div
          className={`absolute top-2 left-2 px-2 py-1 rounded-md max-w-72 w-full text-sm font-semibold ${getJobTypeStyles(
            jobType
          )}`}
        >
          {jobType}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="text-lg font-bold text-wrap mb-1">{title}</h3>
        <div className="text-sm text-gray-300">
          <span>{company}</span> | <span>{location}</span>
        </div>
        <div className="text-sm text-gray-400">{category}</div>
        <div className="">
          <p className="text-white font-bold">{Pricing()}</p>
        </div>
        <p className="text-sm text-gray-400 mt-2 line-clamp-3">{description}</p>
        <div className="flex-grow"></div>

        {jobType === "Internship" ? (
          <Link href={`/jobs/applying_to_job?id=${id}`}>
            <button
              className={`w-full ${
                hasApplied ? "bg-green-600" : "bg-blue-700"
              } text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300 mt-4`}
              // disabled={hasApplied} // Disable the button if applied
            >
              {buttonStatus()}
            </button>
          </Link>
        ) : (
          <Link href="/jobs/payment">
            <button
              className={`w-full ${
                hasApplied ? "bg-green-600" : "bg-blue-700"
              } text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300 mt-4`}
              // disabled={hasApplied} // Disable the button if applied
            >
              {buttonStatus()}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;