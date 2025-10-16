"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Using lucide-react for icons. Example: <Plus size={16} />
import {
  Plus,
  BarChart2,
  Calendar,
  Users,
  Compass,
  Lightbulb,
  AlertCircle,
  Star,
  MapPin,
  Zap,
} from "lucide-react";

// A reusable card component for consistent styling
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-slate-200/60 shadow-sm ${className}`}
  >
    {children}
  </div>
);

// Reusable component for the four main stats at the top
const StatCard = ({ title, value }) => (
  <Card className="p-5">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
  </Card>
);

// Reusable component for empty states (e.g., "No platforms connected")
const EmptyStateCard = ({ icon, title, actionText, actionLink }) => (
  <Card className="h-full flex flex-col items-center justify-center text-center p-6">
    <div className="bg-slate-100 rounded-full p-3">{icon}</div>
    <p className="text-slate-600 mt-3 font-medium">{title}</p>
    <a
      href={actionLink}
      className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-1"
    >
      {actionText} &rarr;
    </a>
  </Card>
);



// Main Dashboard Component
const Dashboard = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [postsThisMonth, setPostsThisMonth] = useState(0);

  // Load business header data from backend profile for the logged-in user
  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    if (!token) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return; // leave empty if no profile yet
        const profile = await res.json();
        setBusinessName((profile?.businessName || "").trim());
        setIndustry((profile?.industry || "").trim());
      } catch (_) {
        // ignore
      }
    })();
  }, []);

  // Fetch user's posts and compute count for the current month
  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    if (!token) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const posts = await res.json();
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const count = Array.isArray(posts)
          ? posts.filter(p => {
              const created = new Date(p?.createdAt);
              return created >= startOfMonth && created < startOfNextMonth;
            }).length
          : 0;
        setPostsThisMonth(count);
      } catch (_) {
        // ignore errors, keep default 0
      }
    })();
  }, []);
  function handleclick() {

  router.push("/content/generate");
}
  return (
    <main className="bg-slate-50/50 w-full p-6 lg:p-8">
      {/* Business header (above top stats) */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {businessName}
          </h1>
          {industry ? (
            <div className="flex items-center text-slate-500 mt-1">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">{industry}</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => router.push("/content/generate")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md font-semibold"
          >
            <Zap size={16} />
            <span>Generate Content</span>
          </button>
          <button
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-md font-semibold"
          >
            <BarChart2 size={16} />
            <span>Advanced Analytics</span>
          </button> */}
          {/* Replaces the Settings button with another Generate Content button */}
          <button
            onClick={() => router.push("/content/generate")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md font-semibold"
          >
            <Zap size={16} />
            <span>Generate Content</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Top Row: Stats */}
        <StatCard title="Total Engagement" value="0" />
        <StatCard title="Avg Engagement Rate" value="0.0%" />
        <Card className="p-5">
          <p className="text-sm text-slate-500">Posts This Month</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-3xl font-bold text-slate-800">{postsThisMonth}</p>
            <button
              type="button"
              onClick={() => router.push("/content/generatedpost")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-md"
            >
              View Posts
            </button>
          </div>
        </Card>
        <StatCard title="Connected Platforms" value="0" />

        {/* Chart Placeholders */}
        <Card className="lg:col-span-2 p-6 min-h-[350px]">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Engagement Trend</h3>
            <span className="text-sm text-slate-500">Last 30 days</span>
          </div>
          {/* Chart would be rendered here */}
        </Card>
        <Card className="lg:col-span-2 p-6 min-h-[350px]">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Content Creation</h3>
            <span className="text-sm text-slate-500">Last 30 days</span>
          </div>
          {/* Chart or content creation UI would be rendered here */}
        </Card>

        {/* Middle Row: Platform Performance & AI Insights */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-700 mb-3">
            Platform Performance
          </h3>
          <EmptyStateCard
            icon={<Compass size={24} className="text-slate-500" />}
            title="No platforms connected"
            actionText="Connect platforms"
            actionLink="#"
          />
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-700 mb-3">
            AI Insights & Recommendations
          </h3>
          <Card className="p-4 space-y-3">
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-md">
              <div className="flex items-start">
                <Lightbulb
                  size={20}
                  className="text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">
                    Increase Posting Frequency
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    You are posting 0 times per week. For better engagement and
                    reach, aim for 5-7 posts per week across your connected
                    platforms.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Confidence: 95% · 23 hours, 59 minutes ago ·{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Take Action
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50/70 border border-orange-200 p-4 rounded-md">
              <div className="flex items-start">
                <AlertCircle
                  size={20}
                  className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">
                    Low Engagement Rate Detected
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Your average engagement rate is 0.0%, which is below the
                    recommended 2-5%. Consider posting more interactive content,
                    asking questions, and engaging with your audience more
                    frequently.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Confidence: 90% · 23 hours, 59 minutes ago ·{" "}
                    <a
                      href="#"
                      className="text-orange-600 font-medium hover:underline"
                    >
                      Take Action
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}

        <div className="pt-6 lg:col-span-1">
          <h3 className="text-base font-semibold text-slate-700 mb-3">
            Top Performing Post
          </h3>
          <EmptyStateCard
            icon={<Star size={24} className="text-slate-500" />}
            title="No performance data available"
            actionText=""
            actionLink="#"
          />
        </div>

        <div className="pt-6 lg:col-span-1">
          <h3 className="text-base font-semibold text-slate-700 mb-3">
            Automation Status
          </h3>
          <Card className="p-6 h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <p className="text-slate-600">Active Schedules</p>
                <p className="font-semibold text-slate-800">0</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-slate-600">Scheduled Today</p>
                <p className="font-semibold text-slate-800">0</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-slate-600">AI Generations</p>
                <p className="font-semibold text-slate-800">0</p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View scheduler &rarr;
              </a>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div>
              <h3 className="text-base font-semibold text-slate-700 mb-3">
                Quick Actions
              </h3>
              <Card className="p-3 space-y-2">
                <button
                  onClick={handleclick}
                  className="w-full flex items-center space-x-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2.5 rounded-md justify-start"
                >
                  <Plus size={16} />
                  <span>Generate Content</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2.5 rounded-md justify-start">
                  <Calendar size={16} />
                  <span>Content Calendar</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2.5 rounded-md justify-start">
                  <Compass size={16} />
                  <span>Manage Platforms</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2.5 rounded-md justify-start">
                  <Users size={16} />
                  <span>Team Management</span>
                </button>
              </Card>
            </div>

            {/* <div className="bg-sky-50 border-2 border-sky-200 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-sky-900">
                  Content Quality Score
                </h4>
                <span className="text-xs font-bold text-sky-800 bg-sky-200 px-2 py-1 rounded-full">
                  17%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Boost your content quality
              </p>
              <div className="w-full bg-sky-200 rounded-full h-1.5 my-3">
                <div
                  className="bg-sky-500 h-1.5 rounded-full"
                  style={{ width: "17%" }}
                ></div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <p className="text-slate-600">Basic Info</p>
                  <span className="font-semibold text-emerald-600">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-600">Company Knowledge</p>
                  <span className="font-semibold text-slate-500">0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-600">Documents</p>
                  <span className="font-semibold text-slate-500">0%</span>
                </div>
              </div>
              <div className="border-t border-sky-200 my-4"></div>
              <div className="flex items-start">
                <Plus
                  size={18}
                  className="text-slate-500 mr-3 mt-0.5 flex-shrink-0"
                />
                <div>
                  <h5 className="font-semibold text-sm text-slate-800">
                    Add Your Company Story
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Share your origin story and mission to create more cohesive
                    content
                  </p>
                  <button className="text-xs font-semibold text-blue-600 mt-3 hover:underline">
                    Read impact, learn... &rarr;
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
