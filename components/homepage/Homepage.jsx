'use client';
import React from 'react';
import Header from './Header';
import Hero from './Hero'
import Features from './Features';
import CTA from './CTA';
import Footer from './Footer';



export default function App() {
  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
