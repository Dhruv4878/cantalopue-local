"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Calendar,
  Globe,
  Settings,
  LogOut,
  X,
  History,
} from "lucide-react";

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`relative overflow-hidden text-white rounded-2xl ${className}`}
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

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Generate Post", icon: Zap, href: "/generate" },
  { name: "Calender", icon: Calendar, href: "/calender" },
  { name: "Connect Accounts", icon: Globe, href: "/connectplatform" },
  { name: "Settings", icon: Settings, href: "/setting" },
  { name: "Recent Post", icon: History, href: "/recentpost" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const NavItem = ({ item }) => {
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        className="block"
        onClick={toggleSidebar} // closes sidebar on mobile
      >
        <div
          className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer mb-1.5
            ${
              active
                ? "text-white font-bold bg-white/10"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }
          `}
        >
          <item.icon size={20} className="mr-3 flex-shrink-0" />
          <span className="truncate">{item.name}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR WRAPPER (handles fixed/slide on mobile, static on desktop) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-72 max-w-full
          transform transition-transform duration-300 will-change-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:inset-auto lg:translate-x-0
          lg:w-72 lg:flex-shrink-0
        `}
      >
        <GlassCard
          className={`
            h-full flex flex-col
            rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl
            px-5 py-6 sm:px-6 sm:py-8
          `}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white truncate">
              Cantaloupe.AI
            </h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* NAV LIST (scrollable on small screens) */}
          <nav className="flex-grow overflow-y-auto pr-1 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          {/* FOOTER */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <button className="flex w-full items-center text-gray-400 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 hover:text-white transition">
              <LogOut size={20} className="mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </GlassCard>
      </aside>
    </>
  );
};

export default Sidebar;
