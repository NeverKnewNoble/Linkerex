"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../../../loading";
import { FaBriefcase, FaUserCheck, FaCalendarCheck, FaTimesCircle, FaUserPlus } from "react-icons/fa";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState({
    applicantCount: 0,
    jobCount: 0,
    pendingCount: 0,
    interviewCount: 0,
    acceptedCount: 0,
    rejectedCount: 0
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();
        setDashboardData(data);

        // Optionally store data in sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("dashboardData", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    fetchDashboardData();

    // Try to use cached data if available
    if (typeof window !== "undefined") {
      const cachedData = sessionStorage.getItem("dashboardData");
      if (cachedData) {
        setDashboardData(JSON.parse(cachedData));
      } else {
        fetchDashboardData();
      }
    }
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-100 mb-8 sm:mb-10 tracking-wide">
          📊 Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card title="Listed Jobs" count={dashboardData.jobCount} icon={<FaBriefcase />} bgColor="from-gray-800 to-gray-700" />
          <Card title="Applications" count={dashboardData.applicantCount} icon={<FaUserPlus />} bgColor="from-green-600 to-green-400" />
          <Card title="Job Status" count="See Breakdown Below" icon={<FaCalendarCheck />} bgColor="from-blue-700 to-blue-500" />
        </div>

        <StatusBreakdown data={dashboardData} />
      </div>
    </div>
  );
}

const Card = ({ title, count, icon, bgColor }) => (
  <div className={`bg-gradient-to-tr ${bgColor} text-white rounded-lg p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300`}>
    <div className="text-4xl sm:text-5xl text-gray-200 mb-3 sm:mb-4">{icon}</div>
    <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
    <p className="text-4xl sm:text-5xl font-bold mt-2">{count}</p>
  </div>
);

const StatusBreakdown = ({ data }) => (
  <div className="mt-8 sm:mt-10 bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-xl">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 text-center">📌 Job Status Breakdown</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatusCard title="Pending" count={data.pendingCount} icon={<FaUserCheck />} color="yellow" />
      <StatusCard title="Interview" count={data.interviewCount} icon={<FaCalendarCheck />} color="blue" />
      <StatusCard title="Accepted" count={data.acceptedCount} icon={<FaUserCheck />} color="green" />
      <StatusCard title="Rejected" count={data.rejectedCount} icon={<FaTimesCircle />} color="red" />
    </div>
  </div>
);

const StatusCard = ({ title, count, icon, color }) => (
  <div className={`flex items-center justify-between bg-${color}-500/20 text-${color}-300 py-4 sm:py-5 px-4 sm:px-6 rounded-lg shadow-md transform hover:scale-105 transition-all`}>
    <div className="text-3xl sm:text-4xl">{icon}</div>
    <span className="text-base sm:text-lg font-bold">{title}</span>
    <span className="text-2xl sm:text-3xl font-bold">{count}</span>
  </div>
);
