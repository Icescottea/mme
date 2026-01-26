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
        setJobs([]);
      }
    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingJob) {
        const response = await fetch('/api/jobs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingJob.id, ...formData }),
        });

        if (response.ok) {
          const data = await response.json();
          setJobs(jobs.map(j => (j.id === editingJob.id ? data.job : j)));
        }
      } else {
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setJobs([data.job, ...jobs]);
        }
      }

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      category: job.category,
      location: job.location,
      salary_range: job.salary_range,
      description: job.description,
      requirements: job.requirements,
      status: job.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/jobs?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setJobs(jobs.filter(j => j.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      location: '',
      salary_range: '',
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
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Job Management</h1>
            <p className="text-slate-600 mt-1">Create and manage job listings</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#de261e] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
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
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#de261e] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-slate-600">Loading jobs...</p>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
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
                    <tr key={job.id} className="border-t hover:bg-slate-50">
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {editingJob ? 'Edit Job' : 'Add Job'}
                </h2>
                <button onClick={resetForm}>
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Title"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border p-2 rounded"
                />

                <input required placeholder="Category"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border p-2 rounded"
                />

                <input required placeholder="Location"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border p-2 rounded"
                />

                <input required placeholder="Salary Range"
                  value={formData.salary_range}
                  onChange={e => setFormData({ ...formData, salary_range: e.target.value })}
                  className="w-full border p-2 rounded"
                />

                <textarea required placeholder="Description"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border p-2 rounded"
                />

                <textarea required placeholder="Requirements"
                  value={formData.requirements}
                  onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full border p-2 rounded"
                />

                <div className="flex gap-2">
                  <button type="submit" className="bg-[#de261e] text-white px-4 py-2 rounded">
                    {editingJob ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={resetForm} className="border px-4 py-2 rounded">
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
