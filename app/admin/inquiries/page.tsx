'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Trash2, X, Mail, Phone } from 'lucide-react';

interface Inquiry {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  job_id?: number;
  job_title?: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      } else {
        console.error('Failed to fetch inquiries');
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setInquiries(inquiries.map(inq => 
          inq.id === id ? { ...inq, status: newStatus } : inq
        ));
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const response = await fetch(`/api/inquiries?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setInquiries(inquiries.filter(inq => inq.id !== id));
          setSelectedInquiry(null);
        } else {
          alert('Failed to delete inquiry');
        }
      } catch (error) {
        console.error('Error deleting inquiry:', error);
        alert('An error occurred');
      }
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.job_title && inq.job_title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-[#fffc01]/30 text-[#060709]';
      case 'contacted':
        return 'bg-[#ffaeab]/30 text-[#de261e]';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Inquiry Management</h1>
          <p className="text-slate-600 mt-1">View and manage job inquiries</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e] focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#de261e] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#fffc01]/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#de261e]">
              {inquiries.filter(i => i.status === 'new').length}
            </div>
            <div className="text-sm text-[#060709]/70">New Inquiries</div>
          </div>
          <div className="bg-[#ffaeab]/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#de261e]">
              {inquiries.filter(i => i.status === 'contacted').length}
            </div>
            <div className="text-sm text-[#060709]/70">In Progress</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {inquiries.filter(i => i.status === 'closed').length}
            </div>
            <div className="text-sm text-[#060709]/70">Closed</div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Job Interest</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{inquiry.full_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{inquiry.email}</div>
                    <div className="text-xs text-slate-500">{inquiry.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {inquiry.job_title || 'General Inquiry'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(inquiry.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(inquiry.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="p-2 text-[#de261e] hover:bg-[#de261e]/10 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="p-2 text-[#060709] hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInquiries.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No inquiries found
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Inquiry Details</h2>
                <button 
                  onClick={() => setSelectedInquiry(null)} 
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Applicant Info */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-3">Applicant Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-slate-700">Name:</span>
                      <span className="text-slate-600">{selectedInquiry.full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-[#de261e]" />
                      <a href={`mailto:${selectedInquiry.email}`} className="text-[#de261e] hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-[#de261e]" />
                      <a href={`tel:${selectedInquiry.phone}`} className="text-[#de261e] hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job Interest */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Job Interest</h3>
                  <p className="text-slate-600">
                    {selectedInquiry.job_title || 'General Inquiry - No specific job'}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Message</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-slate-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t">
                  <span>Submitted: {formatDate(selectedInquiry.created_at)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
                    {selectedInquiry.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex-1 bg-[#de261e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90 text-center"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="px-6 py-3 border border-slate-300 text-[#060709] rounded-lg font-semibold hover:bg-slate-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}