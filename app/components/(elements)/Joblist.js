import React from "react";
import JobCard from "./JobCard";
import { Pagination } from "@nextui-org/react";

const Joblist = () => {
  // Array of job and internship opportunities
  const opportunities = [
    {
      title: "Front-End Developer",
      company: "Af Tech",
      location: "Spintex",
      category: "IT & Development",
      price: "30.00",
      pricingType: "hour",
      description: "Build interactive web applications.",
      jobType: "Full Time", // Add jobType property
    },
    {
      title: "Marketing Intern",
      company: "Af Tech",
      company: "Af Tech",
      location: "Spintex",
      category: "IT & Development",
      price: "15.00",
      pricingType: "hour",
      description: "Assist marketing campaigns and social media.",
      jobType: "Internship", // Add jobType property
    },
    {
      title: "Customer Support for the rest of the month in a sovient ",
      company: "Af Tech",
      location: "Spintex",
      category: "IT & Development",
      price: "20.00",
      pricingType: "hour",
      description: "Provide email and chat support.",
      jobType: "Part Time", // Add jobType property
    },
    {
      title: "Data Analyst",
      company: "Af Tech",
      location: "Spintex",
      category: "IT & Development",
      price: "40.00",
      pricingType: "hour",
      description: "Analyze datasets for client insights.",
      image: "/linkerex/thinking.jpg",
      ratings: 4,
      reviews: 200,
      jobType: "Full Time", // Add jobType property
    },
    {
      title: "Graphic Designer Intern",
      company: "Af Tech",
      location: "Spintex",
      category: "IT & Development",
      price: "12.00",
      pricingType: "hour",
      description: "Design engaging graphics for clients.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 89,
      jobType: "Internship", // Add jobType property
    },
    {
      title: "Sales Executive",
      price: "25.00",
      pricingType: "hour",
      description: "Expand the customer base and close deals.",
      image: "/linkerex/thinking.jpg",
      ratings: 4,
      reviews: 145,
      jobType: "Full Time", // Add jobType property
    },
    {
      title: "Content Writer",
      price: "18.00",
      pricingType: "hour",
      description: "Write engaging content for websites.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 74,
      jobType: "Part Time", // Add jobType property
    },
    {
      title: "Digital Marketer",
      company: "Af Tech",
      price: "35.00",
      pricingType: "hour",
      description: "Manage digital marketing campaigns.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 150,
      jobType: "Full Time", // Add jobType property
    },
  ];

  return (
    <div>
      {/* Job Opportunities Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore Opportunities
          </h1>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {opportunities.map((opportunity, index) => (
              <JobCard
                key={index}
                title={opportunity.title}
                company={opportunity.company}
                location={opportunity.location}
                category={opportunity.category}
                price={opportunity.price}
                pricingType={opportunity.pricingType}
                description={opportunity.description}
                ratings={opportunity.ratings}
                reviews={opportunity.reviews}
                jobType={opportunity.jobType} // Pass the jobType property
                className="w-full"
              />
            ))}
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex align-middle justify-center mt-10">
          <Pagination initialPage={1} total={10} />
        </div>
      </section>
    </div>
  );
};

export default Joblist;
 