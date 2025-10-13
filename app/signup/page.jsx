"use client";
import React from "react";
import Footer from "@/components/homepage/Footer";
import Signupform from "@/components/homepage/Signupform";
import Header from "@/components/homepage/Header";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <Signupform />
      <Footer />
    </div>
  );
}