import React from 'react';

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">What social media platforms do you support?</h3>
            <p className="mt-2 text-gray-600">We support all major platforms including Instagram, Facebook, Twitter, LinkedIn, and Pinterest. More are coming soon!</p>
          </div>
          <hr/>
          <div>
            <h3 className="font-semibold text-lg">Can I cancel my subscription at any time?</h3>
            <p className="mt-2 text-gray-600">Yes, absolutely. You can cancel your Pro plan at any time from your account dashboard, no questions asked.</p>
          </div>
          <hr/>
          <div>
            <h3 className="font-semibold text-lg">What happens when my free trial ends?</h3>
            <p className="mt-2 text-gray-600">Your account will automatically be moved to the Free plan. You won't be charged unless you manually upgrade to Pro.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


