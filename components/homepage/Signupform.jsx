import React, { useState, useEffect } from 'react';

// --- Icon Components ---
// Moved icons into this file to resolve the compilation error.
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.625 2.5 24 2.5C11.667 2.5 1.5 12.667 1.5 25s10.167 22.5 22.5 22.5s22.5-10.167 22.5-22.5c0-1.563-.149-3.09-.421-4.584z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c-2.238 4.22-3.594 9.078-3.594 14.309c0 5.231 1.356 10.089 3.594 14.309L15.17 35.65C13.235 31.668 12 27.46 12 23c0-4.46 1.235-8.668 3.17-12.65L6.306 14.691z" transform="translate(0 2)"></path>
    <path fill="#4CAF50" d="M24 47.5c5.625 0 10.553-1.806 14.802-4.841L31.961 34.96C29.842 36.846 27.059 38 24 38c-5.223 0-9.649-3.343-11.303-7.918L4.389 38.08C8.638 43.194 15.825 47.5 24 47.5z"></path>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.571l7.662 7.662C41.438 37.138 44.5 31.812 44.5 25c0-2.619-.406-5.125-1.125-7.489L43.611 20.083z"></path>
  </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
// --- End Icon Components ---


// Main Signup Component
export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/profile/me`, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => {
        if (res.ok) window.location.replace('/content/generate');
        else window.location.replace('/businesses/create');
      })
      .catch(() => window.location.replace('/businesses/create'));
  }, []);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // --- Frontend Validation ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!agreedToTerms) {
        setError("You must agree to the Terms of Service and Privacy Policy.");
        return;
    }
    // --- End of Frontend Validation ---

    setIsLoading(true);

    // --- Backend Connection Logic ---
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      console.log('Registration successful!', data.message);
      
      // Set flash message and redirect to login
      sessionStorage.setItem('flashMessage', 'Account created! Please sign in.');
      window.location.href = '/login';
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Create Your Account</h1>
            <p className="text-slate-500 mt-2">Join thousands of businesses automating their work.</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300">
          <div className="space-y-6">
            
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-1">First Name</label>
                  <input id="firstName" name="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="Name" />
                </div>
                <div className="w-full">
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 mb-1">Last Name</label>
                  <input id="lastName" name="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="Last Name " />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="you@example.com" />
              </div>

              <div>
                <label htmlFor="password"className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="••••••••" />
              </div>
              
              <div>
                <label htmlFor="confirmPassword"className="block text-sm font-medium text-slate-600 mb-1">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="••••••••" />
              </div>

              <div className="flex items-start">
                  <div className="flex items-center h-5">
                      <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-slate-500">I agree to the <a href="/terms" className="font-medium text-indigo-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="font-medium text-indigo-600 hover:underline">Privacy Policy</a></label>
                  </div>
              </div>

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <div>
                <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-semibold rounded-lg p-3 flex items-center justify-center hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                  {isLoading ? <SpinnerIcon /> : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
                Already have an account?{' '}
                <a href="/login" className="font-semibold text-indigo-600 hover:underline">
                    Sign in
                </a>
            </p>
        </div>
      </div>
    </div>
  );
}

