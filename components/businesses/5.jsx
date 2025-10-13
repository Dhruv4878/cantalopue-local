"use client";
import React, { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, CheckIcon } from '@heroicons/react/24/solid';

// Spinner Icon for loading state
const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export default function SetScheduleForm() {
  const router = useRouter();
  const [frequency, setFrequency] = useState('Regular (2-3 posts/week)');
  const [timezone, setTimezone] = useState('UTC (Coordinated Universal Time)');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Restore saved values on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('onboardingStep5') || '{}');
      if (saved.postingFrequency) setFrequency(saved.postingFrequency);
      if (saved.timezone) setTimezone(saved.timezone);
    } catch (_) {}
  }, []);

  // Auto-save on change
  useEffect(() => {
    const payload = {
      postingFrequency: frequency,
      timezone,
    };
    sessionStorage.setItem('onboardingStep5', JSON.stringify(payload));
  }, [frequency, timezone]);

  // progress steps (this page = step 5)
  const steps = ['Name & Website','Basic Info','Branding','Audience','Schedule'];
  const currentStep = 5;
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Read all step data from sessionStorage
      const step1Data = JSON.parse(sessionStorage.getItem('onboardingStep1') || '{}');
      const step2Data = JSON.parse(sessionStorage.getItem('onboardingStep2') || '{}');
      const step3Data = JSON.parse(sessionStorage.getItem('onboardingStep3') || '{}');
      const step4Data = JSON.parse(sessionStorage.getItem('onboardingStep4') || '{}');

      // Extract businessName from step1Data
      const businessName = step1Data.businessName;
      if (!businessName) {
        throw new Error('Business name is missing. Please fill out the first step.');
      }

      // Combine all the data from previous steps with this step's data
      const allFormData = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
        ...step4Data,
        postingFrequency: frequency,
        timezone: timezone,
      };

      // Send to backend (correct endpoint)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      const response = await fetch(`${apiUrl}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(allFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create business profile.');
      }

      // Set success toast and clean up session storage after successful submission
      sessionStorage.setItem('flashMessage', 'Business created successfully');
      sessionStorage.removeItem('onboardingStep1');
      sessionStorage.removeItem('onboardingStep2');
      sessionStorage.removeItem('onboardingStep3');
      sessionStorage.removeItem('onboardingStep4');

      router.push(`/subscription/${businessName}/confrm-plan`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="py-12">
        <div className="max-w-3xl mx-auto px-6">
        

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

          {/* Card */}
          <div className="mx-auto w-full max-w-lg bg-white rounded-2xl shadow-lg border border-slate-100">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Set your schedule</h1>
                <p className="text-sm text-slate-500 mt-2">Choose how often you want to post and when your audience is most active</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="posting-frequency" className="block text-sm font-medium text-slate-600 mb-2">Posting Frequency*</label>
                    <CustomSelect
                      id="posting-frequency"
                      value={frequency}
                      onChange={(v) => setFrequency(v)}
                      options={[
                        'Regular (2-3 posts/week)',
                        'Aggressive (5+ posts/week)',
                        'Light (1 post/week)',
                        'Custom schedule',
                      ]}
                    />
                    <p className="mt-2 text-xs text-slate-500">How often you'd like AI to create and schedule posts</p>
                  </div>

                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-slate-600 mb-2">Timezone*</label>
                    <CustomSelect
                      id="timezone"
                      value={timezone}
                      onChange={(v) => setTimezone(v)}
                      options={[
                        'UTC (Coordinated Universal Time)',
                        'America/New_York (ET)',
                        'America/Los_Angeles (PT)',
                        'Europe/London (GMT)',
                        'Asia/Kolkata (IST)',
                        'Asia/Tokyo (JST)'
                      ]}
                    />
                    <p className="mt-2 text-xs text-slate-500">Your business timezone for optimal posting times</p>
                  </div>

                  <div className="rounded-md bg-blue-50 border border-blue-100 p-4">
                    <div className="text-sm text-slate-800 font-medium mb-2">What happens next?</div>
                    <ul className="text-sm text-slate-700 space-y-2">
                        <li className="flex items-start gap-3"><span className="text-blue-600 mt-1"><CheckIcon className="h-4 w-4" /></span>Your business will be created and ready to use</li>
                        <li className="flex items-start gap-3"><span className="text-blue-600 mt-1"><CheckIcon className="h-4 w-4" /></span>AI will start generating content based on your preferences</li>
                        <li className="flex items-start gap-3"><span className="text-blue-600 mt-1"><CheckIcon className="h-4 w-4" /></span>Posts will be scheduled according to your chosen frequency</li>
                        <li className="flex items-start gap-3"><span className="text-blue-600 mt-1"><CheckIcon className="h-4 w-4" /></span>You can invite team members to collaborate</li>
                    </ul>
                  </div>
                  
                  {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <ChevronLeftIcon className="h-4 w-4 text-slate-400" />
                    Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <SpinnerIcon /> : 'Create Business'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Local CustomSelect component to match other forms' dropdown styling and behavior
function CustomSelect({ id, value, onChange, options = [] }) {
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
      const val = options[highlighted] || '';
      onChange(val);
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
        className="appearance-none w-full text-left rounded-md border border-slate-200 px-3 py-2 pr-10 bg-white shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <span className={`truncate ${value ? 'text-slate-900' : 'text-slate-400'}`}>{value || ''}</span>
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
              onClick={() => { onChange(opt); setOpen(false); }}
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

