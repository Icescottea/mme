'use client';

import { useState, useEffect } from 'react';
import { MapPin, DollarSign, Clock, Briefcase, Search, Phone } from 'lucide-react';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  salary_range: string;
  contact: string;
  description: string;
  requirements: string;
  status: string;
  created_at: string;
}

export default function Employment() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Jobs' },
    { id: 'gulf', name: 'Gulf Countries' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia Pacific' },
    { id: 'healthcare', name: 'Healthcare' },
  ];

  useEffect(() => {
    fetchJobs();
  }, []); // Remove selectedCategory from dependency

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Always fetch all active jobs
      const response = await fetch('/api/jobs?status=active');
      
      if (response.ok) {
        const data = await response.json();
        setJobs(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch jobs');
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#de261e] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fadeInUp">
          <h1 className="text-4xl font-bold mb-4">Employment Opportunities</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Explore international job opportunities across various industries and locations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.id
                          ? 'bg-[#de261e] text-white shadow-lg'
                          : 'bg-[#ffaeab]/10 text-[#060709] hover:bg-[#ffaeab]/20'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="mb-6 animate-fadeInRight">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4">
                <p className="text-slate-600">
                  Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
                </p>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-[#de261e] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading jobs...</p>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 transform hover:-translate-y-1 animate-fadeInUp group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          {job.salary_range && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary_range}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Full-time
                          </div>
                        </div>
                      </div>
                      <span className="bg-[#fffc01] text-[#060709] px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(c => c.id === job.category)?.name || job.category}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-4">{job.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#de261e] font-semibold">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${job.contact}`} className="hover:text-[#de261e]/80 transition-colors">
                          {job.contact}
                        </a>
                      </div>
                      <Link
                        href="/job-inquiry"
                        className="inline-flex items-center gap-2 text-[#de261e] font-semibold hover:text-[#de261e]/80 transition-all duration-300 group-hover:gap-3"
                      >
                        Apply Now
                        <Briefcase className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      </Link>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">No jobs found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#ffaeab]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-50 mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Submit a general inquiry and we'll notify you when relevant opportunities become available.
          </p>
          <Link
            href="/job-inquiry"
            className="bg-[#de261e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90 transition-colors inline-block"
          >
            Submit Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}