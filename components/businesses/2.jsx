"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReviewDetails() {
	const [description, setDescription] = useState("");
	const [industry, setIndustry] = useState("");
	const [companySize, setCompanySize] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Restore previously saved values on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('onboardingStep2') || '{}');
      if (saved.businessDescription) setDescription(saved.businessDescription);
      if (saved.industry) setIndustry(saved.industry);
      if (saved.companySize) setCompanySize(saved.companySize);
    } catch (_) {}
  }, []);

  // Auto-save whenever fields change
  useEffect(() => {
    const payload = {
      businessDescription: description,
      industry,
      companySize,
    };
    sessionStorage.setItem('onboardingStep2', JSON.stringify(payload));
  }, [description, industry, companySize]);

	// progress steps configuration (this page = step 2)
	const steps = ['Name & Website','Basic Info','Branding','Audience','Schedule'];
	const currentStep = 2;
	const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

	function handleBack() {
		router.push("/businesses/create");
	}

		function handleNext() {
			// All fields required validation
			if (!description.trim() || !industry || !companySize) {
				setErrorMessage("Please complete all required fields marked with *.");
				return;
			}
			// Save step 2 data to sessionStorage with backend field names
			sessionStorage.setItem('onboardingStep2', JSON.stringify({
				businessDescription: description,
				industry,
				companySize
			}));
			router.push("/businesses/create/3");
		}

	return (
		<div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
			<div className="container mx-auto px-6 pt-24 pb-10">
				{/* Progress steps */}
				<div className="max-w-3xl mx-auto mb-6">
					<div className="w-full">
						<div className="flex items-center justify-between select-none">
							{steps.map((label, idx) => (
								<div key={label} className="flex flex-col items-center w-1/5">
									<div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${idx < currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
										{idx + 1}
									</div>
								</div>
							))}
						</div>
						<div className="relative mt-4 h-2">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full h-1 rounded bg-slate-200" />
							</div>
							<div className="absolute left-0 top-0 h-1 rounded bg-blue-600" style={{ width: `${progressPercent}%` }} />
						</div>
						<div className="flex items-center justify-between mt-3 text-xs text-slate-500">
							{steps.map((label) => (
								<div key={label} className="w-1/5 text-center">{label}</div>
							))}
						</div>
					</div>
				</div>

				{/* Title */}
				<div className="text-center mb-8">
					<h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Review your details</h1>
					<p className="text-slate-600 mt-2">We've analyzed your website. Review and adjust the details below</p>
				</div>

				{/* Card */}
				<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
					<form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
						<div>
							<label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-1">Business Description*</label>
							<textarea
								id="description"
								rows={4}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Brief description of your business"
								className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
							/>
							<p className="text-xs text-slate-500 mt-1">A short description that helps team members understand your business</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="">
								<label htmlFor="industry" className="block text-sm font-medium text-slate-600 mb-1">Industry*</label>
								<CustomSelect
									id="industry"
									value={industry}
									onChange={(v) => setIndustry(v)}
									options={["---------", "Technology", "Retail", "Healthcare", "Education"]}
									placeholder="---------"
								/>
								<p className="text-xs text-slate-500 mt-1">Select the industry that best describes your business</p>
							</div>

							<div className="">
								<label htmlFor="companySize" className="block text-sm font-medium text-slate-600 mb-1">Company Size*</label>
								<CustomSelect
									id="companySize"
									value={companySize}
									onChange={(v) => setCompanySize(v)}
									options={["---------", "1-10", "11-50", "51-200", "200+"]}
									placeholder="---------"
								/>
								<p className="text-xs text-slate-500 mt-1">Approximate number of employees in your organization</p>
							</div>
						</div>

						{errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
						<div className="flex justify-between pt-2">
							<button type="button" onClick={handleBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="15 18 9 12 15 6" />
								</svg>
								Back
							</button>
							<button type="submit" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
								Continue
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="9 18 15 12 9 6" />
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

// Reusable custom select used by this file. Keeps same API (value/onChange/options).
function CustomSelect({ id, value, onChange, options = [], placeholder = "" }) {
	const [open, setOpen] = useState(false);
	const [highlighted, setHighlighted] = useState(0);
	const btnRef = useRef(null);
	const panelRef = useRef(null);

	useEffect(() => {
		function onDocClick(e) {
			if (!btnRef.current) return;
			if (btnRef.current.contains(e.target)) return;
			if (panelRef.current && panelRef.current.contains(e.target)) return;
			setOpen(false);
		}
		document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, []);

	useEffect(() => {
		if (open && panelRef.current) {
			const node = panelRef.current.children[highlighted];
			if (node) node.scrollIntoView({ block: 'nearest' });
		}
	}, [highlighted, open]);

	function toggle() {
		setOpen((v) => !v);
	}

	function onKeyDown(e) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setOpen(true);
			setHighlighted((h) => Math.min(h + 1, options.length - 1));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setOpen(true);
			setHighlighted((h) => Math.max(h - 1, 0));
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const val = options[highlighted] || placeholder;
			onChange(val === placeholder ? '' : val);
			setOpen(false);
		} else if (e.key === 'Escape') {
			setOpen(false);
		}
	}

	return (
		<div className="relative">
			<button
				id={id}
				ref={btnRef}
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={toggle}
				onKeyDown={onKeyDown}
				className="appearance-none w-full text-left rounded-lg border border-slate-200 px-3 py-3 pr-10 bg-white shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
			>
				<span className={`truncate ${value ? 'text-slate-900' : 'text-slate-400'}`}>{value || placeholder}</span>
				<div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
					<svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
						<path d="M6 8l4 4 4-4" />
					</svg>
				</div>
			</button>

			{open && (
				<ul
					role="listbox"
					ref={panelRef}
					tabIndex={-1}
					className="absolute z-40 mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-44 overflow-auto"
					onKeyDown={onKeyDown}
				>
					{options.map((opt, i) => (
						<li
							key={opt + i}
							role="option"
							aria-selected={value === opt}
							onMouseEnter={() => setHighlighted(i)}
							onClick={() => { onChange(opt === placeholder ? '' : opt); setOpen(false); }}
							className={`px-3 py-2 text-sm cursor-pointer ${highlighted === i ? 'bg-indigo-50 text-slate-900' : 'text-slate-700'} ${value === opt ? 'font-semibold' : ''}`}
						>
							{opt}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}


