// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Button,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   User
// } from "@nextui-org/react";
// import { useSession, signOut } from "next-auth/react";
// import { Icon } from "@iconify/react";

// const Sidebar = () => {
//   const { data: session } = useSession(); 

//   const menuItems = [
//     { id: 1, name: "Dashboard", icon: "mdi:view-dashboard-outline", href: "/desk/dashboard" },
//     { id: 2, name: "Job List", icon: "mdi:briefcase-outline", href: "/desk/job_list" },
//     { id: 3, name: "Applicants", icon: "mdi:message-outline", href: "/desk/applicants" },
//   ];
  

//   return (
//     <div className="bg-black text-white min-h-screen w-[250px] shadow-md">
//       {/* Logo Section */}
//       <div className="flex items-center justify-center h-[80px] pr-28 border-b border-gray-700">   
//             <Image
//                 src="/linkerex/whitelin.png"
//                 alt="Linkerex Logo"
//                 width={144}
//                 height={30}
//                 className="cursor-pointer"
//             />
//       </div>

//       {/* Additional Actions */}
//       <div className="mt-2 p-3 pl-5  rounded-lg">
      
//         {session?.user ? (
//           <Dropdown placement="bottom-start">
//             <DropdownTrigger>
//               <User
//                 as="button"
//                 avatarProps={{ src: "/linkerex/user1.png" }}
//                 className="transition-transform"
//                 description={`${session.user.account_type}`}
//                 name={session.user.username}
//               />
//             </DropdownTrigger>
//             <DropdownMenu aria-label="User Actions" variant="flat">
//               <DropdownItem key="profile" className="h-14 gap-2">
//                 <p className="font-bold">Signed in as</p>
//                 <p className="font-bold">{session.user.email}</p>
//               </DropdownItem>
//               <DropdownItem key="home" onClick={() => (window.location.href = "/")}>
//                 Home
//               </DropdownItem>
//               <DropdownItem key="company_details" onClick={() => (window.location.href = "/desk/company_details")}>
//                 Company Details
//               </DropdownItem>
//               <DropdownItem key="logout" color="danger" onClick={() => signOut({ callbackUrl: "/" })}>
//                 Log Out
//               </DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//         ) : (
//           <button onClick={() => (window.location.href = "/login")}>Log In</button>
//         )}
//       </div>

//       {/* Menu Items */}
//       <nav className="flex flex-col ">
//         {menuItems.map((item) => (
//           <a
//             key={item.id}
//             href={item.href}
//             className="flex items-center px-6 py-3 text-gray-300 hover:text-white hover:bg-[#2f71c7] transition-colors duration-200"
//           >
//             <Icon icon={item.icon} className="text-xl mr-3" />
//             <span>{item.name}</span>
//           </a>
//         ))}
//       </nav>


//     </div>
//   );
// };

// export default Sidebar;







"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const menuItems = [
    { id: 1, name: "Dashboard", icon: "mdi:view-dashboard-outline", href: "/desk/dashboard" },
    { id: 2, name: "Job List", icon: "mdi:briefcase-outline", href: "/desk/job_list" },
    { id: 3, name: "Applicants", icon: "mdi:message-outline", href: "/desk/applicants" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#2f71c7] text-white rounded-lg lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Icon icon={isSidebarOpen ? "mdi:close" : "mdi:menu"} className="text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-black text-white min-h-screen w-[250px] shadow-md fixed lg:relative transform transition-transform duration-200 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-[80px] pr-28 border-b border-gray-700">
          <Image
            src="/linkerex/whitelin.png"
            alt="Linkerex Logo"
            width={144}
            height={30}
            className="cursor-pointer"
          />
        </div>

        {/* Additional Actions */}
        <div className="mt-2 p-3 pl-5 rounded-lg">
          {session?.user ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{ src: "/linkerex/user1.png" }}
                  className="transition-transform"
                  description={`${session.user.account_type}`}
                  name={session.user.username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{session.user.email}</p>
                </DropdownItem>
                <DropdownItem key="home" onClick={() => (window.location.href = "/")}>
                  Home
                </DropdownItem>
                <DropdownItem
                  key="company_details"
                  onClick={() => (window.location.href = "/desk/company_details")}
                >
                  Company Details
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => signOut({ callbackUrl: "/" })}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <button onClick={() => (window.location.href = "/login")}>Log In</button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-300 hover:text-white hover:bg-[#2f71c7] transition-colors duration-200"
            >
              <Icon icon={item.icon} className="text-xl mr-3" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay for Mobile View */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;