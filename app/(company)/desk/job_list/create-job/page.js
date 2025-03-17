"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { Alert } from "@nextui-org/react";

export default function CreateJob() {
  const [alert, setAlert] = React.useState(null);
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [paymentTimeline, setPaymentTimeline] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const router = useRouter();

  // !Update company and location from session
  useEffect(() => {
    if (session) {
      setCompany(session.user.company_name || "");
      setLocation(session.user.company_location || "");
    }
  }, [session]);

  const createJob = async () => {
    // Fetch the session to get user info
    const session = await getSession();

    if (!session) {
      setAlert({
        type: "danger",
        message: "You must be logged in to create a job.",
      });
      return;
    }

    //? Validate fields before sending data
    if (
      !title ||
      !company ||
      !location ||
      !category ||
      !jobType ||
      (!paymentTimeline && jobType !== "Internship") ||
      (!amount && jobType !== "Internship") ||
      !description ||
      !requirements
    ) {

      setAlert({
        type: "danger",
        message: "Please fill out all required fields.",
      });
      return;
    }

    // Prepare job data
    const jobData = {
      title,
      company,
      location,
      category,
      jobType,
      paymentTimeline: jobType === "Internship" ? null : paymentTimeline,
      amount: jobType === "Internship" ? null : amount,
      description,
      requirements,
      createdby: session.user.id || session.user._id,
    };

    // Log the prepared jobData
    // console.log("Job data to be sent to the API:", jobData);

    // !Send job data to the API
    try {
      const response = await axios.post("/api/jobs", jobData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setAlert({
          type: "success",
          message: "Job created successfully!",
        });

        setTimeout(() => {
          router.push("/desk/job_list");
        }, 8000);        
      }
    } catch (err) {
      // console.error("❌ Error creating job:", err.response?.data?.error || err.message);
  
      setAlert({
        type: "danger",
        message: `Failed to create job listing: ${err.response?.data?.error || "Unknown error"}`,
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
    >
      {/* Alert Popup */}
      {alert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            color={alert.type}
            variant="flat"
            onClose={() => setAlert(null)}
            className="shadow-lg"
          >
            {alert.message}
          </Alert>
        </div>
      )}
      <div className="w-full bg-[#1a1a1a] min-h-screen mx-4 my-5 rounded-lg shadow-lg text-gray-300">
        <h1 className="text-3xl sm:text-[50px] font-bold ml-4 sm:ml-8 mt-5">Create New Job</h1>

        <div className="p-4 sm:p-6">
          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company Field */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">
              Company
            </label>
            <input
              id="company"
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location Field */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select location</option>
              <option value="Madina">Madina</option>
              <option value="East Legon">East Legon</option>
              <option value="Spintex">Spintex</option>
              <option value="Airport Residential Area">Airport Residential Area</option>
              <option value="Osu">Osu</option>
              <option value="Labone">Labone</option>
              <option value="Cantonments">Cantonments</option>
              <option value="Adenta">Adenta</option>
              <option value="Dansoman">Dansoman</option>
              <option value="Tema">Tema</option>
              <option value="Nungua">Nungua</option>
              <option value="Achimota">Achimota</option>
              <option value="Sakumono">Sakumono</option>
              <option value="Kumasi">Kumasi</option>
              <option value="Cape Coast">Cape Coast</option>
              <option value="Elmina">Elmina</option>
              <option value="Kasoa">Kasoa</option>
              <option value="Takoradi">Takoradi</option>
              <option value="Winneba">Winneba</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Programming & Tech">Programming & Tech</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="Admin & Customer Support">Admin & Customer Support</option>
              <option value="Finance & Accounting">Finance & Accounting</option>
              <option value="HR & Training">HR & Training</option>
              <option value="Legal">Legal</option>
              <option value="Engineering & Architecture">Engineering & Architecture</option>
              <option value="Video & Animation">Video & Animation</option>
              <option value="Writing & Translation">Writing & Translation</option>
              <option value="Music & Audio">Music & Audio</option>
              <option value="Photography">Photography</option>
            </select>
          </div>

          {/* Job Type Field */}
          <div className="mb-4">
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-400 mb-1">
              Job Type
            </label>
            <select
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select job type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Conditional Payment Timeline and Amount */}
          {jobType !== "Internship" && (
            <>
              <div className="mb-4">
                <label htmlFor="paymentTimeline" className="block text-sm font-medium text-gray-400 mb-1">
                  Payment Timeline
                </label>
                <select
                  id="paymentTimeline"
                  value={paymentTimeline}
                  onChange={(e) => setPaymentTimeline(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Payment Timeline</option>
                  <option value="Salary">Salary</option>
                  <option value="Wage">Wage</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1">
                  Amount(GH₵)
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value).toFixed(2);
                    setAmount(value);
                  }}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              id="description"
              minrows={8}
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>

          {/* Requirements Field */}
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-400 mb-1">
              Requirements
            </label>
            <textarea
              id="requirements"
              minrows={8}
              placeholder="Enter job requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              onClick={createJob}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Job Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




