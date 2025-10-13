"use client";
import React, { useState } from 'react';
import Header from "@/components/homepage/Header";
import Pricing from "@/components/homepage/Pricing";
import Footer from "@/components/homepage/Footer";

export default function PricingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="bg-gray-50 text-gray-800 font-sans antialiased">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<main>
				<Pricing />
			</main>
			<Footer />
		</div>
	);
}
