import React from "react";
import Link from "next/link";


const plans = [
	{
		name: "Free",
		price: "Free",
		description: "Perfect for individuals and small creators getting started",
		features: [
			"4 AI-generated posts per month",
			"1 social media platform",
			"Basic scheduling",
			"Community support",
			"Content templates library",
		],
		button: "Continue with Free",
		highlight: false,
		color: "border-gray-200",
		href: "/content/generate",
	},
	{
		name: "Starter",
		price: "$49",
		description: "Perfect for small businesses getting started",
		features: [
			"30 AI-generated posts per month",
			"3 social media platforms",
			"Advanced scheduling automation",
			"Email support",
			"2 team members",
			"Content templates library",
			"Basic analytics",
		],
		button: "Choose Starter",
		highlight: false,
		color: "border-gray-200",
		href: "#",
	},
	{
		name: "Professional",
		price: "$149",
		description: "Ideal for growing businesses and agencies",
		features: [
			"200 AI-generated posts per month",
			"5 social media platforms",
			"Advanced scheduling & automation",
			"Priority support",
			"10 team members",
			"Custom content templates",
			"Advanced analytics & reporting",
			"Multi-platform publishing",
			"Content calendar",
			"Performance optimization",
			"API access",
		],
		button: "Choose Professional",
		highlight: true,
		color: "border-blue-600",
		href: "#",
	},
	{
		name: "Enterprise",
		price: "$499",
		description: "For large organizations and agencies",
		features: [
			"Unlimited AI-generated posts",
			"Unlimited social media platforms",
			"Full automation suite",
			"24/7 dedicated support",
			"Unlimited team members",
			"White-label options",
			"Custom integrations",
			"API access",
			"Advanced security",
			"Custom reporting",
			"Account manager",
		],
		button: "Choose Enterprise",
		highlight: false,
		color: "border-gray-200",
		href: "#",
	},
];

function CheckIcon() {
	return (
		<svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
			<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
		</svg>
	);
}


export default function ConfirmPlan({businessName}) {
	
	// You can get the business name from router/query/localStorage if needed
	// For now, hardcode as in screenshot
	const decodedName = typeof businessName === 'string' ? decodeURIComponent(businessName) : '';
	const displayName = decodedName.replace(/\s+/g, '-');

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center pt-32 pb-16 px-2">
			<div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mb-10 flex flex-col items-center">
				<div className="flex items-center mb-4">
					<span className="text-3xl mr-2">🎉</span>
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">Business Created Successfully!</h1>
				</div>
				<p className="text-gray-700 text-center mb-2">
					<span className="font-semibold">{displayName}</span> is ready to go. Now let's choose your subscription plan.
				</p>
				<h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 mb-2">Choose Your Subscription Plan</h2>
				<p className="text-gray-600 mb-6 text-center">Select the plan that best fits your business needs.</p>
			</div>

			<div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{plans.map((plan, idx) => (
					<div
						key={plan.name}
						className={`flex flex-col border-2 ${plan.color} rounded-2xl bg-white shadow-md p-8 relative ${plan.highlight ? "ring-2 ring-blue-600 scale-105 z-10" : ""}`}
					>
						{plan.highlight && (
							<span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-lg">MOST POPULAR</span>
						)}
						<h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{plan.name}</h3>
						<p className="text-gray-500 text-center mb-4 min-h-[48px]">{plan.description}</p>
						<div className="text-center mb-6">
							<span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
							{plan.name !== "Free" && <span className="text-base text-gray-500">/month</span>}
						</div>
						<ul className="mb-8 space-y-2">
							{plan.features.map((feature) => (
								<li key={feature} className="flex items-center text-gray-700">
									<CheckIcon />
									<span>{feature}</span>
								</li>
							))}
						</ul>
						<Link
							href={plan.href}
							className={`mt-auto w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${
								plan.highlight
									? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
									: "bg-gray-100 text-blue-600 hover:bg-blue-100 border border-blue-600"
							}`}
						>
							{plan.button}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
