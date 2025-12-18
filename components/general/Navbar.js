"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, UserCircle, LogOut, LayoutDashboard, FileText } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { href: "/#home", label: "HOME" },
    { href: "/jobs", label: "JOBS" },
    { href: "/#about", label: "ABOUT US" },
  ];

  return (
    <NextUINavbar
      position="static"
      className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50"
      maxWidth="xl"
      isBordered
    >
      {/* Logo Section */}
      <NavbarBrand className="gap-3 max-w-fit">
        <Link href="/#home" className="flex items-center gap-2">
          <Image
            src="/linkerex/whitelin.png"
            alt="Linkerex Logo"
            width={144}
            height={30}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            style={{ height: "auto" }}
            priority
          />
        </Link>
      </NavbarBrand>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {navItems.map((item) => {
          return (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Right Side Content */}
      <NavbarContent justify="end" className="gap-3">
        {session ? (
          // User dropdown when logged in
          <Dropdown placement="bottom-end" backdrop="blur">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  src: "/linkerex/user1.png",
                  size: "sm",
                  className: "ring-2 ring-primary/20",
                }}
                className="transition-transform hover:scale-105 cursor-pointer"
                description={
                  <span className="text-xs text-muted capitalize">
                    {session.user.account_type}
                  </span>
                }
                name={
                  <span className="font-semibold text-sm">
                    {session.user.username}
                  </span>
                }
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Actions"
              variant="flat"
              className="min-w-[200px]"
            >
              <DropdownItem
                key="profile"
                className="h-14 gap-2 border-b border-border"
                textValue="Profile"
              >
                <div className="flex flex-col">
                  <p className="text-xs text-muted">Signed in as</p>
                  <p className="font-semibold text-sm">{session.user.email}</p>
                </div>
              </DropdownItem>

              {/* Conditional menu items based on account type */}
              {session.user.account_type === "company" ? (
                <>
                  <DropdownItem
                    key="desk"
                    startContent={<LayoutDashboard size={16} />}
                    onClick={() => (window.location.href = "/desk/dashboard")}
                  >
                    Dashboard
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    key="profile"
                    startContent={<UserCircle size={16} />}
                    onClick={() => (window.location.href = "/info")}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="applied_jobs"
                    startContent={<FileText size={16} />}
                    onClick={() => (window.location.href = "/applied_jobs")}
                  >
                    Applied Jobs
                  </DropdownItem>
                </>
              )}

              <DropdownItem
                key="logout"
                color="danger"
                startContent={<LogOut size={16} />}
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          // Login/Signup buttons when not logged in
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                >
                  LOGIN
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Link href="/sign_up">
                <Button
                  color="primary"
                  className="font-semibold px-6"
                  variant="solid"
                >
                  SIGN UP
                </Button>
              </Link>
            </NavbarItem>

            {/* Mobile menu button */}
            <NavbarItem className="sm:hidden">
              <Button
                isIconOnly
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      {isMobileMenuOpen && !session && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg">
          <div className="flex flex-col p-4 gap-3">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  LOGIN
                </Button>
              </Link>
              <Link href="/sign_up">
                <Button
                  color="primary"
                  className="w-full font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SIGN UP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </NextUINavbar>
  );
}
