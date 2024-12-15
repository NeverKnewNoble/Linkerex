"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const menuItems = [
    { id: 1, name: "Dashboard", icon: "mdi:view-dashboard-outline", href: "/desk/dashboard" },
    { id: 2, name: "Job List", icon: "mdi:briefcase-outline", href: "/desk/job_list" },
    { id: 3, name: "Applicants", icon: "mdi:message-outline", href: "/desk/applicants" },
  ];
  

  return (
    <div className="bg-black text-white min-h-screen w-[250px] shadow-md">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-[80px] border-b border-gray-700">
        <Link href={"/#home"}>
            <Image
                src="/linkerex/whitelin.png"
                alt="Linkerex Logo"
                width={144}
                height={30}
                className="cursor-pointer"
            />
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-4">
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

      {/* Additional Actions */}
      <div className="mt-auto p-6">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" className="w-full text-left text-white bg-[#2f71c7] hover:bg-[#6897d5]">
              Account Actions
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account Actions">
            <DropdownItem key="logout" color="danger" >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
