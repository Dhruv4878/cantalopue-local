import React from 'react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Empowering businesses with
            <span className="block text-yellow-400">AI-powered storytelling</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            At Post Generator, we believe every business has a story worth telling. Our mission is to make 
            professional social media storytelling accessible to companies of all sizes through the 
            power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
              Our Story
            </h2>
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p>
                Founded in 2025, Post Generator emerged from a simple observation: while every business has 
                compelling stories to tell, most struggle to consistently create engaging social media 
                content that resonates with their audience.
              </p>
              <p>
                Traditional social media management is time-consuming, expensive, and often inconsistent. 
                Small and medium businesses especially face the challenge of competing with larger brands 
                that have dedicated content teams.
              </p>
              <p>
                We saw an opportunity to democratize professional storytelling through artificial intelligence. 
                By combining advanced AI with deep understanding of brand voice and audience psychology, we 
                created a platform that transforms business data into compelling visual stories.
              </p>
              <p>
                Today, Post Generator serves businesses across the globe, helping them build authentic connections 
                with their audiences through automated, brand-consistent storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future of business storytelling, where every company can engage 
              authentically with their audience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower businesses and organizations with AI-powered tools that transform their unique 
                stories into engaging social media content, helping them build authentic relationships with 
                their audiences while saving time and resources.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A world where every business, regardless of size or resources, can consistently share their 
                story through compelling, brand-authentic social media content that drives meaningful 
                engagement and business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at Post Generator, from product development to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Innovation */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-6 h-full flex flex-col">
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600 flex-grow">
                  We continuously push the boundaries of AI technology to create better storytelling experiences.
                </p>
              </div>
            </div>

            {/* Authenticity */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 mb-6 h-full flex flex-col">
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-600 flex-grow">
                  Every story we help create stays true to the brand's unique voice and values.
                </p>
              </div>
            </div>

            {/* Accessibility */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 mb-6 h-full flex flex-col">
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600 flex-grow">
                  Professional storytelling should be available to businesses of all sizes and budgets.
                </p>
              </div>
            </div>

            {/* Excellence */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-8 mb-6 h-full flex flex-col">
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600 flex-grow">
                  We're committed to delivering the highest quality content and user experience possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of AI researchers, social media experts, and business strategists united 
              by our passion for storytelling.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center max-w-3xl mx-auto">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">We're Growing!</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our team is rapidly expanding as we scale our mission to democratize business storytelling. 
              We're always looking for passionate individuals who share our vision.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              View Open Positions
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have questions about our platform or want to 
              share your success story, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* General Inquiries */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
              <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">General inquiries and support</p>
              <a href="mailto:hello@postgenerator.ai" className="text-blue-600 font-semibold hover:text-blue-700">
                hello@postgenerator.ai
              </a>
            </div>

            {/* Support */}
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
              <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Support</h3>
              <p className="text-gray-600 mb-4">Technical help and troubleshooting</p>
              <a href="mailto:support@postgenerator.ai" className="text-green-600 font-semibold hover:text-green-700">
                support@postgenerator.ai
              </a>
            </div>

            {/* Partnerships */}
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
              <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Partner With Us</h3>
              <p className="text-gray-600 mb-4">Business partnerships and integrations</p>
              <a href="mailto:partnerships@postgenerator.ai" className="text-purple-600 font-semibold hover:text-purple-700">
                partnerships@postgenerator.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to start your storytelling journey?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join the growing community of businesses using Post Generator to transform their social media presence.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a 
                href="#" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
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
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
