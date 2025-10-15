"use client";
import React, { useEffect, useState } from "react";
import { Plus, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Platform Data ---
const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram size={20} className="text-slate-500" />,
  },
  {
    id: "x",
    name: "X (Twitter)",
    icon: <Twitter size={20} className="text-slate-500" />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin size={20} className="text-slate-500" />,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <Facebook size={20} className="text-slate-500" />,
  },
];

const GenerateAIContent = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const [selectedPlatforms, setSelectedPlatforms] = useState({});
  const [brief, setBrief] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const router = useRouter();

  // Safely read JSON only if the response is JSON, otherwise return null
  const readJsonSafely = async (response) => {
    const contentType = response.headers?.get?.("content-type") || "";
    if (contentType.includes("application/json")) {
      try {
        return await response.json();
      } catch (_) {
        return null;
      }
    }
    // Fallback: try to parse text as JSON, otherwise return null
    try {
      const text = await response.text();
      return JSON.parse(text);
    } catch (_) {
      return null;
    }
  };

  const buildHttpError = async (response, defaultMessage) => {
    const body = await readJsonSafely(response);
    const messageFromBody = body?.message || body?.error || body?.detail;
    const statusInfo = `(${response.status}${
      response.statusText ? " " + response.statusText : ""
    })`;
    const err = new Error(
      messageFromBody || `${defaultMessage} ${statusInfo}`.trim()
    );
    err.status = response.status;
    return err;
  };

  const handlePlatformChange = (platformId) => {
    setSelectedPlatforms((prevSelected) => ({
      ...prevSelected,
      [platformId]: !prevSelected[platformId],
    }));
  };

  // --- Load history from the database on mount ---
  // --- Load persisted brief/platforms from sessionStorage on mount ---
  useEffect(() => {
    try {
      const storedBrief = sessionStorage.getItem("creativeBrief");
      const storedPlatforms = sessionStorage.getItem("targetPlatforms");
      if (storedBrief) setBrief(storedBrief);
      if (storedPlatforms) {
        const parsed = JSON.parse(storedPlatforms);
        if (parsed && typeof parsed === "object") setSelectedPlatforms(parsed);
      }
    } catch (_) {}
  }, []);

  // --- Persist brief/platforms changes to sessionStorage ---
  useEffect(() => {
    try {
      sessionStorage.setItem("creativeBrief", brief || "");
      sessionStorage.setItem(
        "targetPlatforms",
        JSON.stringify(selectedPlatforms || {})
      );
    } catch (_) {}
  }, [brief, selectedPlatforms]);

  // --- Load history from the database on mount ---
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem("authToken"); // Get token from sessionStorage
        if (!token) {
          setError("Please log in to view your generated posts.");
          router.push("/login");
          return; // Do not proceed without a token
        }

        const response = await fetch(`${apiUrl}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Avoid parsing HTML error pages as JSON
          throw await buildHttpError(response, "Failed to fetch history.");
        }

        const postsFromDb = await readJsonSafely(response);
        if (!postsFromDb) {
          throw new Error("History response was not valid JSON.");
        }
        setHistory(postsFromDb);
      } catch (err) {
        console.error("Error fetching history:", err);
        if (err?.status === 401 || err?.status === 403) {
          try {
            sessionStorage.removeItem("authToken");
          } catch (_) {}
          setError("Your session expired. Please log in again.");
          router.push("/login");
          return;
        }
      }
    };

    fetchHistory();
  }, [apiUrl, router]);

  /**
   * Helper function to save the generated content to the database.

   */

  const saveContentToDb = async (generatedData, token) => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(generatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the post to the database.");
      }
      const saved = await readJsonSafely(response);
      console.log("Content saved to database successfully!", saved);
      return saved?.post?._id;
    } catch (error) {
      console.error("Error saving to DB:", error.message);
      setError(
        "Content was generated but failed to save. You can try saving it manually later."
      );
      return null;
    }
  };

  /**
   * Main function to handle content generation and saving.
   */
  const handleGenerateContent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setError("Your session has ended. Please log in again.");
        router.push("/login");
        return; // Stop handling without token
      }

      // Step 1: Generate text-only content (postContent, aiImagePrompt, per-platform hashtags)
      const generateResponse = await fetch(`${apiUrl}/create-text-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          brief,
          platforms: Object.keys(selectedPlatforms).filter(
            (key) => selectedPlatforms[key]
          ),
        }),
      });

      if (!generateResponse.ok) {
        const err = await buildHttpError(
          generateResponse,
          "Failed to generate content."
        );
        if (err?.status === 401 || err?.status === 403) {
          try {
            sessionStorage.removeItem("authToken");
          } catch (_) {}
          setError("Your session expired. Please log in again.");
          router.push("/login");
          return;
        }
        throw err;
      }
      const textPlan = await readJsonSafely(generateResponse);
      if (!textPlan) {
        throw new Error("Generate response was not valid JSON.");
      }
      // Show text immediately
      setResult(textPlan);

      // Save text-only draft (imageUrl: null) and redirect to editor; image will be generated there
      const newPostId = await saveContentToDb(textPlan, token);
      if (newPostId) {
        router.push(`/content/post?id=${newPostId}`);
      } else {
        console.error("Could not get a new post ID, staying on page.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setImageLoading(false);
    }
  };

  /**
   * Handles clicking a "View" button on a history item.
   */
  const handleViewHistory = (post) => {
    router.push(`/content/post?id=${post._id}`);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen text-slate-800 p-6 lg:p-8">
      <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm p-6 lg:p-8">
        {/* Creative Brief Section */}
        <div className="pb-8 border-b border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-800">
            Creative Brief
          </h2>
          <p className="text-slate-600 mt-1">
            Describe the topic or idea for your social media post. The more
            detail, the better the result.
          </p>
          <div className="mt-4">
            <textarea
              className="block w-full px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32 resize-none"
              placeholder="e.g., A post about the top 5 benefits of using our new productivity app..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Target Platforms Section */}
        <div className="pb-8 border-b border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-800">
            Target Platforms
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => (
              <label
                key={platform.id}
                htmlFor={platform.id}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedPlatforms[platform.id]
                    ? "bg-blue-50 border-blue-400 ring-2 ring-blue-200"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                {platform.icon}
                <span className="font-medium text-slate-700 flex-grow">
                  {platform.name}
                </span>
                <input
                  type="checkbox"
                  id={platform.id}
                  name={platform.id}
                  checked={!!selectedPlatforms[platform.id]}
                  onChange={() => handlePlatformChange(platform.id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-4">
            Select the social media platforms you want to target.
          </p>
        </div>

        {/* Footer Buttons */}
        <form
          onSubmit={handleGenerateContent}
          className="flex justify-end space-x-3 pt-6 border-t border-slate-200"
        >
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50"
            onClick={() => {
              setBrief("");
              setSelectedPlatforms({});
              setResult(null);
              setError(null);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isLoading ||
              !brief.trim() ||
              Object.values(selectedPlatforms).every((v) => !v)
            }
            className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Plus size={16} className="mr-2 -ml-1" /> Generate Content
              </>
            )}
          </button>
        </form>

        {/* Error and Result Display */}
        {error && (
          <p className="text-sm text-red-600 mt-4 text-center">{error}</p>
        )}
        {result && (
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="font-semibold text-gray-700 mb-2">
              Text ready
              {imageLoading ? " — generating image…" : " — image ready"}
            </h3>
            <pre className="text-xs text-gray-600 whitespace-pre-wrap bg-white p-2 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Recent AI Generations - from the database */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Recent AI Generations
        </h2>
        {history && history.length > 0 ? (
          <div className="space-y-3">
            {history.map((h) => (
              <div
                key={h._id}
                className="bg-blue-50/60 border border-blue-100 rounded-lg p-4 flex items-start justify-between"
              >
                <div className="pr-4">
                  <h3 className="font-medium text-blue-900 mb-1">
                    {(h.content?.postContent || "Generated Post").slice(0, 60)}
                  </h3>
                  <p className="text-blue-800/80 text-sm line-clamp-1">
                    {h.content?.platforms
                      ? Object.keys(h.content.platforms).join(", ")
                      : ""}
                  </p>
                  <p className="text-xs text-blue-700/70 mt-1">
                    Generated {new Date(h.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleViewHistory(h)}
                  className="text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
            <h3 className="text-slate-800 font-semibold">
              No generated content yet
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Create one and grow fast with AI-powered posts.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GenerateAIContent;
