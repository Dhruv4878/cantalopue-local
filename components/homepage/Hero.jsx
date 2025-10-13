import React from 'react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 text-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            <span className="block">Automated Storytelling.</span>
            <span className="gradient-text">Social made simple.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transform your business data into visual storytelling that engages audiences, saves time, and builds brand trust. AI-powered content generation for every social platform.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 custom-shadow">
              Start Free Plan
            </a>
            <a href="#" className="flex items-center text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors">
              Watch Demo
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required • Free plan</p>
        </div>
        
        {/* Content Calendar Preview */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl custom-shadow-lg p-8 float-animation">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Content Calendar</h3>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">AI Generated</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">+247% Engagement</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">AI Powered</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Monday Success Story</h4>
                  <span className="text-sm text-blue-600 font-medium">LinkedIn • 9:00 AM</span>
                </div>
                <p className="text-gray-600 text-sm">Sharing client transformation stories that build trust and showcase results...</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Behind the Scenes</h4>
                  <span className="text-sm text-pink-600 font-medium">Instagram • 2:30 PM</span>
                </div>
                <p className="text-gray-600 text-sm">Authentic workplace moments that humanize your brand and connect with audience...</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Product Spotlight</h4>
                  <span className="text-sm text-purple-600 font-medium">Facebook • 6:00 PM</span>
                </div>
                <p className="text-gray-600 text-sm">Feature highlights that educate customers and drive engagement...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


