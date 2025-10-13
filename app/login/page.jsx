"use client";
import React from 'react';
import Loginform from '@/components/homepage/Loginform';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />  
      <Loginform />
      <Footer />
      
    </div>
  );
}

