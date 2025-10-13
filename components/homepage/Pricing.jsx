"use client";
import React, { useState } from "react";

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon = () => (
  <div className="flex items-center justify-center w-5 h-5">
    <svg
      className="w-5 h-5 text-green-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

const XIcon = () => (
  <div className="flex items-center justify-center w-5 h-5">
    <svg
      className="w-5 h-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);


export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-yellow-400">Pricing</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-12">
            Start free and scale as you grow. Choose the plan that fits your
            business needs. Upgrade or downgrade anytime with no commitments.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 ${
                !isAnnual ? "text-white font-semibold" : "text-blue-200"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 ${
                isAnnual ? "text-white font-semibold" : "text-blue-200"
              }`}
            >
              Annual <span className="text-green-300">(Save 17%)</span>
            </span>
          </div>

          {/* Guide Message */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center">
              <CheckIcon />
              <span className="ml-2 text-blue-100">
                Choose your plan and we'll guide you through creating your
                account and business setup.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan to find the perfect fit for your
              business.
            </p>
          </div>

          <div className="overflow-x-auto pt-6">
            <table className="w-full max-w-6xl mx-auto border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-6 px-6 font-semibold text-gray-900 w-1/4">
                    Features
                  </th>
                  <th className="text-center py-6 px-6 font-semibold text-gray-900 w-1/6">
                    Free
                  </th>
                  <th className="text-center py-6 px-6 font-semibold text-gray-900 w-1/6">
                    Starter
                  </th>
                  <th className="text-center py-6 px-6 font-semibold text-gray-900 w-1/6 relative">
                    <div className="pt-4">Professional</div>
                    <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap z-10">
                      Popular
                    </span>
                  </th>
                  <th className="text-center py-6 px-6 font-semibold text-gray-900 w-1/6">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 font-medium text-gray-900">
                    Monthly Price
                  </td>
                  <td className="py-5 px-6 text-center text-green-600 font-bold">
                    Free
                  </td>
                  <td className="py-5 px-6 text-center font-bold">
                    ₹{isAnnual ? "41" : "49"}
                  </td>
                  <td className="py-5 px-6 text-center font-bold">
                    ₹{isAnnual ? "124" : "149"}
                  </td>
                  <td className="py-5 px-6 text-center font-bold">
                    ₹{isAnnual ? "415" : "499"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">
                    AI-generated posts per month
                  </td>
                  <td className="py-5 px-6 text-center">4</td>
                  <td className="py-5 px-6 text-center">30</td>
                  <td className="py-5 px-6 text-center">200</td>
                  <td className="py-5 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">
                    Social media accounts
                  </td>
                  <td className="py-5 px-6 text-center">1</td>
                  <td className="py-5 px-6 text-center">3</td>
                  <td className="py-5 px-6 text-center">5</td>
                  <td className="py-5 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">Team members</td>
                  <td className="py-5 px-6 text-center">1</td>
                  <td className="py-5 px-6 text-center">2</td>
                  <td className="py-5 px-6 text-center">10</td>
                  <td className="py-5 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">
                    Advanced analytics
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">API access</td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">Priority support</td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-5 px-6 text-gray-700">
                    White-label options
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <XIcon />
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center h-6">
                      <CheckIcon />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span
              className={`mr-3 ${
                !isAnnual ? "text-gray-900 font-semibold" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 ${
                isAnnual ? "text-gray-900 font-semibold" : "text-gray-500"
              }`}
            >
              Annual <span className="text-green-600">(Save 17%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600 mb-6">
                  Perfect for individuals and small creators getting started
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">Free</span>
                  <span className="text-gray-500 ml-2">Forever</span>
                </div>
                <button  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Get Started Free
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      4 AI-generated posts per month
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      1 social media platform
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">Basic scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Community support
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Content templates library
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Starter
                </h3>
                <p className="text-gray-600 mb-6">
                  Perfect for small businesses getting started
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{isAnnual ? "41" : "49"}
                  </span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      30 AI-generated posts per month
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      3 social media platforms
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Advanced scheduling automation
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">Email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">2 team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Content templates library
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">Basic analytics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-blue-600 rounded-2xl p-8 shadow-xl border-2 border-blue-500 relative transform scale-105 mt-6">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Professional
                </h3>
                <p className="text-blue-100 mb-6">
                  Ideal for growing businesses and agencies
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    ₹{isAnnual ? "124" : "149"}
                  </span>
                  <span className="text-blue-200 ml-2">/month</span>
                </div>
                <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Get Started
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      200 AI-generated posts per month
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      5 social media platforms
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      Advanced scheduling & automation
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">10 team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      Custom content templates
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      Advanced analytics & reporting
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      Multi-platform publishing
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">Content calendar</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-blue-100">
                      Performance optimization
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-gray-600 mb-6">
                  For large organizations and agencies
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{isAnnual ? "415" : "499"}
                  </span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Unlimited AI-generated posts
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Unlimited social media platforms
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Full automation suite
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      24/7 dedicated support
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Unlimited team members
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      White-label options
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Custom integrations
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">
                      Advanced security
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">Custom reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">Account manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
