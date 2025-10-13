import React from 'react';
import CTA from './CTA';

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className={`${gradient} p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-md">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to dominate social media
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered content generation to automated scheduling across all platforms, Postora handles your entire social media strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FeatureCard
            gradient="bg-gradient-to-br from-blue-50 to-indigo-100"
            icon={
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="AI Content Generation"
            description="Generate compelling stories, captions, and visuals tailored to your brand voice and audience preferences using advanced AI."
          />
          
          <FeatureCard
            gradient="bg-gradient-to-br from-purple-50 to-pink-100"
            icon={
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            }
            title="Multi-Platform Publishing"
            description="Publish simultaneously to Facebook, Instagram, LinkedIn, Twitter, and more. One click, all platforms."
          />
          
          <FeatureCard
            gradient="bg-gradient-to-br from-green-50 to-emerald-100"
            icon={
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Smart Scheduling"
            description="AI-powered scheduling that posts when your audience is most active, maximizing engagement and reach."
          />
          
          <FeatureCard
            gradient="bg-gradient-to-br from-orange-50 to-red-100"
            icon={
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            }
            title="Brand Consistency"
            description="Maintain consistent brand voice, colors, and messaging across all content with intelligent brand guidelines."
          />
          
          <FeatureCard
            gradient="bg-gradient-to-br from-cyan-50 to-blue-100"
            icon={
              <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Analytics & Insights"
            description="Track performance, engagement, and ROI with detailed analytics and actionable insights to improve your strategy."
          />
          
          <FeatureCard
            gradient="bg-gradient-to-br from-violet-50 to-purple-100"
            icon={
              <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="Team Collaboration"
            description="Collaborate with team members, set approval workflows, and manage content creation with role-based permissions."
          />
        </div>
        
        {/* Technology Section */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Built with Cutting-Edge Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-20">
            Postora leverages the latest AI models and cloud infrastructure to deliver reliable, scalable content automation for businesses of all sizes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Advanced AI Models */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced AI Models</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by GPT-4 and Claude AI for intelligent content creation that understands your brand voice and audience.
              </p>
            </div>
            
            {/* Scalable Cloud Infrastructure */}
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Scalable Cloud Infrastructure</h3>
              <p className="text-gray-600 leading-relaxed">
                Built on enterprise-grade cloud infrastructure with 99.9% uptime guarantee and automatic scaling.
              </p>
            </div>
            
            {/* Enterprise Security */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                SOC 2 compliant with end-to-end encryption, secure OAuth, and GDPR compliance built-in.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}

      </div>
    </section>
  );
}


