  "use client";
  import React, { useState, useEffect } from 'react';
  import { useRouter, useSearchParams } from "next/navigation";
  import { Instagram, Facebook, Linkedin, Twitter, Edit, RefreshCw, Copy, Trash2, Plus } from 'lucide-react';

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


    function handlerRegenerate() {
      router.push('/content/generate');
    }
    
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
            <div className="flex space-x-2">
              <button onClick={startEditing} className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                <Edit size={14} />
                <span>Edit Post</span>
              </button>
              <button onClick={handlerRegenerate} className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                <RefreshCw size={14} />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Post Image</h2>
              <div className="w-full rounded-lg shadow-md border bg-white">
                <img src={imageUrl} alt="Generated Post" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="lg:col-span-5 self-stretch h-full">
              <div className="mb-4 border-b">
                <nav className="flex space-x-4">
                  {platformNames.map(platform => (
                    <button
                      key={platform}
                      onClick={() => setActiveTab(platform)}
                      className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium capitalize ${
                        activeTab === platform
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
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
                  <p
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: (activeTabData?.caption || '').replace(/\n/g, '<br/>') }}
                  />
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
                  <p className="text-blue-600 text-sm">{activeTabData.hashtags.join(' ')}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
                <button type="button" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Post</button>
                <button type="button" className="px-4 py-2 rounded-md bg-white text-indigo-700 border border-indigo-200 text-sm font-medium hover:bg-indigo-50">Schedule Post</button>
                {isEditing && (
                  <button
                    type="button"
                    disabled={!hasChanges || isSaving}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${!hasChanges || isSaving ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
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
          <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Post Details</h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p><span className="font-medium text-gray-700">Status:</span> Generated</p>
              <p><span className="font-medium text-gray-700">Category:</span> AI GENERATED, DALL-E</p>
              <p><span className="font-medium text-gray-700">Model:</span> gpt-4o-mini</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Publish To Social Media</h2>
            <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-md text-gray-500">
              <Plus size={24} className="mb-1"/>
              <span>No social platforms connected</span>
              <button className="mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-sm hover:bg-indigo-100">
                Connect platforms
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Other Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100">
                <Copy size={16} />
                <span>Duplicate Post</span>
              </button>
              <button className="w-full text-left flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100">
                <Trash2 size={16} />
                <span>Delete Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PostEditor;