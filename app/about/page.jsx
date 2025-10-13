"use client";
import React, { useState } from 'react';
import Header from "@/components/homepage/Header";
import About from "@/components/homepage/About";
import Footer from "@/components/homepage/Footer";

export default function AboutPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="bg-gray-50 text-gray-800 font-sans antialiased">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<main>
				<About />
			</main>
			<Footer />
		</div>
	);
}
