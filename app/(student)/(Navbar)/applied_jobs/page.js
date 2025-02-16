// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Badge,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Alert,
// } from "@nextui-org/react";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// const AppliedJobs = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]); // State to store merged applied jobs data
//   const { data: session } = useSession(); // Get the logged-in user session
//   const [alert, setAlert] = useState(null);

//   // Fetch jobs and applied jobs data
//   const fetchData = async () => {
//     try {
//       // Fetch all jobs
//       const jobsResponse = await axios.get("http://localhost:5000/api/jobs");
//       const jobs = jobsResponse.data;

//       // Fetch applied jobs
//       const appliedResponse = await axios.get("http://localhost:5000/api/applied");
//       const appliedJobs = appliedResponse.data;

//       // Filter applied jobs to show only those applied by the logged-in user and have "studentAction": "Submitted"
//       const userAppliedJobs = appliedJobs.filter(
//         (job) => job.studentId === session?.user?.id && job.studentAction === "Submitted"
//       );

//       // Merge data from both APIs
//       const mergedJobs = userAppliedJobs.map((appliedJob) => {
//         const jobDetails = jobs.find((job) => job._id === appliedJob.jobId);
//         return {
//           ...appliedJob, // Include applied job details
//           appliedId: appliedJob._id, // Preserve the applied job's _id
//           ...jobDetails, // Include job details
//         };
//       });

//       setAppliedJobs(mergedJobs);
//     } catch (err) {
//       console.error("Failed to fetch data:", err.message);
//     }
//   };

//   // Fetch data on component mount or when session changes
//   useEffect(() => {
//     if (session?.user?.id) {
//       fetchData();
//     }
//   }, [session]);

//   // Get status badge styling
//   const getStatusBadge = (status) => {
//     let bgColor = "";
//     let textColor = "";

//     switch (status) {
//       case "Pending":
//         bgColor = "bg-yellow-100";
//         textColor = "text-yellow-800";
//         break;
//       case "Interview Scheduled":
//         bgColor = "bg-blue-100";
//         textColor = "text-blue-800";
//         break;
//       case "Accepted":
//         bgColor = "bg-green-100";
//         textColor = "text-green-800";
//         break;
//       case "Rejected":
//         bgColor = "bg-red-100";
//         textColor = "text-red-800";
//         break;
//       default:
//         bgColor = "bg-gray-100";
//         textColor = "text-gray-800";
//     }

//     return (
//       <div
//         className={`py-2 px-4 rounded-full font-semibold ${bgColor} ${textColor}`}
//       >
//         {status}
//       </div>
//     );
//   };

//   // **Copy Job Link
//   const copyTextToClipboard = (jobId) => {
//     const jobLink = `http://localhost:3000/jobs/applying_to_job?id=${jobId}`;
//     navigator.clipboard
//       .writeText(jobLink)
//       .then(() => {
//         console.log("Copied To Clipboard");
//         // Show success alert
//         setAlert({
//           color: "success",
//           message: "Copied To Clipboard",
//         });
//       })
//       .catch((err) => {
//         console.error("Failed to copy to clipboard", err);
//         // Show error alert
//         setAlert({
//           color: "danger",
//           message: "Failed to copy to clipboard",
//         });
//       });
//   };

//   // **Update The Applied Job Information
//   const withdrawUpdate = async (appliedId) => {
//     try {
//       console.log("Withdrawing application for ID:", appliedId); // Debugging log
  
//       const response = await axios.put(`http://localhost:5000/api/applied/${appliedId}/withdraw`, {
//         studentAction: "Withdrawn", // ✅ Ensure this is sent
//       });
  
//       console.log("Server response:", response.data); // Debugging log
  
//       if (response.status === 200) {
//         setAlert({
//           color: "success",
//           message: "Submission Withdrawn Successfully!",
//         });
  
//         // ✅ Ensure fresh data is fetched
//         fetchData();
//       }
//     } catch (error) {
//       console.error("Failed to Withdraw The Submission:", error);
//       setAlert({
//         color: "danger",
//         message: error.response?.data?.message || "Failed to Withdraw The Submission",
//       });
//     }
//   };
  
  

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-white py-10"
//       style={{
//         backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
//       }}
//     >
//       {/* Alert Popup */}
//       {alert && (
//         <div className="fixed top-14 right-4 z-50">
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

//       <div className="container mx-auto px-6">
//         {/* Page Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white">My Applied Jobs</h1>
//           <p className="text-white mt-2">
//             Track the status of all your applications in one place.
//           </p>
//         </div>

//         {/* Table Container */}
//         <div className="bg-white rounded-lg p-6">
//           <Table
//             aria-label="Applied Jobs Table"
//             lined
//             headerLined
//             shadow={false}
//             className="rounded-lg overflow-hidden"
//           >
//             <TableHeader>
//               <TableColumn className="font-semibold text-white">Title</TableColumn>
//               <TableColumn className="font-semibold text-white">Company</TableColumn>
//               <TableColumn className="font-semibold text-white">Job Type</TableColumn>
//               <TableColumn className="font-semibold text-white">
//                 Application Status
//               </TableColumn>
//               <TableColumn className="font-semibold text-white">Actions</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {appliedJobs.map((job) => (
//                 <TableRow
//                   key={job.appliedId} // Use job.appliedId as the unique key
//                   className="hover:bg-gray-700 transition-all duration-200 hover:text-white"
//                 >
//                   <TableCell className="font-semibold">{job.title}</TableCell>
//                   <TableCell>{job.company}</TableCell>
//                   <TableCell>
//                     <Badge>{job.jobType}</Badge>
//                   </TableCell>
//                   <TableCell>{getStatusBadge(job.status)}</TableCell>
//                   <TableCell>
//                     <Dropdown>
//                       <DropdownTrigger>
//                         <Button
//                           isIconOnly
//                           variant="flat"
//                           className="text-black bg-gray-100 hover:bg-black hover:text-white border-black border-1"
//                         >
//                           +
//                         </Button>
//                       </DropdownTrigger>
//                       <DropdownMenu aria-label="Actions">
//                         <DropdownItem key="copy" onPress={() => copyTextToClipboard(job.jobId)}>
//                           Copy Job Link
//                         </DropdownItem>
//                         <DropdownItem key="edit" showDivider>
//                           <Link
//                             href={{
//                               pathname: "/applied_jobs/edit_proposal",
//                               query: { id: job.jobId, userId: session?.user?.id, appliedId: job.appliedId }, // ✅ Include appliedId
//                             }}
//                           >
//                             Edit Proposal
//                           </Link>
//                         </DropdownItem>
//                         <DropdownItem
//                           key="delete"
//                           onPress={() => withdrawUpdate(job.appliedId)}
//                           color="danger"
//                         >
//                           Withdraw Application
//                         </DropdownItem>
//                       </DropdownMenu>
//                     </Dropdown>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppliedJobs;











"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Alert,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]); // State to store merged applied jobs data
  const { data: session } = useSession(); // Get the logged-in user session
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  // Fetch jobs and applied jobs data
  const fetchData = async () => {
    try {
      setLoading(true); // ✅ Show loading while fetching
      // Fetch all jobs
      const jobsResponse = await axios.get("http://localhost:5000/api/jobs");
      const jobs = jobsResponse.data;

      // Fetch applied jobs
      const appliedResponse = await axios.get("http://localhost:5000/api/applied");
      const appliedJobs = appliedResponse.data;

      // Filter applied jobs to show only those applied by the logged-in user and have "studentAction": "Submitted"
      const userAppliedJobs = appliedJobs.filter(
        (job) => job.studentId === session?.user?.id && job.studentAction === "Submitted"
      );

      // Merge data from both APIs
      const mergedJobs = userAppliedJobs.map((appliedJob) => {
        const jobDetails = jobs.find((job) => job._id === appliedJob.jobId);
        return {
          ...appliedJob, // Include applied job details
          appliedId: appliedJob._id, // Preserve the applied job's _id
          ...jobDetails, // Include job details
        };
      });

      setAppliedJobs(mergedJobs);
    } catch (err) {
      console.error("Failed to fetch data:", err.message);
    } finally {
      setLoading(false); // ✅ Stop loading after fetching
    }
  };

  // Fetch data on component mount or when session changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session]);

  // Get status badge styling
  const getStatusBadge = (status) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        break;
      case "Interview Scheduled":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        break;
      case "Accepted":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "Rejected":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
    }

    return (
      <div className={`py-2 px-4 rounded-full font-semibold ${bgColor} ${textColor}`}>
        {status}
      </div>
    );
  };

  // **Copy Job Link
  const copyTextToClipboard = (jobId) => {
    const jobLink = `http://localhost:3000/jobs/applying_to_job?id=${jobId}`;
    navigator.clipboard
      .writeText(jobLink)
      .then(() => {
        console.log("Copied To Clipboard");
        // Show success alert
        setAlert({
          color: "success",
          message: "Copied To Clipboard",
        });
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard", err);
        // Show error alert
        setAlert({
          color: "danger",
          message: "Failed to copy to clipboard",
        });
      });
  };

  // **Update The Applied Job Information
  const withdrawUpdate = async (appliedId) => {
    try {
      console.log("Withdrawing application for ID:", appliedId); // Debugging log

      const response = await axios.put(
        `http://localhost:5000/api/applied/${appliedId}/withdraw`,
        {
          studentAction: "Withdrawn", // ✅ Ensure this is sent
        }
      );

      console.log("Server response:", response.data); // Debugging log

      if (response.status === 200) {
        setAlert({
          color: "success",
          message: "Submission Withdrawn Successfully!",
        });

        // ✅ Ensure fresh data is fetched
        fetchData();
      }
    } catch (error) {
      console.error("Failed to Withdraw The Submission:", error);
      setAlert({
        color: "danger",
        message: error.response?.data?.message || "Failed to Withdraw The Submission",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-white py-10"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
      }}
    >
      {/* Alert Popup */}
      {alert && (
        <div className="fixed top-14 right-4 z-50">
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

      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Applied Jobs</h1>
          <p className="text-white mt-2">Track the status of all your applications in one place.</p>
        </div>

        {/* Show Loading State */}
        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : appliedJobs.length === 0 ? (
          // ✅ Show "No Applied Jobs" Message
          <div className="text-center bg-white text-black text-[50px] py-[200px] rounded-lg mt-10 font-semibold">
            No Applied Jobs Found.
          </div>
        ) : (
          // ✅ Render Table Only If There Are Applied Jobs
          <div className="bg-white rounded-lg p-6">
            <Table
              aria-label="Applied Jobs Table"
              lined
              headerLined
              shadow={false}
              className="rounded-lg overflow-hidden"
            >
              <TableHeader>
                <TableColumn className="font-semibold text-white">Title</TableColumn>
                <TableColumn className="font-semibold text-white">Company</TableColumn>
                <TableColumn className="font-semibold text-white">Job Type</TableColumn>
                <TableColumn className="font-semibold text-white">Application Status</TableColumn>
                <TableColumn className="font-semibold text-white">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {appliedJobs.map((job) => (
                  <TableRow
                    key={job.appliedId} // Use job.appliedId as the unique key
                    className="hover:bg-gray-700 transition-all duration-200 hover:text-white"
                  >
                    <TableCell className="font-semibold">{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>
                      <Badge>{job.jobType}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly variant="flat" className="text-black bg-gray-100">
                            +
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Actions">
                          <DropdownItem key="copy" onPress={() => copyTextToClipboard(job.jobId)}>
                            Copy Job Link
                          </DropdownItem>
                          <DropdownItem key="edit" showDivider>
                            <Link href={`/applied_jobs/edit_proposal?id=${job.jobId}`}>
                              Edit Proposal
                            </Link>
                          </DropdownItem>
                          <DropdownItem key="delete" onPress={() => withdrawUpdate(job.appliedId)} color="danger">
                            Withdraw Application
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
