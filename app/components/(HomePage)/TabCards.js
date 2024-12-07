import React from "react";
import CatCards from "../(elements)/CatCards";

const TabCards = () => {
  const jobsData = [
    { acronym: "DV", title: "Delivery Driver", color: "bg-gray-700" },
    { acronym: "AC", title: "Accountant", color: "bg-yellow-400" },
    { acronym: "FD", title: "Front-End Developer", color: "bg-blue-500" },
    { acronym: "BD", title: "Back-End Developer", color: "bg-blue-600" },
    { acronym: "TC", title: "Tax Consultant", color: "bg-yellow-400" },
    { acronym: "BK", title: "Banker", color: "bg-green-500" },
    { acronym: "FA", title: "Financial Advisor", color: "bg-green-400" },
    { acronym: "IA", title: "Investment Analyst", color: "bg-green-500" },
    { acronym: "LO", title: "Loan Officer", color: "bg-teal-500" },
    { acronym: "MM", title: "Marketing Manager", color: "bg-indigo-400" },
    { acronym: "SE", title: "Sales Executive", color: "bg-indigo-500" },
    { acronym: "BM", title: "Brand Manager", color: "bg-purple-400" },
  ];

  return (
    <section className="bg-gray-100 py-10 w-full">
      <div className="container mx-auto px-4 pb-20">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Job Categories</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobsData.map((job, index) => (
            <CatCards
              key={index}
              acronym={job.acronym}
              title={job.title}
              jobs={0}
              color={job.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TabCards;
