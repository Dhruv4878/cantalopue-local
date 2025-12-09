"use client";

import React from "react";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import GradientButton from "../GradientButton";

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



const PLATFORMS = [
  { name: "Instagram", icon: Instagram, color: "#E1306C" },
  { name: "Facebook", icon: Facebook, color: "#4267B2" },
  { name: "LinkedIn", icon: Linkedin, color: "#0077B5" },
  { name: "Twitter", icon: Twitter, color: "#1DA1F2" },
];

const ConnectAccountsView = () => (
  <div className="p-4 lg:p-8">
    <h3 className="text-2xl font-bold mb-6">Connect Your Social Accounts</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PLATFORMS.map((p) => (
        <GlassCard
          key={p.name}
          className="flex flex-col items-stretch text-center min-h-[230px]"
        >
          {/* Top content (icon + title + text) */}
          <div className="flex-1 flex flex-col items-center">
            <p.icon
              size={48}
              style={{ color: p.color }}
              className="mb-4"
            />
            <h4 className="text-xl font-semibold mb-2 text-white">
              {p.name}
            </h4>

            {/* Fixed/min height so all descriptions occupy same space */}
            <p className="text-sm text-gray-400 mb-4 min-h-[48px]">
              Integrate your {p.name} account to publish posts directly.
            </p>
          </div>

          {/* Button pinned to bottom of card */}
          <GradientButton className="hidden sm:inline-flex">
  Connect Platform
</GradientButton>

        </GlassCard>
      ))}
    </div>
  </div>
);

export default ConnectAccountsView;
