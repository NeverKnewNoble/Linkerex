// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { Button, Textarea, Alert, Card, Progress, Input } from "@nextui-org/react";
// import { Icon } from "@iconify/react";
// import Loading from "../../../../loading";
// import { useSession } from "next-auth/react";

// const EditingProposal = () => {
//   const searchParams = useSearchParams();
//   const jobId = searchParams.get("id"); // Get the job ID from the URL
//   const userId = searchParams.get("userId"); // Get the user ID from the URL
//   const [jobDetails, setJobDetails] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [coverLetter, setCoverLetter] = useState("");
//   const { data: session } = useSession();
//   const [isLoading, setIsLoading] = useState(true); // Track loading state
//   const [appliedData, setAppliedData] = useState(null);
//   const [alert, setAlert] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // **Fetch job details and applied job data
//   useEffect(() => {
//     if (jobId && session?.user?.id) {
//       const fetchData = async () => {
//         try {
//           setIsLoading(true); // Start loading

//           // Fetch job details
//           const jobResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
//           setJobDetails(jobResponse.data);

//           // Fetch applied job data for the current user and job
//           const appliedResponse = await axios.get(
//             `http://localhost:5000/api/applied?jobId=${jobId}&studentId=${session.user.id}`
//           );
//           const appliedJob = appliedResponse.data[0]; // Assuming data[0] is the correct data, handle empty arrays

//           if (appliedJob) {
//             setAppliedData(appliedJob);
//             setCoverLetter(appliedJob.applicationDetails?.coverLetter || "");
//           } else {
//             setAlert({
//               color: "danger",
//               message: "No application found for this job.",
//             });
//           }
//         } catch (err) {
//           console.error("Failed to fetch data:", err.message);
//           setAlert({
//             color: "danger",
//             message: "Failed to fetch data. Please try again later.",
//           });
//         } finally {
//           setIsLoading(false); // Stop loading
//         }
//       };

//       fetchData();
//     }
//   }, [jobId, session]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleCoverLetterChange = (event) => {
//     setCoverLetter(event.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!coverLetter || !selectedFile) {
//       setAlert({ color: "danger", message: "Please fill out all fields." });
//       return;
//     }
  
//     setIsSubmitted(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile); // Append the file
//       formData.append("coverLetter", coverLetter); // Append the cover letter
  
//       const response = await axios.put(
//         `http://localhost:5000/api/applied/${appliedData._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         setAlert({ color: "success", message: "Proposal updated successfully!" });
//       } else {
//         setAlert({ color: "danger", message: "Failed to update proposal. Please try again." });
//       }
//     } catch (err) {
//       console.error("Failed to update proposal:", err.message);
//       setAlert({ color: "danger", message: "Failed to update proposal. Please try again." });
//     } finally {
//       setIsSubmitted(false);
//     }
//   };

//   // ? Add a confirmation dialog before withdrawing the submission
//   if (!jobId || !userId) {
//     return (
//       <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4">
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">Invalid Request</h2>
//           <p className="text-gray-600">Job ID or user session is missing.</p>
//         </div>
//       </div>
//     );
//   }

//   // **Render the UI
//   if (isLoading) {
//     return <Loading />;
//   }

//   // ? Add a confirmation dialog before withdrawing the submission
//   if (!jobDetails || !appliedData) {
//     return (
//       <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4">
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
//           <p className="text-gray-600">
//             {alert ? alert.message : "Unable to load job details or application data."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
//       style={{
//         backgroundImage: "url('/linkerex/inf.jpg')",
//       }}
//     >
//       {/* Alert Popup */}
//       {alert && (
//         <div className="fixed top-4 right-4 z-50">
//           <Alert
//             color={alert.color}
//             variant="flat"
//             onClose={() => setAlert(null)}
//             className="shadow-lg"
//           >
//             {alert.message}
//           </Alert>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
//         {/* Job Details Section */}
//         <Card className="mb-8 p-6">
//           <h2 className="text-3xl font-bold mb-4">{jobDetails.title}</h2>
//           <div className="flex items-center space-x-4 mb-4">
//             <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
//               {jobDetails.jobType}
//             </span>
//             {(jobDetails.jobType === "Full-Time" || jobDetails.jobType === "Part-Time") && (
//               <span className="text-sm text-gray-200">GH₵ {jobDetails.amount}</span>
//             )}
//           </div>
//           <div className="space-y-4">
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Description</h4>
//               <p className="text-gray-200 pl-5">{jobDetails.description}</p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Requirements</h4>
//               <p className="text-gray-200 pl-5">{jobDetails.requirements}</p>
//             </div>
//           </div>
//         </Card>

//         {/* Apply Now Section */}
//         <Card className="p-6">
//           <h2 className="text-2xl font-bold mb-6">Edit Proposal</h2>

//           {/* File Upload Section */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">Upload CV</label>
//             <div className="flex items-center gap-4">
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <Button
//                   variant="bordered"
//                   className="text-blue-500 border-blue-500 hover:bg-blue-100"
//                   as="span"
//                   aria-label="Upload CV"
//                 >
//                   <Icon icon="mdi:upload" className="text-xl mr-2" /> Upload
//                 </Button>
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//               <span className="text-white">
//                 {selectedFile ? selectedFile.name : appliedData?.applicationDetails?.uploadedFile || "No file uploaded"}
//               </span>
//             </div>
//             {uploadProgress > 0 && uploadProgress < 100 && (
//               <Progress value={uploadProgress} className="mt-2" />
//             )}
//           </div>

//           {/* Cover Letter Section */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">Cover Letter</label>
//             <Textarea
//               placeholder="Write your cover letter here..."
//               minRows={5}
//               className="w-full"
//               value={coverLetter}
//               onChange={handleCoverLetterChange}
//             />
//           </div>

//           {/* Submit Proposal Button */}
//           <div className="flex justify-center">
//             <Button
//               color="primary"
//               className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold"
//               onPress={handleSubmit}
//             >
//               {isSubmitted ? "Updating..." : "Update Proposal"}
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default EditingProposal;






















// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { Button, Textarea, Alert, Card, Progress, Input } from "@nextui-org/react";
// import { Icon } from "@iconify/react";
// import Loading from "../../../../loading";
// import { useSession } from "next-auth/react";

// const EditingProposal = () => {
//   const searchParams = useSearchParams();
//   const jobId = searchParams.get("id"); // Get the job ID from the URL
//   const userId = searchParams.get("userId"); // Get the user ID from the URL
//   const [jobDetails, setJobDetails] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [coverLetter, setCoverLetter] = useState("");
//   const { data: session } = useSession();
//   const [isLoading, setIsLoading] = useState(true); // Track loading state
//   const [appliedData, setAppliedData] = useState(null);
//   const [alert, setAlert] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // **Fetch job details and applied job data
//   useEffect(() => {
//     if (jobId && session?.user?.id) {
//       const fetchData = async () => {
//         try {
//           setIsLoading(true); // Start loading

//           // Fetch job details
//           const jobResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
//           setJobDetails(jobResponse.data);

//           // Fetch applied job data for the current user and job
//           const appliedResponse = await axios.get(
//             `http://localhost:5000/api/applied?jobId=${jobId}&studentId=${session.user.id}`
//           );
//           const appliedJob = appliedResponse.data[0]; // Assuming data[0] is the correct data, handle empty arrays

//           if (appliedJob) {
//             setAppliedData(appliedJob);
//             setCoverLetter(appliedJob.applicationDetails?.coverLetter || ""); // Populate cover letter
//           } else {
//             setAlert({
//               color: "danger",
//               message: "No application found for this job.",
//             });
//           }
//         } catch (err) {
//           console.error("Failed to fetch data:", err.message);
//           setAlert({
//             color: "danger",
//             message: "Failed to fetch data. Please try again later.",
//           });
//         } finally {
//           setIsLoading(false); // Stop loading
//         }
//       };

//       fetchData();
//     }
//   }, [jobId, session]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleCoverLetterChange = (event) => {
//     setCoverLetter(event.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!coverLetter) {
//       setAlert({ color: "danger", message: "Please fill out the cover letter." });
//       return;
//     }

//     setIsSubmitted(true);
//     try {
//       const formData = new FormData();
//       if (selectedFile) {
//         formData.append("file", selectedFile); // Append the file only if a new file is selected
//       }
//       formData.append("coverLetter", coverLetter); // Append the cover letter

//       const response = await axios.put(
//         `http://localhost:5000/api/applied/${appliedData._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
//           },
//         }
//       );

//       if (response.status === 200) {
//         setAlert({ color: "success", message: "Proposal updated successfully!" });
//       } else {
//         setAlert({ color: "danger", message: "Failed to update proposal. Please try again." });
//       }
//     } catch (err) {
//       console.error("Failed to update proposal:", err.message);
//       setAlert({ color: "danger", message: "Failed to update proposal. Please try again." });
//     } finally {
//       setIsSubmitted(false);
//     }
//   };

//   // ? Add a confirmation dialog before withdrawing the submission
//   if (!jobId || !userId) {
//     return (
//       <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4">
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">Invalid Request</h2>
//           <p className="text-gray-600">Job ID or user session is missing.</p>
//         </div>
//       </div>
//     );
//   }

//   // **Render the UI
//   if (isLoading) {
//     return <Loading />;
//   }

//   // ? Add a confirmation dialog before withdrawing the submission
//   if (!jobDetails || !appliedData) {
//     return (
//       <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4">
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
//           <p className="text-gray-600">
//             {alert ? alert.message : "Unable to load job details or application data."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Extract the file name from the uploaded file path
//   const uploadedFileName = appliedData?.applicationDetails?.uploadedFile
//     ? appliedData.applicationDetails.uploadedFile.split("/").pop() // Extract file name from path
//     : "No file uploaded";

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
//       style={{
//         backgroundImage: "url('/linkerex/inf.jpg')",
//       }}
//     >
//       {/* Alert Popup */}
//       {alert && (
//         <div className="fixed top-4 right-4 z-50">
//           <Alert
//             color={alert.color}
//             variant="flat"
//             onClose={() => setAlert(null)}
//             className="shadow-lg"
//           >
//             {alert.message}
//           </Alert>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
//         {/* Job Details Section */}
//         <Card className="mb-8 p-6">
//           <h2 className="text-3xl font-bold mb-4">{jobDetails.title}</h2>
//           <div className="flex items-center space-x-4 mb-4">
//             <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
//               {jobDetails.jobType}
//             </span>
//             {(jobDetails.jobType === "Full-Time" || jobDetails.jobType === "Part-Time") && (
//               <span className="text-sm text-gray-200">GH₵ {jobDetails.amount}</span>
//             )}
//           </div>
//           <div className="space-y-4">
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Description</h4>
//               <p className="text-gray-200 pl-5">{jobDetails.description}</p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Requirements</h4>
//               <p className="text-gray-200 pl-5">{jobDetails.requirements}</p>
//             </div>
//           </div>
//         </Card>

//         {/* Apply Now Section */}
//         <Card className="p-6">
//           <h2 className="text-2xl font-bold mb-6">Edit Proposal</h2>

//           {/* File Upload Section */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">Upload CV</label>
//             <div className="flex items-center gap-4">
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <Button
//                   variant="bordered"
//                   className="text-blue-500 border-blue-500 hover:bg-blue-100"
//                   as="span"
//                   aria-label="Upload CV"
//                 >
//                   <Icon icon="mdi:upload" className="text-xl mr-2" /> Upload
//                 </Button>
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//               <span className="text-white">
//                 {selectedFile ? selectedFile.name : uploadedFileName}
//               </span>
//             </div>
//             {uploadProgress > 0 && uploadProgress < 100 && (
//               <Progress value={uploadProgress} className="mt-2" />
//             )}
//           </div>

//           {/* Cover Letter Section */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">Cover Letter</label>
//             <Textarea
//               placeholder="Write your cover letter here..."
//               minRows={5}
//               className="w-full"
//               value={coverLetter} // Use the coverLetter state directly
//               onChange={handleCoverLetterChange}
//             />
//           </div>

//           {/* Submit Proposal Button */}
//           <div className="flex justify-center">
//             <Button
//               color="primary"
//               className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold"
//               onPress={handleSubmit}
//             >
//               {isSubmitted ? "Updating..." : "Update Proposal"}
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default EditingProposal;













"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button, Textarea, Alert, Card, Progress, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Loading from "../../../../loading";
import { useSession } from "next-auth/react";

const EditingProposal = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id"); // Get the job ID from the URL
  const userId = searchParams.get("userId"); // Get the user ID from the URL
  const appliedId = searchParams.get("appliedId"); // Get the applied ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [appliedData, setAppliedData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // **Fetch job details and applied job data
  useEffect(() => {
    if (jobId && session?.user?.id && appliedId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // Start loading

          // Fetch job details
          const jobResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
          setJobDetails(jobResponse.data);

          // Fetch applied job data using the appliedId
          const appliedResponse = await axios.get(
            `http://localhost:5000/api/applied/${appliedId}`
          );
          const appliedJob = appliedResponse.data;

          if (appliedJob) {
            setAppliedData(appliedJob);
            setCoverLetter(appliedJob.applicationDetails?.coverLetter || ""); // Populate cover letter
          } else {
            setAlert({
              color: "danger",
              message: "No application found for this job.",
            });
          }
        } catch (err) {
          console.error("Failed to fetch data:", err.message);
          setAlert({
            color: "danger",
            message: "Failed to fetch data. Please try again later.",
          });
        } finally {
          setIsLoading(false); // Stop loading
        }
      };

      fetchData();
    }
  }, [jobId, session, appliedId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.value);
  };

  const handleSubmit = async () => {
    if (!coverLetter) {
      setAlert({ color: "danger", message: "Please fill out the cover letter." });
      return;
    }

    setIsSubmitted(true);
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile); // Append the file only if a new file is selected
      }
      formData.append("coverLetter", coverLetter); // Append the cover letter

      const response = await axios.put(
        `http://localhost:5000/api/applied/${appliedData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      if (response.status === 200) {
        setAlert({ color: "success", message: "Proposal updated successfully!" });
      } else {
        setAlert({ color: "danger", message: "Failed to update proposal. Please try again." });
      }
    } catch (err) {
      console.error("Failed to update proposal:", err.message);
      setAlert({ color: "danger", message: "Failed to update proposal. Please try again." });
    } finally {
      setIsSubmitted(false);
    }
  };

  // ? Add a confirmation dialog before withdrawing the submission
  if (!jobId || !userId || !appliedId) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Request</h2>
          <p className="text-gray-600">Job ID, user session, or applied ID is missing.</p>
        </div>
      </div>
    );
  }

  // **Render the UI
  if (isLoading) {
    return <Loading />;
  }

  // ? Add a confirmation dialog before withdrawing the submission
  if (!jobDetails || !appliedData) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
          <p className="text-gray-600">
            {alert ? alert.message : "Unable to load job details or application data."}
          </p>
        </div>
      </div>
    );
  }

  // Extract the file name from the uploaded file path
  const uploadedFileName = appliedData?.applicationDetails?.uploadedFile
    ? appliedData.applicationDetails.uploadedFile.split("/").pop() // Extract file name from path
    : "No file uploaded";

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
            color={alert.color}
            variant="flat"
            onClose={() => setAlert(null)}
            className="shadow-lg"
          >
            {alert.message}
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Job Details Section */}
        <Card className="mb-8 p-6">
          <h2 className="text-3xl font-bold mb-4">{jobDetails.title}</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
              {jobDetails.jobType}
            </span>
            {(jobDetails.jobType === "Full-Time" || jobDetails.jobType === "Part-Time") && (
              <span className="text-sm text-gray-200">GH₵ {jobDetails.amount}</span>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-gray-200 pl-5">{jobDetails.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Requirements</h4>
              <p className="text-gray-200 pl-5">{jobDetails.requirements}</p>
            </div>
          </div>
        </Card>

        {/* Apply Now Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Proposal</h2>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Upload CV</label>
            <div className="flex items-center gap-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button
                  variant="bordered"
                  className="text-blue-500 border-blue-500 hover:bg-blue-100"
                  as="span"
                  aria-label="Upload CV"
                >
                  <Icon icon="mdi:upload" className="text-xl mr-2" /> Upload
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <span className="text-white">
                {selectedFile ? selectedFile.name : uploadedFileName}
              </span>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress value={uploadProgress} className="mt-2" />
            )}
          </div>

          {/* Cover Letter Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Cover Letter</label>
            <Textarea
              placeholder="Write your cover letter here..."
              minRows={5}
              className="w-full"
              value={coverLetter} // Use the coverLetter state directly
              onChange={handleCoverLetterChange}
            />
          </div>

          {/* Submit Proposal Button */}
          <div className="flex justify-center">
            <Button
              color="primary"
              className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold"
              onPress={handleSubmit}
            >
              {isSubmitted ? "Updating..." : "Update Proposal"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditingProposal;