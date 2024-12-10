import React from "react";
import JobCard from "./JobCard";

const Joblist = () => {
  // Array of job and internship opportunities
  const opportunities = [
    {
      title: "Front-End Developer",
      price: "30.00",
      pricingType: "hour",
      description: "Build interactive web applications.",
      image: "/linkerex/thinking.jpg",
      ratings: 4,
      reviews: 123,
    },
    {
      title: "Marketing Intern",
      price: "15.00",
      pricingType: "hour",
      description: "Assist marketing campaigns and social media.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 98,
    },
    {
      title: "Customer Support",
      price: "20.00",
      pricingType: "hour",
      description: "Provide email and chat support.",
      image: "/linkerex/thinking.jpg",
      ratings: 3,
      reviews: 67,
    },
    {
      title: "Data Analyst",
      price: "40.00",
      pricingType: "hour",
      description: "Analyze datasets for client insights.",
      image: "/linkerex/thinking.jpg",
      ratings: 4,
      reviews: 200,
    },
    {
      title: "Graphic Designer Intern",
      price: "12.00",
      pricingType: "hour",
      description: "Design engaging graphics for clients.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 89,
    },
    {
      title: "Sales Executive",
      price: "25.00",
      pricingType: "hour",
      description: "Expand the customer base and close deals.",
      image: "/linkerex/thinking.jpg",
      ratings: 4,
      reviews: 145,
    },
    {
      title: "Content Writer",
      price: "18.00",
      pricingType: "hour",
      description: "Write engaging content for websites.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 74,
    },
    {
      title: "Digital Marketer",
      price: "35.00",
      pricingType: "hour",
      description: "Manage digital marketing campaigns.",
      image: "/linkerex/thinking.jpg",
      ratings: 5,
      reviews: 150,
    },
  ];

  return (
    <div>
      {/* Job Opportunities Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore Opportunities
          </h1>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {opportunities.map((opportunity, index) => (
              <JobCard
                key={index}
                title={opportunity.title}
                price={opportunity.price}
                pricingType={opportunity.pricingType}
                description={opportunity.description}
                image={opportunity.image}
                ratings={opportunity.ratings}
                reviews={opportunity.reviews}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Joblist;
