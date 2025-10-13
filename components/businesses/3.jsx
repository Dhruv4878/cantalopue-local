"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpTrayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const DefineBrandForm = () => {
  const router = useRouter();
  
  // Progress steps configuration
  const steps = ['Name & Website','Basic Info','Branding','Audience','Schedule'];
  const currentStep = 3;
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  // --- State Management ---
  const [brandTone, setBrandTone] = useState('');
  const [logoUrl, setLogoUrl] = useState(''); // Stores the final Cloudinary URL
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Restore saved values on component load
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('onboardingStep3') || '{}');
      if (saved.brandTone) setBrandTone(saved.brandTone);
      if (saved.logoUrl) setLogoUrl(saved.logoUrl); // Load the permanent URL
    } catch (_) {}
  }, []);

  // Auto-save brand tone when it changes
  useEffect(() => {
    const existing = JSON.parse(sessionStorage.getItem('onboardingStep3') || '{}');
    sessionStorage.setItem('onboardingStep3', JSON.stringify({ ...existing, brandTone }));
  }, [brandTone]);
  
  /**
   * Handles the file selection and direct upload to Cloudinary.
   */
  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    // These come from your frontend .env.local file
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Image upload failed.');
      
      const data = await response.json();
      const finalUrl = data.secure_url;

      setLogoUrl(finalUrl); // Update state with the permanent URL
      
      // Save the permanent URL to sessionStorage
      const existing = JSON.parse(sessionStorage.getItem('onboardingStep3') || '{}');
      sessionStorage.setItem('onboardingStep3', JSON.stringify({ ...existing, businessLogo : finalUrl }));

    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handles form submission by navigating to the next step.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // The logoUrl and brandTone are already saved in sessionStorage.
    router.push('/businesses/create/4');
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
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Define your brand</h1>
                <p className="text-sm text-slate-500 mt-2">Upload your logo and fine-tune your brand colors</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Upload box */}
                  <div>
                    <div className="rounded-lg border-2 border-dashed border-slate-200 p-6">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-48 h-28 rounded-md border border-slate-100 bg-slate-50 flex items-center justify-center mx-auto mb-3">
                            {logoUrl ? (
                              <img src={logoUrl} alt="Logo preview" className="max-h-24 object-contain" />
                            ) : (
                              isUploading ? <span className="text-sm text-slate-500 animate-pulse">Uploading...</span> : <ArrowUpTrayIcon className="h-8 w-8 text-slate-400" />
                            )}
                          </div>
                          <div className="flex items-center justify-center gap-3">
                            <label htmlFor="file-upload" className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-blue-600 hover:bg-slate-50 cursor-pointer">
                              Choose file
                              <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleLogoUpload} />
                            </label>
                            <div className="text-sm text-slate-500">or drag and drop</div>
                          </div>
                          {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
                          <p className="text-xs text-slate-400 mt-2">PNG, JPG, SVG recommended</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Select */}
                  <div>
                    <label htmlFor="brand-tone" className="block text-sm font-medium text-slate-600 mb-2">Brand Tone & Voice*</label>
                    <BrandToneDropdown value={brandTone} onValueChange={setBrandTone} />
                    <p className="mt-2 text-xs text-slate-500">The overall tone and voice for your content</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button type="button" onClick={() => router.push('/businesses/create/2')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
                    <ChevronLeftIcon className="h-4 w-4 text-slate-400" />
                    Back
                  </button>
                  <button type="submit" disabled={isUploading} className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:bg-blue-300">
                    Continue
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


// Small custom dropdown component placed in the same file for convenience
function BrandToneDropdown({ value, onValueChange }) {
  const options = [
    '----', 'Professional & Formal', 'Casual & Friendly', 'Witty & Humorous',
    'Inspirational & Uplifting', 'Educational & Informative', 'Playful & Energetic',  
    'Warm & Empathetic', 'Bold & Confident', 'Minimal & Quiet', 'Luxurious & Elegant',
  ];
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(options.indexOf(value || '----'));
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!btnRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.children[highlighted]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlighted, open]);

  useEffect(() => {
    const idx = options.indexOf(value || '----');
    if (idx !== -1) setHighlighted(idx);
  }, [value]);

  function toggle() { setOpen((v) => !v); }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setOpen(true); setHighlighted((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); setOpen(true); setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault(); onValueChange(options[highlighted]); setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="relative"> 
      <button
        ref={btnRef} type="button" aria-haspopup="listbox" aria-expanded={open}
        onClick={toggle} onKeyDown={onKeyDown}
        className="w-full text-left rounded-md border border-slate-200 px-3 py-2 pr-10 bg-white flex items-center justify-between text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
      >
        <span className="truncate">{value || '----'}</span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox" ref={panelRef} tabIndex={-1}
          className="absolute z-40 mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-52 overflow-auto focus:outline-none"
          onKeyDown={onKeyDown}
        >
          {options.map((opt, i) => (
            <li
              key={opt} role="option" aria-selected={value === opt}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => { onValueChange(opt); setOpen(false); }}
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

export default DefineBrandForm;