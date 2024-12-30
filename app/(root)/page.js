// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import CatCards from "../components/(elements)/CatCards";

// export default function Home() {
//   const jobsData = [
//     { acronym: "DV", title: "Delivery Driver", color: "bg-gray-700" },
//     { acronym: "AC", title: "Accountant", color: "bg-yellow-400" },
//     { acronym: "FD", title: "Front-End Developer", color: "bg-blue-500" },
//     { acronym: "BD", title: "Back-End Developer", color: "bg-blue-600" },
//     { acronym: "TC", title: "Tax Consultant", color: "bg-yellow-400" },
//     { acronym: "BK", title: "Banker", color: "bg-green-500" },
//     { acronym: "LO", title: "Loan Officer", color: "bg-teal-500" },
//     { acronym: "MM", title: "Marketing Manager", color: "bg-indigo-400" },
//     { acronym: "SE", title: "Sales Executive", color: "bg-indigo-500" },

//     { acronym: "BK", title: "Banker", color: "bg-green-500" },
//     { acronym: "LO", title: "Loan Officer", color: "bg-teal-500" },
//     { acronym: "MM", title: "Marketing Manager", color: "bg-indigo-400" },
 
//   ];

//   return (
//     <div
//     className="relative bg-center bg-cover bg-no-repeat w-full h-full flex items-center justify-center "
//     style={{
//       backgroundImage: "url('/linkerex/mountainbg.jpg')",
//     }}
//     >
//       <section className=" py-10 w-full">
//       <div className="container mx-auto  pb-20 flex flex-col justify-center align-middle ">
//         {/* Job Categories Header with Looping Animation */}
//         <motion.div
//           className="mb-6 text-center "
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ y: [0, -10, 0], opacity: 1 }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "easeInOut",
//           }}
//         >
//           <h3 className="text-[100px] font-bold text-white pl-5">Job Categories</h3>
//         </motion.div>

//         {/* Job Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {jobsData.map((job, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <CatCards
//                 acronym={job.acronym}
//                 title={job.title}
//                 color={job.color}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//     </div>
//   );
// }





"use client";
import React from "react";
import { motion } from "framer-motion";
import CatCards from "../components/(elements)/CatCards";

export default function Home() {
  const jobsData = [
    { acronym: "DV", title: "Delivery Driver", color: "bg-gray-700" },
    { acronym: "AC", title: "Accountant", color: "bg-yellow-400" },
    { acronym: "FD", title: "Front-End Developer", color: "bg-blue-500" },
    { acronym: "BD", title: "Back-End Developer", color: "bg-blue-600" },
    { acronym: "TC", title: "Tax Consultant", color: "bg-yellow-400" },
    { acronym: "BK", title: "Banker", color: "bg-green-500" },
    { acronym: "LO", title: "Loan Officer", color: "bg-teal-500" },
    { acronym: "MM", title: "Marketing Manager", color: "bg-indigo-400" },
    { acronym: "SE", title: "Sales Executive", color: "bg-indigo-500" },

    { acronym: "BK", title: "Banker", color: "bg-green-500" },
    { acronym: "LO", title: "Loan Officer", color: "bg-teal-500" },
    { acronym: "MM", title: "Marketing Manager", color: "bg-indigo-400" },
 
  ];

  return (
    <section className="bg-[#18181b] py-10 w-full">
      <div className="container mx-auto  pb-20 flex flex-col justify-center align-middle">
        {/* Job Categories Header with Looping Animation */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <h3 className="text-[100px] font-bold text-white pl-5">Job Categories</h3>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobsData.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CatCards
                acronym={job.acronym}
                title={job.title}
                color={job.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}