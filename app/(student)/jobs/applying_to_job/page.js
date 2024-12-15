"use client";

import React from "react";
import { Button, Textarea, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const ApplyingToJobs = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
    >
      <div className="w-full bg-white min-h-screen mx-80 my-10 text-[#18181b] rounded-lg shadow-lg p-8">
        {/* Job Details Section */}
        <section className="mb-10">
          <h2 className="text-[40px] font-bold mb-4">Title - What Will Be The Job Name</h2>
          <h3 className="text-[20px] font-semibold mb-2">Job Type: <span className="text-blue-500">Internship</span></h3>
          <h3 className="text-[20px] font-semibold mb-4">Price: <span className="text-black">GH₵ 200.00</span></h3>

          <div className="mb-6">
            <h4 className="text-[20px] font-semibold mb-2">Description:</h4>
            <div className="w-full h-[200px] border border-gray-300 rounded-lg p-4 text-gray-700 overflow-auto">
              Random text description of the job. This can be expanded to include more details about the responsibilities, requirements, and company background.
            </div>
          </div>

          <div>
            <h4 className="text-[20px] font-semibold mb-2">Skills Required:</h4>
            <div className="w-full h-[200px] border border-gray-300 rounded-lg p-4 text-gray-700 overflow-auto">
              List of skills such as communication, teamwork, programming, or design-related skills.
            </div>
          </div>
        </section>

        {/* Apply Now Section */}
        <section className="mb-10">
          <h2 className="text-[30px] font-bold mb-6">Apply Now</h2>

          <div className="mb-6">
            <label className="block text-[20px] font-semibold mb-2">Upload CV:</label>
            <div className="flex items-center gap-4">
              <Button
                variant="bordered"
                className="text-blue-500 border-blue-500 hover:bg-blue-100"
              >
                <Icon icon="mdi:upload" className="text-xl mr-2" /> Upload
              </Button>
              <span className="text-gray-600">No file selected</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[20px] font-semibold mb-2">Cover/Introductory Letter:</label>
            <Textarea
              placeholder="Write your cover letter here..."
              minRows={5}
              className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* Submit Proposal Button */}
        <div className="flex justify-center">
          <Button
            color="primary"
            className="bg-blue-600 text-white hover:bg-blue-700 w-[800px] h-12 py-3 text-lg font-bold"
          >
            Submit Proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplyingToJobs;
