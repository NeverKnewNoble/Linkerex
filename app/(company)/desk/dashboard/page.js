// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import Loading from "../../../loading";
// import { FaBriefcase, FaUserCheck, FaCalendarCheck, FaTimesCircle, FaUserPlus } from "react-icons/fa";

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const [applicantCount, setApplicantCount] = useState(0);
//   const [jobCount, SetJobsCount] = useState(0);
//   const [pendingCount, setPendingCount] = useState(0);
//   const [interviewCount, setInterviewCount] = useState(0);
//   const [acceptedCount, setAcceptedCount] = useState(0);
//   const [rejectedCount, setRejectedCount] = useState(0);

//   useEffect(() => {
//     const count = sessionStorage.getItem("applicantCount") || "0";
//     const JobsCount = sessionStorage.getItem("JobsCount") || "0";
//     SetJobsCount(parseInt(JobsCount));
//     setApplicantCount(parseInt(count));

//     if (typeof window !== "undefined") { // Ensure code runs only in the browser
//       setApplicantCount(sessionStorage.getItem("applicantCount") || "0");
//       setPendingCount(sessionStorage.getItem("pendingCardCount") || "0");
//       setInterviewCount(sessionStorage.getItem("interviewCardCount") || "0");
//       setAcceptedCount(sessionStorage.getItem("acceptedCardCount") || "0");
//       setRejectedCount(sessionStorage.getItem("rejectedCardCount") || "0");
//     }

//   }, []);

//   if (status === "loading") {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white p-6">
//       <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-10">
//         {/* Dashboard Title */}
//         <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-10 tracking-wide">
//           📊 Dashboard Overview
//         </h1>

//         {/* Top Cards Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Listed Jobs */}
//           <div className="bg-gradient-to-tr from-gray-800 to-gray-700 text-white rounded-lg p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
//             <FaBriefcase className="text-5xl text-gray-200 mb-4" />
//             <h2 className="text-2xl font-semibold">Listed Jobs</h2>
//             <p className="text-5xl font-bold mt-2">{jobCount}</p>
//           </div>

//           {/* Applications */}
//           <div className="bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
//             <FaUserPlus className="text-5xl mb-4" />
//             <h2 className="text-2xl font-semibold">Applications</h2>
//             <p className="text-5xl font-bold mt-2">{applicantCount}</p>
//           </div>

//           {/* Job Status */}
//           <div className="bg-gradient-to-tr from-blue-700 to-blue-500 text-white rounded-lg p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
//             <FaCalendarCheck className="text-5xl mb-4" />
//             <h2 className="text-2xl font-semibold">Job Status</h2>
//             <p className="text-lg text-gray-200 mt-2">See Breakdown Below</p>
//           </div>
//         </div>

//         {/* Status Breakdown Section */}
//         <div className="mt-10 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl">
//           <h2 className="text-2xl font-semibold text-gray-100 mb-4 text-center">📌 Job Status Breakdown</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="flex items-center justify-between bg-yellow-500/20 text-yellow-300 py-5 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
//               <FaUserCheck className="text-4xl" />
//               <span className="text-lg font-bold">Pending</span>
//               <span className="text-3xl font-bold">{pendingCount}</span>
//             </div>

//             <div className="flex items-center justify-between bg-blue-500/20 text-blue-300 py-5 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
//               <FaCalendarCheck className="text-4xl" />
//               <span className="text-lg font-bold">Interview</span>
//               <span className="text-3xl font-bold">{interviewCount}</span>
//             </div>

//             <div className="flex items-center justify-between bg-green-500/20 text-green-300 py-5 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
//               <FaUserCheck className="text-4xl" />
//               <span className="text-lg font-bold">Accepted</span>
//               <span className="text-3xl font-bold">{acceptedCount}</span>
//             </div>

//             <div className="flex items-center justify-between bg-red-500/20 text-red-300 py-5 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
//               <FaTimesCircle className="text-4xl" />
//               <span className="text-lg font-bold">Rejected</span>
//               <span className="text-3xl font-bold">{rejectedCount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Coming Soon Section */}
//         <div className="mt-10 bg-gray-900 text-white p-6 rounded-lg shadow-xl flex justify-center items-center">
//           <p className="text-lg font-semibold">🚀 Exciting New Features Coming Soon!</p>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../../../loading";
import { FaBriefcase, FaUserCheck, FaCalendarCheck, FaTimesCircle, FaUserPlus } from "react-icons/fa";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [applicantCount, setApplicantCount] = useState(0);
  const [jobCount, SetJobsCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    const count = sessionStorage.getItem("applicantCount") || "0";
    const JobsCount = sessionStorage.getItem("JobsCount") || "0";
    SetJobsCount(parseInt(JobsCount));
    setApplicantCount(parseInt(count));

    if (typeof window !== "undefined") { // Ensure code runs only in the browser
      setApplicantCount(sessionStorage.getItem("applicantCount") || "0");
      setPendingCount(sessionStorage.getItem("pendingCardCount") || "0");
      setInterviewCount(sessionStorage.getItem("interviewCardCount") || "0");
      setAcceptedCount(sessionStorage.getItem("acceptedCardCount") || "0");
      setRejectedCount(sessionStorage.getItem("rejectedCardCount") || "0");
    }

  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-10">
        {/* Dashboard Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-100 mb-8 sm:mb-10 tracking-wide">
          📊 Dashboard Overview
        </h1>

        {/* Top Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Listed Jobs */}
          <div className="bg-gradient-to-tr from-gray-800 to-gray-700 text-white rounded-lg p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaBriefcase className="text-4xl sm:text-5xl text-gray-200 mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold">Listed Jobs</h2>
            <p className="text-4xl sm:text-5xl font-bold mt-2">{jobCount}</p>
          </div>

          {/* Applications */}
          <div className="bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaUserPlus className="text-4xl sm:text-5xl mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold">Applications</h2>
            <p className="text-4xl sm:text-5xl font-bold mt-2">{applicantCount}</p>
          </div>

          {/* Job Status */}
          <div className="bg-gradient-to-tr from-blue-700 to-blue-500 text-white rounded-lg p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaCalendarCheck className="text-4xl sm:text-5xl mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold">Job Status</h2>
            <p className="text-base sm:text-lg text-gray-200 mt-2">See Breakdown Below</p>
          </div>
        </div>

        {/* Status Breakdown Section */}
        <div className="mt-8 sm:mt-10 bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 text-center">📌 Job Status Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center justify-between bg-yellow-500/20 text-yellow-300 py-4 sm:py-5 px-4 sm:px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
              <FaUserCheck className="text-3xl sm:text-4xl" />
              <span className="text-base sm:text-lg font-bold">Pending</span>
              <span className="text-2xl sm:text-3xl font-bold">{pendingCount}</span>
            </div>

            <div className="flex items-center justify-between bg-blue-500/20 text-blue-300 py-4 sm:py-5 px-4 sm:px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
              <FaCalendarCheck className="text-3xl sm:text-4xl" />
              <span className="text-base sm:text-lg font-bold">Interview</span>
              <span className="text-2xl sm:text-3xl font-bold">{interviewCount}</span>
            </div>

            <div className="flex items-center justify-between bg-green-500/20 text-green-300 py-4 sm:py-5 px-4 sm:px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
              <FaUserCheck className="text-3xl sm:text-4xl" />
              <span className="text-base sm:text-lg font-bold">Accepted</span>
              <span className="text-2xl sm:text-3xl font-bold">{acceptedCount}</span>
            </div>

            <div className="flex items-center justify-between bg-red-500/20 text-red-300 py-4 sm:py-5 px-4 sm:px-6 rounded-lg shadow-md transform hover:scale-105 transition-all">
              <FaTimesCircle className="text-3xl sm:text-4xl" />
              <span className="text-base sm:text-lg font-bold">Rejected</span>
              <span className="text-2xl sm:text-3xl font-bold">{rejectedCount}</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 sm:mt-10 bg-gray-900 text-white p-4 sm:p-6 rounded-lg shadow-xl flex justify-center items-center">
          <p className="text-base sm:text-lg font-semibold">🚀 Exciting New Features Coming Soon!</p>
        </div>
      </div>
    </div>
  );
}