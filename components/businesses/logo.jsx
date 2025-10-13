"use client";
import React from "react";
import Link from "next/link";

export default function BusinessHeader({ firstName = "D", lastName = "P" }) {
	return (
		<header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
			<div className="container mx-auto px-6 py-4 flex justify-between items-center">
				{/* Left: logo only */}
				<div className="text-2xl font-bold text-blue-600">
					<Link href="/">Post Generator</Link>
				</div>

				{/* Right: actions */}
				<div className="flex items-center gap-3">
					{/* Primary nav moved to the right side */}
					<nav className="hidden md:flex items-center gap-6 text-sm mr-2">
						<Link href="/businesses" className="inline-flex items-center gap-2 text-blue-600 font-medium">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								<path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
							</svg>
							Businesses
						</Link>
						<Link href="/billing" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<rect x="2" y="5" width="20" height="14" rx="2" />
								<path d="M2 10h20" />
							</svg>
							Billing
						</Link>
					</nav>
					<button
						aria-label="Notifications"
						className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
							<path d="M13.73 21a2 2 0 01-3.46 0" />
						</svg>
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
					</button>

					<button aria-label="Help" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="10" />
							<path d="M9.09 9a3 3 0 115.82 1c0 2-3 2-3 4" />
							<line x1="12" y1="17" x2="12.01" y2="17" />
						</svg>
					</button>

				<div className="flex items-center gap-2">
					{(() => {
						const firstInitial = (firstName || "").trim().charAt(0).toUpperCase();
						const lastInitial = (lastName || "").trim().charAt(0).toUpperCase();
						const initials = `${firstInitial}${lastInitial}` || "?";
						return (
							<button className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">{initials}</button>
						);
					})()}
						<svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</div>
				</div>
			</div>
		</header>
	);
}


