import React from "react";
import ApplicantCard from "./ApplicantCard";

const ApplicantList = () => {
  const applicants = [
    {
      name: "John Doe",
      university: "Harvard University",
      email: "john.doe@example.com",
      jobCategory: "Software Development",
      jobTitle: "Front-End Developer",
      image: "/linkerex/lady.jpg", // Dynamic image for this applicant
    },
    {
      name: "Jane Smith",
      university: "Stanford University",
      email: "jane.smith@example.com",
      jobCategory: "Marketing",
      jobTitle: "Marketing Intern",
      image: "/linkerex/lady.jpg", // Dynamic image for this applicant
    },
    {
        name: "John Doe",
        university: "Harvard University",
        email: "john.doe@example.com",
        jobCategory: "Software Development",
        jobTitle: "Front-End Developer",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "Jane Smith",
        university: "Stanford University",
        email: "jane.smith@example.com",
        jobCategory: "Marketing",
        jobTitle: "Marketing Intern",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "John Doe",
        university: "Harvard University",
        email: "john.doe@example.com",
        jobCategory: "Software Development",
        jobTitle: "Front-End Developer",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "Jane Smith",
        university: "Stanford University",
        email: "jane.smith@example.com",
        jobCategory: "Marketing",
        jobTitle: "Marketing Intern",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "John Doe",
        university: "Harvard University",
        email: "john.doe@example.com",
        jobCategory: "Software Development",
        jobTitle: "Front-End Developer",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "Jane Smith",
        university: "Stanford University",
        email: "jane.smith@example.com",
        jobCategory: "Marketing",
        jobTitle: "Marketing Intern",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "John Doe",
        university: "Harvard University",
        email: "john.doe@example.com",
        jobCategory: "Software Development",
        jobTitle: "Front-End Developer",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
      {
        name: "Jane Smith",
        university: "Stanford University",
        email: "jane.smith@example.com",
        jobCategory: "Marketing",
        jobTitle: "Marketing Intern",
        image: "/linkerex/lady.jpg", // Dynamic image for this applicant
      },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {applicants.map((applicant, index) => (
        <ApplicantCard
          key={index}
          name={applicant.name}
          university={applicant.university}
          email={applicant.email}
          jobCategory={applicant.jobCategory}
          jobTitle={applicant.jobTitle}
          image={applicant.image} // Pass the dynamic image source
        />
      ))}
    </div>
  );
};

export default ApplicantList;
