"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Contentgenerate/Toast";

export default function CreateBusiness() {
	const [businessName, setBusinessName] = useState("");
	const [websiteUrl, setWebsiteUrl] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Restore saved values on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('onboardingStep1') || '{}');
      if (saved.businessName) setBusinessName(saved.businessName);
      if (saved.website) setWebsiteUrl(saved.website);
    } catch (_) {}
  }, []);

  // Auto-save on change
  useEffect(() => {
    const payload = { businessName, website: websiteUrl };
    sessionStorage.setItem('onboardingStep1', JSON.stringify(payload));
  }, [businessName, websiteUrl]);

	// progress steps configuration
	const steps = ['Name & Website','Basic Info','Branding','Audience','Schedule'];
	const currentStep = 1; // only the first step is completed
	const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage(null);
		setIsSubmitting(true);

		// Simple validation: all fields must be filled and website must be a valid URL
		const nameOk = businessName.trim().length > 0;
		let urlOk = false;
		try {
			const u = new URL(websiteUrl);
			urlOk = Boolean(u.protocol && u.host);
		} catch {}

		if (!nameOk || !urlOk) {
			setIsSubmitting(false);
			setErrorMessage(
				!nameOk && !urlOk
					? "Business name and a valid website are required."
					: !nameOk
					? "Business name is required."
					: "Please enter a valid website URL (e.g., https://example.com)."
			);
			return;
		}

		try {
			// Save step 1 data to sessionStorage with correct field names for backend
      sessionStorage.setItem('onboardingStep1', JSON.stringify({ businessName, website: websiteUrl }));
			await new Promise((resolve) => setTimeout(resolve, 500));
			setIsSubmitted(true);
			// Navigate to step 2 on success
			router.push("/businesses/create/2");
		} catch (err) {
			setErrorMessage("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
			<div className="container mx-auto px-6 py-10">
				{/* Progress steps */}
				<div className="max-w-3xl mx-auto mb-6">
					<div className="w-full">
						{/* Top numbered circles */}
						<div className="flex items-center justify-between select-none">
							{steps.map((label, idx) => (
								<div key={label} className="flex flex-col items-center w-1/5">
									<div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${idx < currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
										{idx + 1}
									</div>
								</div>
							))}
						</div>
						{/* Thin overall connector with filled portion */}
						<div className="relative mt-4">
							<div className="w-full h-1 bg-slate-200 rounded" />
							<div className="absolute left-0 top-0 h-1 bg-blue-600 rounded" style={{ width: `${progressPercent}%` }} />
						</div>
						{/* Labels */}
						<div className="flex items-center justify-between mt-3 text-xs text-slate-500">
							{steps.map((label) => (
								<div key={label} className="w-1/5 text-center">{label}</div>
							))}
						</div>
					</div>
				</div>

				{/* Title */}
				<div className="text-center mb-8">
					<h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Let's create your business</h1>
					<p className="text-slate-600 mt-2">Enter your business name and website to get started - we'll analyze it for you!</p>
				</div>

				{/* Card */}
				<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="businessName" className="block text-sm font-medium text-slate-600 mb-1">Business Name*</label>
							<input
								id="businessName"
								name="businessName"
								type="text"
								required
								value={businessName}
								onChange={(e) => setBusinessName(e.target.value)}
								className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
								placeholder="Your business name"
							/>
							<p className="text-xs text-slate-500 mt-1">This will be used to identify your business throughout the app.</p>
						</div>

						<div>
							<label htmlFor="websiteUrl" className="block text-sm font-medium text-slate-600 mb-1">Website*</label>
							<input
								id="websiteUrl"
								name="websiteUrl"
								type="url"
								required
								value={websiteUrl}
								onChange={(e) => setWebsiteUrl(e.target.value)}
								className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
								placeholder="https://yourwebsite.com"
							/>
							<p className="text-xs text-slate-500 mt-1">We'll analyze your website to automatically extract business details.</p>
						</div>

						{/* Info panel */}
						<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
							<p className="font-semibold text-slate-800 mb-2">Smart Website Analysis</p>
							<p className="text-sm text-slate-600 mb-3">After you submit this form, we'll automatically analyze your website and extract:</p>
							<ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
								<li>Business description and industry classification</li>
								<li>Brand colors from your website design</li>
								<li>Brand tone and messaging style</li>
								<li>Target audience and key value propositions</li>
								<li>Content themes for social media</li>
							</ul>
							<p className="text-sm text-slate-600 mt-3">This will pre‑fill the remaining steps for you! ✨</p>
						</div>

						{errorMessage && (
							<p className="text-sm text-red-600">{errorMessage}</p>
						)}

						<div className="flex justify-end">
							<button
								type="submit"
								className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-60"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Please wait..." : "Continue"}
							</button>
						</div>
					</form>
				</div>

				{/* Analysis card shown after submit */}
				{isSubmitted && (
					<div className="max-w-3xl mx-auto mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start justify-between">
						<div>
							<p className="font-semibold text-slate-800">Analyzing Your Website</p>
							<p className="text-sm text-slate-700 mt-1">Business created! We couldn't analyze your website, but you can fill in the details manually.</p>
							<p className="text-xs text-green-600 mt-2">✓ Analysis Complete!</p>
							<p className="text-[11px] text-slate-500">Crawled 0 pages and extracted business details.</p>
						</div>
						<button type="button" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-sm">
							<span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
							Processing...
						</button>
					</div>
				)}
			</div>
		</div>
	);
}



