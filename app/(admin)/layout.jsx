"use client";

import React, { useState } from "react";
import { Menu, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Contentgenerate/Sidebar";

const DARK_BG = "#070616";

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-2xl relative overflow-hidden text-white ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    }}
  >
    {children}
  </div>
);

// Header that shows current page title and profile/actions
const Header = ({ toggleSidebar }) => {
  const pathname = usePathname(); // e.g. "/dashboard", "/generate"
  const segments = pathname.split("/").filter(Boolean); // ['dashboard'] or ['generate']
  const last = segments[segments.length - 1] || "dashboard";

  const titleMap = {
    dashboard: "Dashboard",
    generate: "Generate Post",
    calender: "Calender",
    connectplatform: "Connect Accounts",
    setting: "Settings",
  };

  const title =
    titleMap[last] ??
    last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <GlassCard className="mb-6 flex items-center justify-between p-4 lg:p-5 sticky top-4 z-20 !rounded-2xl">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="lg:hidden text-white mr-4">
          <Menu size={24} />
        </button>
        <h2 className="text-xl lg:text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Bell
          size={20}
          className="text-gray-400 cursor-pointer hover:text-orange-400"
        />
        <MessageSquare
          size={20}
          className="text-gray-400 cursor-pointer hover:text-orange-400"
        />

        <div className="flex items-center cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-semibold">
            U
          </div>
          <ChevronDown size={16} className="text-gray-400 ml-2" />
        </div>
      </div>
    </GlassCard>
  );
};

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((v) => !v);

  return (
    <div
      className="min-h-screen flex text-white"
      style={{ backgroundColor: DARK_BG, fontFamily: "Poppins, sans-serif" }}
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full filter blur-[150px] opacity-20 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 140, 0, 0.7), rgba(255, 140, 0, 0) 70%)",
        }}
      ></div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-4 flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 pb-8">{children}</main>

          <footer className="text-center pt-4 pb-6 text-gray-500 text-sm mt-auto">
            &copy; 2024 Cantaloupe.AI Social Manager. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
