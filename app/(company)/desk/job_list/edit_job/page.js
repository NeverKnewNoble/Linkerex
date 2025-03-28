"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../../../../loading";
import { Alert } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

export default function EditJob() {
  const { data: session, status } = useSession();
  const [alert, setAlert] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();
  const [jobId, setJobId] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [paymentTimeline, setPaymentTimeline] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(true);

  //  ! Get Data
  useEffect(() => {
    // Extract job ID from the query string
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    // console.log("Extracted Job ID:", id);

    if (id) {
      setJobId(id);
      fetchJob(id);
    } else {
      setError("No job ID provided in the URL.");
      setLoading(false);
    }
  }, []);

  const fetchJob = async (id) => {
    // console.log("Fetching job with ID:", id);
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      const job = res.data;

      setTitle(job.title || "");
      setCompany(job.company || "");
      setLocation(job.location || "");
      setCategory(job.category || "");
      setJobType(job.jobType || "");
      setPaymentTimeline(job.paymentTimeline || "");
      setAmount(job.amount || 0);
      setDescription(job.description || "");
      setRequirements(job.requirements || "");
      setLoading(false);
    } catch (err) {
      // console.error("Error fetching job data:", err.message);
      setError("Failed to load job details.");
      setLoading(false);
    }
  };

  // ! Save changes to Job Data
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const updatedJob = {
        title,
        company,
        location,
        category,
        jobType,
        paymentTimeline,
        amount,
        description,
        requirements,
      };

      const res = await axios.put(`/api/jobs/${jobId}`, updatedJob);
      if (res.status === 200) {
        setAlert({
          type: "success",
          message: "Job updated successfully!",
        });

        setTimeout(() => {
          router.push("/desk/job_list");
        }, 3000);        
      }
    } catch (err) {
      // console.error("Error updating job:", err.message);
      setAlert({
        type: "danger",
        message: `Failed to save changes.: ${errorData.error}`,
      });
    }
  };

  // ? Loading Data
  if (loading) return <Loading />;

  //! Function to Delete Job Listing
  const deleteById = async () => {
    try {
      const res = await axios.delete(`/api/jobs/${jobId}`);
  
      if (res.status === 200 || res.status === 204) {
        // console.log("✅ Job Deleted");
        setAlert({ type: "success", message: "Job Listing deleted successfully!" });
  
        // Redirect to job list after deletion
        router.push("/desk/job_list");
      } else {
        const errorData = res.data; // ✅ Use `res.data` instead of `res.json()`
        throw new Error(errorData.error || "Failed to delete job");
      }
    } catch (err) {
      // console.error("❌ Error deleting job:", err.message);
      setAlert({ type: "danger", message: `Error: ${err.message}` });
    }
  };
  

  //? Modal Component
  const Modal = ({ onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-[#18181b] bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this Job Listing? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={onConfirm} // Call the passed onConfirm handler
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#18181b] bg-center flex items-center justify-center p-4">
      <div className="w-full bg-[#18181b] min-h-screen mx-4 sm:mx-10 my-5 rounded-lg text-gray-300">
        <div className="p-4 sm:p-6 bg-[#18181b]">
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
              <option value="Full Time">Full-Time</option>
              <option value="Part Time">Part-Time</option>
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
              placeholder="Enter job description"
              value={description}
              minrows={10}
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
              placeholder="Enter job requirements"
              value={requirements}
              minrows={10}
              onChange={(e) => setRequirements(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div className="max-w-[1900px] w-full mt-5">
            {alert && (
              <Alert color={alert.type === "success" ? "success" : "error"}>
                {alert.message}
              </Alert>
            )}
          </div>
          {/* Submit Button */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md focus:outline-none"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} onConfirm={deleteById} />}
    </div>
  );
}