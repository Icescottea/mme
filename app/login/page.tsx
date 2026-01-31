'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, AlertCircle, Lock } from 'lucide-react';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/jobs');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfcfc] via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.jpeg" 
              alt="Global Recruitment Logo" 
              width={80} 
              height={80}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#060709]">Admin Portal</h1>
          <p className="text-[#060709]/70 mt-2">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-[#de261e]/10 border-l-4 border-[#de261e] p-4 rounded">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#de261e]" />
                  <p className="text-sm text-[#de261e]">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border text-zinc-400 border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e] focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border text-zinc-400 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#de261e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90 transition-colors disabled:bg-[#de261e]/60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-[#de261e] hover:text-[#de261e]/80">
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}