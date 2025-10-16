"use client";


import { Plus, Funnel } from "lucide-react";
 import { useRouter } from "next/navigation";
 import React, { useEffect, useState } from "react";

// A lightweight content library listing styled to match the app
 export default function Generatedpost() {
   const router = useRouter();
   const [businessName, setBusinessName] = useState("");
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
      
      } catch (_) {
        // ignore
      }
    })();
  }, []);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts for current user from backend; images are stored in content payload (e.g., Cloudinary URLs)
  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    if (!token) {
      setIsLoading(false);
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setIsLoading(false);
          return;
        }
        const raw = await res.json();
        const normalized = (Array.isArray(raw) ? raw : []).map((p) => {
          const c = p?.content || {};
          // Try common image fields that may contain Cloudinary URLs
          const image =
            c.imageUrl ||
            c.thumbnailUrl ||
            c?.instagram?.imageUrl ||
            c?.facebook?.imageUrl ||
            c?.linkedin?.imageUrl ||
            c?.twitter?.imageUrl ||
            null;
          // Title and excerpt fallbacks
          const platformsObj = c.platforms || {};
          const captionPriorityOrder = [
            'instagram', 'facebook', 'linkedin', 'x', 'twitter'
          ];
          let firstCaption = '';
          for (const key of captionPriorityOrder) {
            const maybe = platformsObj?.[key]?.caption;
            if (typeof maybe === 'string' && maybe.trim()) { firstCaption = maybe; break; }
          }
          const primaryText =
            c.postContent ||
            firstCaption ||
            c.title ||
            c.heading ||
            c.caption ||
            'Generated Post';
          const title = String(primaryText).slice(0, 80);
          const body =
            c.description ||
            firstCaption ||
            c.longForm ||
            '';
          const excerpt = String(body).slice(0, 180);
          const platforms = Object.keys(platformsObj || {}).map((k) => {
            if (k === 'x') return 'Twitter';
            if (k === 'linkedin') return 'LinkedIn';
            return k.charAt(0).toUpperCase() + k.slice(1);
          });
          return { id: p._id || p.id, image, title, excerpt, createdAt: p?.createdAt, platforms };
        });
        setItems(normalized);
      } catch (_) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <div className="px-6 pt-6">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500">
          <span className="font-medium text-slate-600">{businessName}</span>
          <span className="mx-2">/</span>
          <span className="text-slate-500">Posts</span>
        </div>

        {/* Header */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Content Library</h1>
            <p className="text-slate-500 mt-1">
              Manage all your AI-generated posts and content
            </p>
          </div>
           <button
             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md font-semibold"
             onClick={() => router.push("/content/generate")}
           >
            <Plus size={16} />
            <span>Generate New Post</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="mt-6 px-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4 grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white">
              <option>All Statuses</option>
              <option>Generated</option>
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Published</option>
            </select>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-slate-600 mb-1">Template</label>
            <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white">
              <option>All Templates</option>
              <option>Announcement</option>
              <option>Insights</option>
              <option>Promotion</option>
            </select>
          </div>
          <div className="lg:col-span-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="lg:col-span-2 flex items-end">
            <button className="inline-flex items-center gap-2 w-full justify-center border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-md font-semibold">
              <Funnel size={16} />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div> */}

      {/* Cards / Empty state */}
      <div className="px-6 pb-10 mt-6">
        {isLoading ? (
          <div className="text-center text-slate-500">Loading your posts…</div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
            <p className="text-slate-700 font-semibold">No posts yet</p>
            <p className="text-slate-500 text-sm mt-1">Generate your first post to get started.</p>
            <button
              onClick={() => router.push("/content/generate")}
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md font-semibold"
            >
              <Plus size={16} />
              <span>Generate Your First Post</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((post) => (
              <article key={post.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  {post.image ? (
                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                    
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No image</div>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-slate-900 leading-snug">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="inline-flex items-center text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      Generated
                    </span>
                    {post.createdAt ? (
                      <span className="text-xs text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => router.push(`/content/post?id=${encodeURIComponent(post.id)}`)}
                    className="w-full inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-md font-semibold text-sm"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


