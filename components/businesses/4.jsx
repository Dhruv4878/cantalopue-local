// KnowAudienceForm.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function KnowAudienceForm() {
  const router = useRouter();
  const [audience, setAudience] = useState('');
  const [keyMessages, setKeyMessages] = useState('');
  const [contentThemes, setContentThemes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Restore saved values on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('onboardingStep4') || '{}');
      if (saved.targetAudience) setAudience(saved.targetAudience);
      if (saved.keyMessages) setKeyMessages(saved.keyMessages);
      if (saved.contentThemes) setContentThemes(saved.contentThemes);
    } catch (_) {}
  }, []);

  // Auto-save when values change
  useEffect(() => {
    const payload = {
      targetAudience: audience,
      keyMessages,
      contentThemes,
    };
    sessionStorage.setItem('onboardingStep4', JSON.stringify(payload));
  }, [audience, keyMessages, contentThemes]);

  function handleBack() {
    router.push('/businesses/create/3');
  }

  function handleNext(e) {
    e.preventDefault();
    if (!audience.trim()) {
      setErrorMessage('Target Audience is required.');
      return;
    }
    // Save step 4 data to sessionStorage with backend field names
    sessionStorage.setItem('onboardingStep4', JSON.stringify({
      targetAudience: audience,
      keyMessages,
      contentThemes
    }));
    router.push('/businesses/create/5');
  }

  return (
    <div className="bg-slate-50 min-h-screen">
    

      <main className="py-12">
        <div className="max-w-3xl mx-auto px-6">

          {/* Progress steps */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="w-full">
              {/* page = step 4 */}
              {(() => {
                const steps = ['Name & Website','Basic Info','Branding','Audience','Schedule'];
                const currentStep = 4;
                const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;
                return (
                  <>
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
                  </>
                );
              })()}
            </div>
          </div>

          {/* Card */}
          <div className="mx-auto w-full max-w-lg bg-white rounded-2xl shadow-lg border border-slate-100">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Know your audience</h1>
                <p className="text-sm text-slate-500 mt-2">Review and refine your target audience and content strategy</p>
              </div>

              <form onSubmit={handleNext}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="target-audience" className="block text-sm font-medium text-slate-600 mb-2">Target Audience*</label>
                    <textarea id="target-audience" rows={5} value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Who is your ideal customer? Describe demographics, interests, pain points..." className="w-full rounded-md border border-slate-200 px-3 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <p className="mt-2 text-xs text-slate-400">Be specific! This helps AI create more relevant content</p>
                  </div>

                  <div>
                    <label htmlFor="key-messages" className="block text-sm font-medium text-slate-600 mb-2">Key Messages</label>
                    <textarea id="key-messages" rows={5} value={keyMessages} onChange={e => setKeyMessages(e.target.value)} placeholder="What key messages do you want to communicate? Your value proposition, unique benefits..." className="w-full rounded-md border border-slate-200 px-3 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <p className="mt-2 text-xs text-slate-400">Core messages to weave into your content consistently</p>
                  </div>

                  <div>
                    <label htmlFor="content-themes" className="block text-sm font-medium text-slate-600 mb-2">Content Themes</label>
                    <textarea id="content-themes" rows={4} value={contentThemes} onChange={e => setContentThemes(e.target.value)} placeholder="Topics for content: industry insights, tips, company culture, product updates..." className="w-full rounded-md border border-slate-200 px-3 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <p className="mt-2 text-xs text-slate-400">Main topics and themes (separate with commas)</p>
                  </div>
                </div>

                {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
                    <ChevronLeftIcon className="h-4 w-4 text-slate-400" />
                    Back
                  </button>
                  <button type="submit" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
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
}
