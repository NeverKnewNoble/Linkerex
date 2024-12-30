// "use client";

// import Link from "next/link";
// import React from "react";
// import Image from "next/image";
// import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   User,
// } from "@nextui-org/react";

// // Temporary variable for testing responsiveness
// let Logged = "Offline";

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

// export default function App() {
//   return (
//     <Navbar
//       position="static"
//       className="bg-white shadow-md"
//       style={{ backgroundColor: "black" }}
//     >
//       <NavbarBrand>
//         <Link href={"/#home"}>
//           <Image
//             src="/linkerex/whitelin.png"
//             alt="Linkerex Logo"
//             width={144}
//             height={30}
//             className="cursor-pointer"
//           />
//         </Link>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link className="text-white hover:text-[#2f71c7]" href={"/#home"}>
//             HOME
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link className="text-white hover:text-[#2f71c7]" href={"/jobs"}>
//             JOBS
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link className="text-white hover:text-[#2f71c7]" href="/#about">
//             ABOUT US
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         {Logged === "Online" ? (
//           <Dropdown placement="bottom-start">
//             <DropdownTrigger>
//               <User
//                 as="button"
//                 avatarProps={{
//                   isBordered: true,
//                   src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//                 }}
//                 className="transition-transform"
//                 description="@tonyreichert"
//                 name="Tony Reichert"
//               />
//             </DropdownTrigger>
//             <DropdownMenu aria-label="User Actions" variant="flat">
//               <DropdownItem key="profile" className="h-14 gap-2">
//                 <p className="font-bold">Signed in as</p>
//                 <p className="font-bold">@tonyreichert</p>
//               </DropdownItem>
//               <DropdownItem
//                 key="user"
//                 onClick={() => (window.location.href = "/info")}
//               >
//                 User
//               </DropdownItem>
//               <DropdownItem
//                 key="applied_jobs"
//                 onClick={() => (window.location.href = "/applied_jobs")}
//               >
//                 Applied Jobs
//               </DropdownItem>
//               <DropdownItem
//                 key="settings"
//                 onClick={() => (window.location.href = "/")}
//               >
//                 Settings
//               </DropdownItem>
//               <DropdownItem key="logout" color="danger">
//                 Log Out
//               </DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//         ) : Logged === "Offline" ? (
//           <>
//             <NavbarItem className="hidden lg:flex">
//               <Link href={"/login"}>
//                 <Button
//                   variant="flat"
//                   className="text-white border bg-black hover:bg-[#2f71c7] hover:text-white font-semibold hover:border-[#2f71c7]"
//                 >
//                   LOGIN
//                 </Button>
//               </Link>
//             </NavbarItem>
//             <NavbarItem>
//               <Link href={"/sign_up"}>
//                 <Button
//                   color="primary"
//                   variant="flat"
//                   className="border hover:text-white hover:bg-black bg-[#18181b] text-white font-semibold"
//                 >
//                   SIGN UP
//                 </Button>
//               </Link>
//             </NavbarItem>
//           </>
//         ) : (
//           console.log("Status of user unknown!!!")
//         )}
//       </NavbarContent>
//     </Navbar>
//   );
// }










"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const { data: session } = useSession(); // Use the session hook to get the user session

  return (
    <Navbar position="static" className="bg-white shadow-md" style={{ backgroundColor: "black" }}>
      <NavbarBrand>
        <Link href={"/#home"}>
          <Image src="/linkerex/whitelin.png" alt="Linkerex Logo" width={144} height={30} className="cursor-pointer" />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-white hover:text-[#2f71c7]" href={"/#home"}>HOME</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white hover:text-[#2f71c7]" href={"/jobs"}>JOBS</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white hover:text-[#2f71c7]" href="/#about">ABOUT US</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          // If the user is logged in, display the Dropdown for user actions
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
              <DropdownItem key="user" onClick={() => (window.location.href = "/info")}>User</DropdownItem>
              <DropdownItem key="applied_jobs" onClick={() => (window.location.href = "/applied_jobs")}>Applied Jobs</DropdownItem>
              <DropdownItem key="settings" onClick={() => (window.location.href = "/")}>Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => signOut({ callbackUrl: "/" })}>Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          // If the user is logged out, show login and signup buttons
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href={"/login"}>
                <Button variant="flat" className="text-white border bg-black hover:bg-[#2f71c7] hover:text-white font-semibold hover:border-[#2f71c7]">
                  LOGIN
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={"/sign_up"}>
                <Button color="primary" variant="flat" className="border hover:text-white hover:bg-black bg-[#18181b] text-white font-semibold">
                  SIGN UP
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
