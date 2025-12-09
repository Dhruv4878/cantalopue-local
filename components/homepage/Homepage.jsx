'use client';
import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import KeyFeaturesSection from './KeyFeaturesSection';
import SocialScrollBanner from './SocialScrollBanner';
import CallToActionSection from './CallToActionSection';
import CantaloupeTitle from './BackgroundWatermark';
import ComingSoon from './ComingSoon';
import Faq from './Faq';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <KeyFeaturesSection />
        <SocialScrollBanner />
        <CallToActionSection />
        <ComingSoon />
        <Faq/>

      </main>
      <CantaloupeTitle />
      <Footer />
    </div>
  );
}