"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [postsThisMonth, setPostsThisMonth] = useState(0);
  const [connected, setConnected] = useState({ facebook: false, instagram: false, linkedin: false });
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState('success'); // 'success' | 'error'
  // --- Social connect helpers ---
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const metaAppId = process.env.NEXT_PUBLIC_META_APP_ID; // set this in .env.local
  const [showConnectPanel, setShowConnectPanel] = useState(false);
  // LinkedIn personal only (no page selection)

  const openFacebookConnect = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    if (!metaAppId || !token) return;
    const redirectUri = encodeURIComponent("http://localhost:5000/api/social/facebook/callback");
    const scopes = encodeURIComponent("pages_show_list,pages_manage_posts,instagram_basic,instagram_content_publish");
    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${metaAppId}&redirect_uri=${redirectUri}&state=${token}&scope=${scopes}&auth_type=rerequest`;
    if (typeof window !== "undefined") window.location.href = url;
  };

  const openInstagramConnect = () => {
    // Uses the same Facebook OAuth; IG permissions are included in scopes above
    openFacebookConnect();
  };

  const openLinkedInConnect = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    if (!token) return;
    const url = `${apiUrl}/social/linkedin/auth?token=${encodeURIComponent(token)}`;
    if (typeof window !== "undefined") window.location.href = url;
  };


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
        const hasFb = !!profile?.social?.facebook?.pageId;
        const hasIg = !!profile?.social?.instagram?.igBusinessId;
        const hasLi = !!profile?.social?.linkedin?.memberId;
        setConnected({ facebook: hasFb, instagram: hasIg, linkedin: hasLi });
      } catch (_) {
        // ignore
      }

      // Also verify LinkedIn connection via status endpoint (ensures token validity)
      try {
        const liRes = await fetch(`${apiUrl}/social/linkedin/status`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        if (liRes.ok) {
          const { connected: liConnected } = await liRes.json();
          if (typeof liConnected === 'boolean') {
            setConnected(prev => ({ ...prev, linkedin: liConnected }));
          }
        }
      } catch (_) { /* ignore */ }
    })();
  }, []);

  // Handle post-OAuth redirect toast and cleanup query param
  useEffect(() => {
    const c = searchParams?.get('connected');
    const err = searchParams?.get('connect_error');
    const noPages = searchParams?.get('no_pages');
    const igError = searchParams?.get('instagram_error');
    if (!c && !err && !igError) return;

    // First, refresh profile to reflect new connection, then decide what toast to show
    (async () => {
      try {
        const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
        if (token) {
          const res = await fetch(`${apiUrl}/profile/me`, { headers: { Authorization: `Bearer ${token}` } });
          if (res.ok) {
            const profile = await res.json();
            const hasFb = !!profile?.social?.facebook?.pageId;
            const hasIg = !!profile?.social?.instagram?.igBusinessId;
            const hasLi = !!profile?.social?.linkedin?.memberId;
            setConnected({ facebook: hasFb, instagram: hasIg, linkedin: hasLi });

            // Success toasts
            if (c) {
              const platforms = c.split(',');
              if (platforms.length > 1) {
                setToastType('success');
                setToast(`Facebook and Instagram connected successfully`);
              } else {
                const name = c === 'facebook' ? 'Facebook' : c === 'instagram' ? 'Instagram' : c;
                setToastType('success');
                setToast(`${name} connected successfully`);
              }
            }

            // Error toasts (suppress page error if already connected)
            if (err === 'true') {
              if (noPages === 'true' && hasFb) {
                // Suppress stale no_pages error if FB is actually connected now
              } else if (noPages === 'true') {
                setToastType('error');
                setToast('Connection failed. You must have at least one Facebook Page linked to your account.');
              } else {
                setToastType('error');
                setToast('Connection failed. Please try again.');
              }
            }

            if (igError === 'true') {
              setToastType('error');
              setToast('Facebook connected, but Instagram account is not linked to your Facebook Page. Please connect your Instagram Business Account to your Facebook Page in Meta Business settings.');
            }
          }
        }
      } catch (_) {}

      // Remove the querystring for a clean URL
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('connected');
        url.searchParams.delete('connect_error');
        url.searchParams.delete('no_pages');
        url.searchParams.delete('instagram_error');
        window.history.replaceState({}, '', url.toString());
      } catch (_) {}
    })();
  }, [searchParams]);

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
      {toast && <Toast message={toast} type={toastType} onClose={() => setToast("")} />}
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
        <StatCard title="Connected Platforms" value={`${(connected.facebook ? 1 : 0) + (connected.instagram ? 1 : 0) + (connected.linkedin ? 1 : 0)}`} />

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
          <Card className="p-0 min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/70">
              <h3 className="text-base font-semibold text-slate-800">Platform Performance</h3>
              <button
                type="button"
                onClick={() => setShowConnectPanel(v => !v)}
                className="px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold"
              >
                {showConnectPanel ? 'Close' : 'Connect platforms'}
              </button>
            </div>
            {!showConnectPanel ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  {!(connected.facebook || connected.instagram || connected.linkedin) ? (
                    <>
                      <div className="bg-slate-100 rounded-full inline-flex p-4 mb-4">
                        <Compass size={28} className="text-slate-500" />
                      </div>
                      <p className="text-slate-600">No platforms connected yet. Connect a platform to enable direct publishing and analytics.</p>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg border ${connected.facebook ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-blue-700">Facebook</div>
                            <div className="text-xs mt-1 text-blue-700/80">{connected.facebook ? 'Connected' : 'Not connected'}</div>
                          </div>
                          {connected.facebook ? (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  const token = sessionStorage.getItem('authToken');
                                  if (!token) return;
                                  const res = await fetch(`${apiUrl}/social/disconnect`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ platform: 'facebook' }) });
                                  if (res.ok) {
                                    setConnected(prev => ({ ...prev, facebook: false }));
                                    setToastType('success'); setToast('Facebook disconnected'); setTimeout(() => setToast(''), 2000);
                                  }
                                } catch (_) {}
                              }}
                              className="text-xs border border-blue-300 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
                            >Disconnect</button>
                          ) : null}
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg border ${connected.instagram ? 'border-pink-200 bg-pink-50' : 'border-slate-200 bg-white'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-pink-700">Instagram</div>
                            <div className="text-xs mt-1 text-pink-700/80">{connected.instagram ? 'Connected' : 'Not connected'}</div>
                          </div>
                          {connected.instagram ? (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  const token = sessionStorage.getItem('authToken');
                                  if (!token) return;
                                  const res = await fetch(`${apiUrl}/social/disconnect`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ platform: 'instagram' }) });
                                  if (res.ok) {
                                    setConnected(prev => ({ ...prev, instagram: false }));
                                    setToastType('success'); setToast('Instagram disconnected'); setTimeout(() => setToast(''), 2000);
                                  }
                                } catch (_) {}
                              }}
                              className="text-xs border border-pink-300 text-pink-700 px-2 py-1 rounded hover:bg-pink-100"
                            >Disconnect</button>
                          ) : null}
                        </div>
                      </div>
                    <div className={`p-4 rounded-lg border ${connected.linkedin ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-sky-700">LinkedIn</div>
                          <div className="text-xs mt-1 text-sky-700/80">{connected.linkedin ? 'Connected' : 'Not connected'}</div>
                        </div>
                        {connected.linkedin ? (
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                const token = sessionStorage.getItem('authToken');
                                if (!token) return;
                                const res = await fetch(`${apiUrl}/social/disconnect`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ platform: 'linkedin' }) });
                                if (res.ok) {
                                  setConnected(prev => ({ ...prev, linkedin: false }));
                                  setToastType('success'); setToast('LinkedIn disconnected'); setTimeout(() => setToast(''), 2000);
                                }
                              } catch (_) {}
                            }}
                            className="text-xs border border-sky-300 text-sky-700 px-2 py-1 rounded hover:bg-sky-100"
                          >Disconnect</button>
                        ) : null}
                      </div>
                    </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={!connected.instagram ? openInstagramConnect : undefined}
                    disabled={connected.instagram}
                    className={`w-full text-left p-4 rounded-lg border transition ${connected.instagram ? 'border-pink-200 bg-pink-50 text-pink-700 cursor-not-allowed' : 'border-pink-200 bg-pink-50 hover:bg-pink-100'}`}
                  >
                    <div className="text-pink-700 font-semibold">{connected.instagram ? 'Instagram (connected)' : 'Connect Instagram'}</div>
                    <div className="text-xs text-pink-700/80 mt-1">Publish images with captions to your IG business account.</div>
                  </button>
                  <button
                    type="button"
                    onClick={!connected.facebook ? openFacebookConnect : undefined}
                    disabled={connected.facebook}
                    className={`w-full text-left p-4 rounded-lg border transition ${connected.facebook ? 'border-blue-200 bg-blue-50 text-blue-700 cursor-not-allowed' : 'border-blue-200 bg-blue-50 hover:bg-blue-100'}`}
                  >
                    <div className="text-blue-700 font-semibold">{connected.facebook ? 'Facebook (connected)' : 'Connect Facebook'}</div>
                    <div className="text-xs text-blue-700/80 mt-1">Post photos with captions directly to your Page.</div>
                  </button>
                  <button
                    type="button"
                    onClick={!connected.linkedin ? openLinkedInConnect : undefined}
                    disabled={connected.linkedin}
                    className={`w-full text-left p-4 rounded-lg border transition ${connected.linkedin ? 'border-sky-200 bg-sky-50 text-sky-700 cursor-not-allowed' : 'border-sky-200 bg-sky-50 hover:bg-sky-100'}`}
                  >
                    <div className="text-sky-700 font-semibold">{connected.linkedin ? 'LinkedIn (connected)' : 'Connect LinkedIn'}</div>
                    <div className="text-xs text-sky-700/80 mt-1">Publish text posts to your LinkedIn account.</div>
                  </button>
                  
                  <button
                    type="button"
                    disabled
                    className="w-full text-left p-4 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                  >
                    <div className="font-semibold">Connect X</div>
                    <div className="text-xs mt-1">Coming soon.</div>
                  </button>
                </div>
              </div>
            )}
          </Card>
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

// Lightweight toast
function Toast({ message, onClose, type = 'success' }) {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`${isError ? 'bg-red-600' : 'bg-emerald-600'} text-white text-sm px-4 py-3 rounded-md shadow-lg flex items-center gap-3`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white/90 hover:text-white text-xs">Dismiss</button>
      </div>
    </div>
  );
}
