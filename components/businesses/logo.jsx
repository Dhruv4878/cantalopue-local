"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BusinessHeader(	) {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [localFirstName, setLocalFirstName] = useState("");
	const [localLastName, setLocalLastName] = useState("");

	useEffect(() => {
		const fetchEmail = async () => {
			try {
				// Preload any identity persisted during login flow
				const cachedFirst = (sessionStorage.getItem("firstName") || "").trim();
				const cachedLast = (sessionStorage.getItem("lastName") || "").trim();
				const cachedEmail = (sessionStorage.getItem("userEmail") || "").trim();
				if (cachedFirst) setLocalFirstName(cachedFirst);
				if (cachedLast) setLocalLastName(cachedLast);
				if (cachedEmail) setUserEmail(cachedEmail);

				// Only fetch profile if user has completed it
				const hasProfile = sessionStorage.getItem("hasProfile") === "true";
				if (!hasProfile) return;

				const token = sessionStorage.getItem("authToken");
				if (!token) return;
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
				const res = await fetch(`${apiUrl}/profile/me`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!res.ok) return;
				const data = await res.json();
				// `user` is populated with name and email per backend controller
				setUserEmail(data?.user?.email || "");
				setLocalFirstName((data?.user?.firstName || "").trim());
				setLocalLastName((data?.user?.lastName || "").trim());
			} catch (e) {
				// ignore
			}
		};
		fetchEmail();
	}, []);

	const handleSignOut = () => {
		try {
			sessionStorage.clear();
		} catch (_) {
			// ignore
		}
		router.push("/login");
	};
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
						{/* <Link href="/businesses" className="inline-flex items-center gap-2 text-blue-600 font-medium">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								<path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
							</svg>
							Businesses
						</Link> */}
						{/* <Link href="/billing" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<rect x="2" y="5" width="20" height="14" rx="2" />
								<path d="M2 10h20" />
							</svg>
							Billing
						</Link> */}
					</nav>
					{/* <button
						aria-label="Notifications"
						className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
					> */}
						{/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
							<path d="M13.73 21a2 2 0 01-3.46 0" />
						</svg>
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
					</button> */}

					{/* <button aria-label="Help" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="10" />
							<path d="M9.09 9a3 3 0 115.82 1c0 2-3 2-3 4" />
							<line x1="12" y1="17" x2="12.01" y2="17" />
						</svg>
					</button> */}

				<div className="flex items-center gap-2 relative">
					<button aria-label="User" className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
						<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					</button>
						<button aria-label="Toggle account menu" onClick={() => setIsMenuOpen((v) => !v)} className="p-1 hover:text-slate-900 text-slate-600">
							<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>
						{isMenuOpen && (
							<div className="absolute right-0 top-9 w-64 bg-white border border-slate-200 rounded-lg shadow-md py-2 z-50">
								<div className="px-4 py-2 text-sm text-slate-700">
									<span className="block font-medium">Signed in</span>
									<span className="block truncate text-slate-500">{userEmail || ""}</span>
								</div>
								<div className="border-t border-slate-200 my-2" />
								<button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
									Sign out
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}


