'use client';

import { useState } from 'react';
import { Send, CheckCircle, Briefcase } from 'lucide-react';

export default function JobInquiry() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobId: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          jobId: formData.jobId || null,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          jobId: '',
          message: '',
        });
      } else {
        alert(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffaeab]/20 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-[#de261e]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-[#de261e]" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Inquiry Submitted Successfully!
          </h2>
          <p className="text-slate-600 mb-8">
            Thank you for your interest. Our team will review your inquiry and get back to you within 24-48 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#de261e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90 transition-colors w-full"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#de261e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Job Inquiry</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            Interested in a position? Fill out the form below and our team will contact you soon.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-1">
              <div className="bg-[#ffaeab]/20 p-8 rounded-2xl sticky top-24">
                <h2 className="text-2xl font-bold text-slate-50 mb-4">
                  What Happens Next?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-[#de261e] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 mb-1">Review</h3>
                      <p className="text-sm text-slate-400">
                        Our team reviews your inquiry within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-[#de261e] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 mb-1">Contact</h3>
                      <p className="text-sm text-slate-400">
                        We reach out via email or phone to discuss opportunities
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-[#de261e] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 mb-1">Process</h3>
                      <p className="text-sm text-slate-400">
                        Begin the application and verification process
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Need immediate assistance?</strong><br />
                    Call us at: +94 11 234 5678<br />
                    Email: info@globalrecruitment.lk
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Submit Your Inquiry
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full text-slate-800 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full text-slate-800 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full text-slate-800 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="jobId" className="block text-sm font-semibold text-slate-700 mb-2">
                      Job Position (Optional)
                    </label>
                    <select
                      id="jobId"
                      name="jobId"
                      value={formData.jobId}
                      onChange={handleChange}
                      className="w-full text-slate-800 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a position or leave blank for general inquiry</option>
                      <option value="1">Registered Nurse - Dubai, UAE</option>
                      <option value="2">Civil Engineer - Riyadh, Saudi Arabia</option>
                      <option value="3">Software Developer - Berlin, Germany</option>
                      <option value="4">Hotel Manager - Doha, Qatar</option>
                      <option value="5">Factory Worker - Singapore</option>
                      <option value="6">Accountant - London, UK</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full text-slate-800 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your experience, qualifications, and what you're looking for..."
                    />
                  </div>

                  <div className="bg-[#fffc01]/20 border-l-4 border-[#de261e] p-4 rounded">
                    <p className="text-sm text-[#060709]">
                      <strong>Privacy Notice:</strong> Your information will be kept confidential and used only for recruitment purposes.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#de261e] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#de261e]/90 transition-colors flex items-center justify-center gap-2 disabled:bg-[#de261e]/60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}