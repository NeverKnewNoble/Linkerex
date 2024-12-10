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
  Avatar,
  User,
} from "@nextui-org/react";






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
  return (
    <Navbar
      position="static"
      className="bg-white shadow-md" // Add Tailwind classes
      style={{ backgroundColor: "black" }} // Inline style for fallback
    >
      <NavbarBrand>
        <Link href={"/#home"}>
        <Image
            src="/linkerex/whitelin.png"
            alt="Linkerex Logo"
            width={144}
            height={30}
            className="cursor-pointer"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" className="text-white hover:text-[#2f71c7]" href={"/#home"}>
            HOME
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="text-white hover:text-[#2f71c7]" href={"/jobs"}>
            JOBS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="text-white hover:text-[#2f71c7]" href="/#about">
            ABOUT US
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href={"/login"}>
            <Button variant="flat" className="text-white border bg-black hover:bg-[#2f71c7] hover:text-white font-semibold hover:border-[#2f71c7]">
              LOGIN
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={"/sign_up"}>
            <Button color="primary" href="#" variant="flat" className="border hover:text-white hover:bg-black bg-[#18181b] text-white font-semibold">
              SIGN UP
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
