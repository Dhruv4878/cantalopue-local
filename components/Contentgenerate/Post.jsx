
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Instagram, Facebook, Linkedin, Twitter, Edit, RefreshCw, Copy, Trash2, Plus, ChevronDown, Check } from 'lucide-react';

// --- Helper Components ---
const platformIcons = {
  instagram: <Instagram size={16} />,
  facebook: <Facebook size={16} />,
  linkedin: <Linkedin size={16} />,
  x: <Twitter size={16} />,
};

const PostEditor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [generatedData, setGeneratedData] = useState(null);
  const [postId, setPostId] = useState(null); // ADDED: State to hold the post ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [editedHashtags, setEditedHashtags] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // add this in post editor
  const [imageGenerating, setImageGenerating] = useState(false);
  const [isRegenerateMenuOpen, setIsRegenerateMenuOpen] = useState(false);
  const [regenerateOptions, setRegenerateOptions] = useState({
    text: false,
    hashtags: false,
    image: false,
    post: false,
  });
  const [applyToAllPlatforms, setApplyToAllPlatforms] = useState(false);
  const [isAddPlatformsOpen, setIsAddPlatformsOpen] = useState(false);
  const [captionLoading, setCaptionLoading] = useState(false);
  const [hashtagsLoading, setHashtagsLoading] = useState(false);
  const [addPlatformsSelection, setAddPlatformsSelection] = useState({});
  const [addPlatformsLoading, setAddPlatformsLoading] = useState(false);
  const regenerateMenuContainerRef = useRef(null);
  const addPlatformsContainerRef = useRef(null);

  // When long-running ops are active, disable the rest of the UI actions
  const uiDisabled = imageGenerating || addPlatformsLoading || captionLoading || hashtagsLoading;

  // Close dropdowns when clicking anywhere on the screen (outside the menus)
  useEffect(() => {
    function handleDocClick(e) {
      try {
        const regNode = regenerateMenuContainerRef.current;
        const addNode = addPlatformsContainerRef.current;
        const clickedInsideReg = regNode && regNode.contains(e.target);
        const clickedInsideAdd = addNode && addNode.contains(e.target);
        if (!clickedInsideReg) setIsRegenerateMenuOpen(false);
        if (!clickedInsideAdd) setIsAddPlatformsOpen(false);
      } catch (_) {}
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);


  function handlerRegenerate() {
    router.push('/content/generate');
  }

  const toggleRegenerateOption = (key) => {
    setRegenerateOptions(prev => {
      if (key === 'post') {
        const nextPost = !prev.post;
        return nextPost
          ? { text: false, hashtags: false, image: false, post: true }
          : { ...prev, post: false };
      }
      if (prev.post) {
        // When 'Regenerate post' is selected, other options are disabled
        return prev;
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const handleRegeneratePost = () => {
    router.push('/content/generate');
  };

  const handleRegenerateSelected = async () => {
    if (!generatedData || !activeTab) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
    if (!token) return;

    try {
      // If user selected full post regenerate, keep current behavior
      if (regenerateOptions.post) {
        handleRegeneratePost();
        return;
      }

      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      let updated = { ...generatedData, platforms: { ...generatedData.platforms } };
      const allPlatformKeys = Object.keys(updated.platforms || {});
      const targetPlatforms = applyToAllPlatforms ? allPlatformKeys : [activeTab];

      // Run selected operations concurrently
      const promises = [];
      let captionsResult = null;
      if (regenerateOptions.text) {
        setCaptionLoading(true);
        const body = JSON.stringify({ postContent: generatedData.postContent, platforms: targetPlatforms });
        const p = fetch(`${apiUrl}/regenerate-captions`, { method: 'POST', headers, body })
          .then(async (res) => (res.ok ? res.json() : null))
          .then((json) => { captionsResult = json; })
          .catch(() => {});
        promises.push(p);
      }

      const hashtagResults = {};
      if (regenerateOptions.hashtags) {
        setHashtagsLoading(true);
        for (const p of targetPlatforms) {
          const baseCaption = (generatedData.platforms?.[p]?.caption || generatedData.postContent || '').toString();
          const body = JSON.stringify({ platforms: [p], caption: baseCaption });
          const hp = fetch(`${apiUrl}/regenerate-hashtags`, { method: 'POST', headers, body })
            .then(async (res) => (res.ok ? res.json() : null))
            .then((json) => { hashtagResults[p] = json?.platforms?.[p]?.hashtags || null; })
            .catch(() => { hashtagResults[p] = null; });
          promises.push(hp);
        }
      }

      // Wait for all selected operations to finish
      if (promises.length) {
        await Promise.all(promises);
      }

      // Apply captions result
      if (captionsResult && captionsResult.platforms) {
        for (const p of targetPlatforms) {
          const newCaption = captionsResult?.platforms?.[p]?.caption;
          const newHashtagsFromCaption = captionsResult?.platforms?.[p]?.hashtags;
          if (!updated.platforms[p]) updated.platforms[p] = {};
          if (newCaption) updated.platforms[p].caption = newCaption;
          if (!regenerateOptions.hashtags && Array.isArray(newHashtagsFromCaption)) {
            updated.platforms[p].hashtags = newHashtagsFromCaption;
          }
        }
      }

      // Apply hashtags results
      if (regenerateOptions.hashtags) {
        for (const p of targetPlatforms) {
          const newTags = hashtagResults[p];
          if (!updated.platforms[p]) updated.platforms[p] = {};
          if (Array.isArray(newTags)) updated.platforms[p].hashtags = newTags;
        }
      }

      setCaptionLoading(false);
      setHashtagsLoading(false);

      // Image regeneration (shared image)
      if (regenerateOptions.image) {
        setImageGenerating(true);
        // Enforce a max of 3 regenerated images
        const currentVariantCount = Array.isArray(generatedData.imageVariants) ? generatedData.imageVariants.length : 0;
        if (currentVariantCount >= 3) {
          setImageGenerating(false);
          if (typeof window !== 'undefined') {
            window.alert('Enough images generated. Please create a new post to generate more.');
          }
          // Skip further image generation
          // Note: still allow caption/hashtags regeneration in the same action
        } else {
        // Before changing, capture current image as first version if not stored yet
        const existingVariants = Array.isArray(updated.imageVariants) ? updated.imageVariants : [];
        const previousImageUrl = updated.imageUrl;
        if (previousImageUrl && existingVariants.length === 0) {
          updated.imageVariants = [...existingVariants, previousImageUrl];
          if (postId) {
            await fetch(`${apiUrl}/posts/${postId}`, {
              method: 'PUT', headers,
              body: JSON.stringify({ content: updated, imageUrlVariant: previousImageUrl })
            });
          }
        }

        const res = await fetch(`${apiUrl}/generate-image`, {
          method: 'POST', headers, body: JSON.stringify({ aiImagePrompt: generatedData.aiImagePrompt })
        });
        if (res.ok) {
          const json = await res.json();
          if (json?.imageUrl) {
            // set as current image
            updated.imageUrl = json.imageUrl;
            // update variants locally for immediate UI
            const existing = Array.isArray(updated.imageVariants) ? updated.imageVariants : [];
            updated.imageVariants = [...existing, json.imageUrl];
            // also push into imageVariants when persisting
            if (postId) {
              await fetch(`${apiUrl}/posts/${postId}`, {
                method: 'PUT', headers,
                body: JSON.stringify({ content: updated, imageUrlVariant: json.imageUrl })
              });
            }
          }
        }
        }
        setImageGenerating(false);
      }

      // Persist any changes
      if (postId && !regenerateOptions.image) {
        await fetch(`${apiUrl}/posts/${postId}`, {
          method: 'PUT', headers, body: JSON.stringify({ content: updated })
        });
      }
      setGeneratedData(updated);
    } finally {
      // Close and reset menu selections (except post)
      setIsRegenerateMenuOpen(false);
      setRegenerateOptions({ text: false, hashtags: false, image: false, post: false });
    }
  };
  
  useEffect(() => {
    const loadFromDb = async () => {
      setLoading(true);
      const id = searchParams.get('id');
      setPostId(id); // ADDED: Store the ID for later use (like saving)

      // If there is no ID, we don't know what to load.
      if (!id) {
        setError('No post ID provided. Please select a post to view.');
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
        
        if (!token) {
            setError('Your session has ended. Please log in again.');
            setLoading(false);
            router.push('/login');
            return;
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        // --- SIMPLIFIED FETCH LOGIC ---
        // Always fetch the specific post using its ID from the URL
        const res = await fetch(`${apiUrl}/posts/${id}`, { headers });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            setError('Session expired. Please log in again.');
            setLoading(false);
            router.push('/login');
            return;
          }
          const text = await res.text();
          throw new Error(`Failed to load post (${res.status}) ${text}`);
        }
        
        const post = await res.json();
        const content = post?.content;

        if (!content) {
          setError('Post record is missing content');
          setLoading(false);
          return;
        }
        
        setGeneratedData(content);
        const platforms = Object.keys(content.platforms || {});
        if (platforms.length > 0) setActiveTab(prev => prev || platforms[0]);

      } catch (e) {
        console.error(e);
        setError(e.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    loadFromDb();
  }, [searchParams, router]); // Dependency array updated

  // Auto-generate image on first load if missing, using aiImagePrompt
  useEffect(() => {
    const generateIfMissing = async () => {
      if (!generatedData || generatedData.imageUrl || imageGenerating) return;
      const aiImagePrompt = generatedData.aiImagePrompt;
      if (!aiImagePrompt) return;
      try {
        setImageGenerating(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
        if (!token) return;
        const resp = await fetch(`${apiUrl}/generate-image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ aiImagePrompt })
        });
        if (!resp.ok) return;
        const data = await resp.json();
        if (!data?.imageUrl) return;
        const updated = { ...generatedData, imageUrl: data.imageUrl };
        setGeneratedData(updated);
        // Persist to DB so reload shows the image
        if (postId) {
          await fetch(`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api')}/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ content: updated })
          });
        }
      } finally {
        setImageGenerating(false);
      }
    };
    generateIfMissing();
  }, [generatedData, imageGenerating, postId]);

  // ... (rest of the component is mostly the same until saveEdits)

  const saveEdits = async () => {
    if (!hasChanges || !postId) return; // ADDED: Check for postId
    setIsSaving(true);
    
    try {
        // Prepare the updated content object
        const updatedContent = { ...generatedData };
        if (!updatedContent.platforms[activeTab]) {
            updatedContent.platforms[activeTab] = {};
        }
        updatedContent.platforms[activeTab].caption = editedText;
        updatedContent.platforms[activeTab].hashtags = editedHashtags.split(/\s+/).map(h => h.trim()).filter(Boolean);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = sessionStorage.getItem('authToken');

        // --- FIXED: Use PUT to update the existing post by its ID ---
        const response = await fetch(`${apiUrl}/posts/${postId}`, { // CHANGED: Use postId in URL
            method: 'PUT', // CHANGED: Use PUT for updating
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ content: updatedContent }), // Send the updated content in the body
        });
        
        if (!response.ok) {
            throw new Error('Failed to save changes to the server.');
        }

        // Update the local state to reflect the saved changes
        setGeneratedData(updatedContent);
        setIsEditing(false);

    } catch (e) {
        console.error('Failed to save post edits', e);
        // Optionally, show an error message to the user
    } finally {
        setIsSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!postId || isDeleting) return;

  const confirmDelete = window.confirm('Are you sure you want to delete this post?');
  if (!confirmDelete) return;

  try {
    setIsDeleting(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
    if (!token) {
      setError('Your session has ended. Please log in again.');
      router.push('/login');
      return;
    }

    const res = await fetch(`${apiUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to delete post');
    }

    // After successful delete, navigate back to generate or history
    router.push('/content/generate');
  } catch (e) {
    console.error('Failed to delete post:', e);
    setError(e.message || 'Failed to delete post');
  } finally {
    setIsDeleting(false);
  }
};
  // --- JSX REMAINS THE SAME ---
  // No changes needed for the returned JSX structure.
  // The logic inside is now powered by the corrected state management.
  
  if (loading) return <div className="text-center p-4">Loading post...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  if (!generatedData || !generatedData.platforms) return <div className="text-center p-8">No generated content found.</div>;

  const { imageUrl, platforms } = generatedData;
  const platformNames = Object.keys(platforms);
  const activeTabData = platforms[activeTab];

  if (!activeTabData) {
    return <div className="text-center p-8">No content available for the selected platform.</div>;
  }

  const startEditing = () => {
    if (!activeTab) return;
    setEditedText(activeTabData?.caption || ''); 
    setEditedHashtags((activeTabData?.hashtags || []).join(' '));
    setIsEditing(true);
  };

  const hasChanges = isEditing && (
    editedText !== (activeTabData?.caption || '') ||
    editedHashtags.trim() !== (activeTabData?.hashtags || []).join(' ')
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50/50">
      {/* ... The rest of your JSX ... */}
      <div className="flex-1 bg-white shadow rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Generated Post</h1>
          <div className="flex space-x-2 relative">
            <button onClick={startEditing} disabled={uiDisabled} className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm ${uiDisabled ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <Edit size={14} />
              <span>Edit Post</span>
            </button>
            <div className="relative" ref={regenerateMenuContainerRef}>
              <button
                type="button"
                onClick={() => !uiDisabled && setIsRegenerateMenuOpen(v => !v)}
                disabled={uiDisabled}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm ${uiDisabled ? 'bg-indigo-300 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                <RefreshCw size={14} />
                <span>Regenerate</span>
                <ChevronDown size={14} />
              </button>
              {isRegenerateMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="p-2 text-sm text-gray-700 font-medium border-b">Choose what to regenerate</div>
                  <div className="p-2 space-y-1">
                    <label className={`flex items-center gap-2 px-2 py-1 rounded ${regenerateOptions.post ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}` }>
                      <input
                        type="checkbox"
                        checked={!!regenerateOptions.text}
                        onChange={() => toggleRegenerateOption('text')}
                        className="h-4 w-4"
                        disabled={regenerateOptions.post || uiDisabled}
                      />
                      <span>Regenerate post text</span>
                    </label>
                    <label className={`flex items-center gap-2 px-2 py-1 rounded ${regenerateOptions.post ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}` }>
                      <input
                        type="checkbox"
                        checked={!!regenerateOptions.hashtags}
                        onChange={() => toggleRegenerateOption('hashtags')}
                        className="h-4 w-4"
                        disabled={regenerateOptions.post || uiDisabled}
                      />
                      <span>Regenerate hashtags</span>
                    </label>
                    <label className={`flex items-center gap-2 px-2 py-1 rounded ${regenerateOptions.post ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}` }>
                      <input
                        type="checkbox"
                        checked={!!regenerateOptions.image}
                        onChange={() => toggleRegenerateOption('image')}
                        className="h-4 w-4"
                        disabled={regenerateOptions.post || uiDisabled}
                      />
                      <span>Regenerate image</span>
                    </label>
                    {/* <label className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={!!applyToAllPlatforms}
                        onChange={() => setApplyToAllPlatforms(v => !v)}
                        className="h-4 w-4"
                        disabled={uiDisabled}
                      />
                      <span>Apply to all platforms</span>
                    </label> */}
                    <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!regenerateOptions.post}
                        onChange={() => toggleRegenerateOption('post')}
                        className="h-4 w-4"
                        disabled={uiDisabled}
                      />
                      <span>Regenerate post</span>
                    </label>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-2 border-t bg-gray-50">
                    <button
                      type="button"
                      onClick={() => setIsRegenerateMenuOpen(false)}
                      disabled={uiDisabled}
                      className={`px-3 py-1.5 text-sm rounded-md border ${uiDisabled ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-gray-700 hover:bg-white'}`}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleRegenerateSelected}
                      disabled={uiDisabled}
                      className={`px-3 py-1.5 text-sm rounded-md ${uiDisabled ? 'bg-indigo-300 cursor-not-allowed text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                      Regenerate 
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Post Image</h2>
              {Array.isArray(generatedData.imageVariants) && generatedData.imageVariants.length > 0 && (
                <div className="flex items-center gap-2">
                  {generatedData.imageVariants.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => !uiDisabled && setGeneratedData(prev => ({ ...prev, imageUrl: url }))}
                      disabled={uiDisabled}
                      className={`px-2 py-1 text-xs rounded border ${generatedData.imageUrl === url ? 'bg-indigo-600 text-white border-indigo-600' : uiDisabled ? 'bg-white text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative w-full rounded-lg shadow-md border bg-white min-h-64 p-8">
              <div className="w-full h-full flex items-center justify-center">
              {imageGenerating && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
                  <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
                </div>
              )}
                {imageUrl ? (
                  <img src={imageUrl} alt="Generated Post" className="max-w-full max-h-[480px] object-contain" />
                ) : (!imageGenerating ? (
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className="text-gray-700 font-medium mb-4">Generating image…</div>
                    <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
                  </div>
                ) : null)}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 self-stretch h-full">
            <div className="mb-4 border-b">
              <nav className="flex space-x-4">
                {platformNames.map(platform => (
                  <button
                    key={platform}
                    onClick={() => !uiDisabled && setActiveTab(platform)}
                    disabled={uiDisabled}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium capitalize ${
                      activeTab === platform
                        ? 'border-indigo-500 text-indigo-600'
                        : uiDisabled ? 'border-transparent text-gray-300 cursor-not-allowed' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {platformIcons[platform]}
                    {platform}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <h3 className="font-medium text-gray-800 mb-2">Post Text</h3>
              {isEditing ? (
                <textarea
                  className="w-full text-sm rounded-md border border-gray-300 p-2"
                  rows={6}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <div className="relative">
                  {captionLoading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-indigo-500 animate-spin" />
                    </div>
                  )}
                  <p
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: (activeTabData?.caption || '').replace(/\n/g, '<br/>') }}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Suggested Hashtags for {activeTab}</h3>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full text-sm rounded-md border border-gray-300 p-2"
                  value={editedHashtags}
                  onChange={(e) => setEditedHashtags(e.target.value)}
                  placeholder="#tag1 #tag2"
                />
              ) : (
                <div className="relative">
                  {hashtagsLoading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-indigo-500 animate-spin" />
                    </div>
                  )}
                  <p className="text-blue-600 text-sm">{activeTabData.hashtags.join(' ')}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
              <button type="button" disabled={uiDisabled} className={`px-4 py-2 rounded-md text-sm font-medium ${uiDisabled ? 'bg-indigo-300 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>Post</button>
              <button type="button" disabled={uiDisabled} className={`px-4 py-2 rounded-md text-sm font-medium ${uiDisabled ? 'bg-white text-indigo-300 border border-indigo-100 cursor-not-allowed' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Schedule Post</button>
              {isEditing && (
                <button
                  type="button"
                  disabled={!hasChanges || isSaving || uiDisabled}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${(!hasChanges || isSaving || uiDisabled) ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
                  onClick={saveEdits}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Selected Platforms */}
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Selected Platforms</h2>
          <div className="space-y-2 text-sm">
            {platformNames && platformNames.length > 0 ? (
              platformNames.map(name => (
                <div key={name} className="flex items-center gap-2 px-3 py-2 rounded bg-gray-50 text-gray-700">
                  {platformIcons[name]}
                  <span className="capitalize">{name}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No platforms selected</div>
            )}
          </div>
          <div className="relative mt-3" ref={addPlatformsContainerRef}>
            <button
              type="button"
              onClick={() => !uiDisabled && setIsAddPlatformsOpen(v => !v)}
              disabled={uiDisabled}
              className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm border ${uiDisabled ? 'bg-indigo-50 text-indigo-300 border-indigo-100 cursor-not-allowed' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200'}`}
            >
              Add platforms
              <ChevronDown size={14} />
            </button>
            {isAddPlatformsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <div className="p-2 text-sm text-gray-700 font-medium border-b">Add more platforms</div>
                <div className="p-2 space-y-1">
                  {['instagram','x','linkedin','facebook'].map(p => {
                    const alreadySelected = platformNames.includes(p);
                    return (
                      <label key={p} className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${alreadySelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          disabled={alreadySelected}
                          checked={!!addPlatformsSelection[p] && !alreadySelected}
                          onChange={() => !alreadySelected && setAddPlatformsSelection(prev => ({ ...prev, [p]: !prev[p] }))}
                          className="h-4 w-4"
                        />
                        <span className="flex items-center gap-2 capitalize">{platformIcons[p]} {p}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end gap-2 p-2 border-t bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setIsAddPlatformsOpen(false)}
                    disabled={uiDisabled}
                    className={`px-3 py-1.5 text-sm rounded-md border ${uiDisabled ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-gray-700 hover:bg-white'}`}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setAddPlatformsLoading(true);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                      const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
                      const toAdd = Object.keys(addPlatformsSelection).filter(k => addPlatformsSelection[k] && !platformNames.includes(k));
                      if (!token || !generatedData || toAdd.length === 0) { setIsAddPlatformsOpen(false); setAddPlatformsSelection({}); return; }
                      try {
                        const res = await fetch(`${apiUrl}/create-text-plan`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                          body: JSON.stringify({ brief: generatedData.postContent || '', platforms: toAdd })
                        });
                        if (res.ok) {
                          const data = await res.json();
                          const merged = { ...generatedData, platforms: { ...(generatedData.platforms || {}) } };
                          Object.keys(data.platforms || {}).forEach(p => { merged.platforms[p] = data.platforms[p]; });
                          setGeneratedData(merged);
                          if (postId) {
                            await fetch(`${apiUrl}/posts/${postId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ content: merged }) });
                          }
                          if (toAdd[0]) setActiveTab(toAdd[0]);
                        }
                      } catch (_) { /* ignore */ }
                      setIsAddPlatformsOpen(false);
                      setAddPlatformsSelection({});
                      setAddPlatformsLoading(false);
                    }}
                    disabled={uiDisabled || addPlatformsLoading}
                    className={`px-3 py-1.5 text-sm rounded-md ${uiDisabled || addPlatformsLoading ? 'bg-indigo-300 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    {addPlatformsLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        Adding...
                      </span>
                    ) : (
                      'Add'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Post Details</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p><span className="font-medium text-gray-700">Status:</span> Generated</p>
            <p><span className="font-medium text-gray-700">Category:</span> AI GENERATED, DALL-E</p>
            <p><span className="font-medium text-gray-700">Model:</span> gpt-4o-mini</p>
          </div>
        </div> */}

        {/* <div className="bg-white shadow rounded-lg p-4 text-center border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Publish To Social Media</h2>
          <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-md text-gray-500">
            <Plus size={24} className="mb-1"/>
            <span>No social platforms connected</span>
            <button className="mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-sm hover:bg-indigo-100">
              Connect platforms
            </button>
            </div>
          </div> */}

          <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Other Actions</h2>
            <div className="space-y-2">
              {/* <button className="w-full text-left flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100">
                <Copy size={16} />
                <span>Duplicate Post</span>
              </button> */}
              <button
                onClick={handleDelete}
                disabled={isDeleting || uiDisabled}
                className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-md ${isDeleting || uiDisabled ? 'bg-red-100 text-red-300 cursor-not-allowed' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
              >
                <Trash2 size={16} />
                <span>{isDeleting ? 'Deleting...' : 'Delete Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PostEditor;