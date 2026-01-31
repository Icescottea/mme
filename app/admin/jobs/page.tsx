'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  salary_range: string;
  description: string;
  requirements: string;
  contact: string;
  status: string;
  created_at: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    salary_range: '',
    contact: '',
    description: '',
    requirements: '',
    status: 'active',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/jobs');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingJob) {
        // Update existing job
        const response = await fetch('/api/jobs', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingJob.id,
            ...formData,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setJobs(jobs.map(job => 
            job.id === editingJob.id ? data.job : job
          ));
        } else {
          alert('Failed to update job');
        }
      } else {
        // Create new job
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setJobs([data.job, ...jobs]);
        } else {
          alert('Failed to create job');
        }
      }

      resetForm();
    } catch (error) {
      console.error('Error submitting job:', error);
      alert('An error occurred');
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      category: job.category,
      location: job.location,
      salary_range: job.salary_range,
      contact: job.contact || '',
      description: job.description,
      requirements: job.requirements,
      status: job.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`/api/jobs?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setJobs(jobs.filter(job => job.id !== id));
        } else {
          alert('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('An error occurred');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      location: '',
      salary_range: '',
      contact: '',
      description: '',
      requirements: '',
      status: 'active',
    });
    setEditingJob(null);
    setShowModal(false);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Job Management</h1>
            <p className="text-slate-600 mt-1">Create and manage job listings</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#de261e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Job
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-zinc-950 pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e] focus:border-transparent"
            />
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-slate-700 rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#de261e] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-slate-800">Loading jobs...</p>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-slate-900 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">Job Title</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Location</th>
                    <th className="px-6 py-4 text-left">Salary</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map(job => (
                    <tr key={job.id} className="border-t hover:bg-slate-800">
                      <td className="px-6 py-4">{job.title}</td>
                      <td className="px-6 py-4">{job.category}</td>
                      <td className="px-6 py-4">{job.location}</td>
                      <td className="px-6 py-4">{job.salary_range}</td>
                      <td className="px-6 py-4">{job.status}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => handleEdit(job)}>
                          <Edit className="w-4 h-4 text-[#de261e]" />
                        </button>
                        <button onClick={() => handleDelete(job.id)}>
                          <Trash2 className="w-4 h-4 text-black" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No jobs found
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="gulf">Gulf Countries</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia Pacific</option>
                      <option value="healthcare">Healthcare</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Salary Range *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.salary_range}
                      onChange={(e) => setFormData({...formData, salary_range: e.target.value})}
                      className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="$3,000 - $4,500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Requirements *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border text-zinc-950 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#de261e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90"
                  >
                    {editingJob ? 'Update Job' : 'Create Job'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border text-zinc-950 border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}