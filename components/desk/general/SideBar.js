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
import { LayoutDashboard, Briefcase, Users, Menu, X, Home, Building2, LogOut, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Menu items with lucide icons
  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/desk/dashboard",
    },
    {
      id: 2,
      name: "Job List",
      icon: Briefcase,
      href: "/desk/job_list",
    },
    {
      id: 3,
      name: "Applicants",
      icon: Users,
      href: "/desk/applicants",
    },
  ];

  // Check if a menu item is active
  const isActive = (href) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-lg lg:hidden transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-card border-r border-border min-h-screen w-[280px] shadow-xl fixed lg:relative transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-[80px] border-b border-border px-4">
          <Link href="/#home" className="flex items-center">
            <Image
              src="/linkerex/whitelin.png"
              alt="Linkerex Logo"
              width={144}
              height={30}
              className="cursor-pointer hover:opacity-80 transition-opacity brightness-0 invert"
              style={{ height: "auto" }}
              priority
            />
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-border">
          {session?.user ? (
            <Dropdown placement="bottom-start" backdrop="blur">
              <DropdownTrigger>
                <button className="w-full">
                  <User
                    as="div"
                    avatarProps={{
                      src: "/linkerex/user1.png",
                      size: "md",
                      className: "ring-2 ring-primary/20",
                    }}
                    className="transition-transform hover:scale-[1.02] cursor-pointer w-full justify-start"
                    description={
                      <span className="text-xs text-muted capitalize">
                        {session.user.account_type}
                      </span>
                    }
                    name={
                      <span className="font-semibold text-sm text-foreground">
                        {session.user.username}
                      </span>
                    }
                  />
                </button>
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
                <DropdownItem
                  key="home"
                  startContent={<Home size={16} />}
                  onClick={() => (window.location.href = "/")}
                >
                  Home
                </DropdownItem>
                <DropdownItem
                  key="company_details"
                  startContent={<Building2 size={16} />}
                  onClick={() => (window.location.href = "/desk/company_details")}
                >
                  Company Details
                </DropdownItem>
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
            <Button
              variant="flat"
              className="w-full"
              onClick={() => (window.location.href = "/login")}
              startContent={<UserCircle size={18} />}
            >
              Log In
            </Button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col p-4 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-muted hover:bg-card/80 hover:text-foreground"
                }`}
              >
                <Icon size={20} className={active ? "text-white" : "text-muted"} />
                <span className="font-medium">{item.name}</span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <p className="text-xs text-muted text-center">
            Linkerex © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* Overlay for Mobile View */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
