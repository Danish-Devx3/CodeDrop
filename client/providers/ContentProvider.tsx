"use client";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import { useGlobalContext } from "@/context/globalContext";
import { usePathname } from "next/navigation";
import React from "react";

interface props {
  children: React.ReactNode;
}

export default function ContentProvider({ children }: props) {
  const { isSidebarOpen } = useGlobalContext();
  const pathname = usePathname();
  const hideSidebarPaths = ["/profile/update", "/help", "/privacy", "/terms"];

  const marginClass = hideSidebarPaths.includes(pathname)
    ? "ml-0"
    : isSidebarOpen
    ? "ml-[15rem]"
    : "ml-[5.2rem]";
  return (
    <div className="relative">
      {!hideSidebarPaths.includes(pathname) && <Sidebar/>}
      <div className={`mt-[8vh] ${marginClass}`}>{children}</div>
    </div>
  );
}
