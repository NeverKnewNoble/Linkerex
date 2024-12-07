import React from "react";
import JobCard from "../components/(elements)/JobCard";

export default function Home() {
  // Array of job and internship opportunities
  const opportunities = [
    {
      title: "Front-End Developer",
      amount: "30",
      description: "Build interactive web applications.",
      postedDate: "Dec 5, 2024",
      type: "Full-Time",
      company: "Tech Solutions Inc.",
    },
    {
      title: "Marketing Intern",
      amount: "15",
      description: "Assist marketing campaigns and social media.",
      postedDate: "Nov 30, 2024",
      type: "Internship",
      company: "Creative Minds Ltd.",
    },
    {
      title: "Customer Support",
      amount: "20",
      description: "Provide email and chat support.",
      postedDate: "Dec 1, 2024",
      type: "Part-Time",
      company: "ServiceCo",
    },
    {
      title: "Data Analyst",
      amount: "40",
      description: "Analyze datasets for client insights.",
      postedDate: "Dec 2, 2024",
      type: "Full-Time",
      company: "Insight Analytics",
    },
    {
      title: "Graphic Designer Intern",
      amount: "12",
      description: "Design engaging graphics for clients.",
      postedDate: "Dec 1, 2024",
      type: "Internship",
      company: "DesignWorks",
    },
    {
      title: "Sales Executive",
      amount: "25",
      description: "Expand the customer base and close deals.",
      postedDate: "Nov 29, 2024",
      type: "Full-Time",
      company: "SalesPro",
    },
    {
      title: "Content Writer",
      amount: "18",
      description: "Write engaging content for websites.",
      postedDate: "Dec 4, 2024",
      type: "Part-Time",
      company: "WriteRight",
    },
    {
      title: "Digital Marketer",
      amount: "35",
      description: "Manage digital marketing campaigns.",
      postedDate: "Dec 3, 2024",
      type: "Full-Time",
      company: "AdVantage",
    },
  ];

  return (
    <div>
      {/* Job Opportunities Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Opportunities
          </h1>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {opportunities.map((opportunity, index) => (
              <JobCard
                key={index}
                title={opportunity.title}
                amount={opportunity.amount}
                description={opportunity.description}
                postedDate={opportunity.postedDate}
                type={opportunity.type}
                company={opportunity.company}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
