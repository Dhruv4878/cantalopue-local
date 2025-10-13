import React from 'react';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to transform your social media strategy?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
            Join thousands of businesses that are already using Postora to automate their social media storytelling.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="#" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 custom-shadow flex items-center"
            >
              Start Free Plan
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="#" 
              className="text-blue-100 font-semibold text-lg hover:text-white transition-colors border-b-2 border-transparent hover:border-blue-200"
            >
              Learn More
            </a>
          </div>
          
          <p className="mt-8 text-blue-200 text-sm">
            No credit card required • Free plan
          </p>
        </div>
      </div>
    </section>
  );
}

