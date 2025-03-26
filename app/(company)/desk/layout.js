"use client";

import Sidebar from "@/app/components/(desk)/SideBar";
import Login_now from "../../NotLoggedIn";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>; // Prevents flickering and errors
  if (!session || !session.user || session.user.account_type === "student") return <Login_now />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
