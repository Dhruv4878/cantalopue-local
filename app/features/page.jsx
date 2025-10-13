"use client";
import React, { useState } from 'react';
import Header from "../../components/homepage/Header";
import Features from "../../components/homepage/Features";
import Footer from "../../components/homepage/Footer";

export default function FeaturesPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="bg-gray-50 text-gray-800 font-sans antialiased">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<main>
				<Features />
			</main>
			<Footer />
		</div>
	);
}


