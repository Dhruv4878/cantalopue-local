"use client";
import React, { useState } from 'react';
import Header from "@/components/homepage/Header";
import FAQ from "@/components/homepage/FAQ";
import Footer from "@/components/homepage/Footer";

export default function FAQPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased flex flex-col">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<main className="flex-1">
				<FAQ />
			</main>
			<Footer />
		</div>
	);
}


