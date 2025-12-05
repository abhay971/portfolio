import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionsList from './SubmissionsList';

interface Submission {
  id: number;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
  isArchived: boolean;
  readAt?: string;
  notes?: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (loading) return;
    fetchSubmissions();
  }, [filter, currentPage, search]);

  const verifyAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      setLoading(false);
    } catch (error) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const fetchSubmissions = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
      });

      if (filter === 'unread') {
        params.append('isRead', 'false');
        params.append('isArchived', 'false');
      } else if (filter === 'archived') {
        params.append('isArchived', 'true');
      }

      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/submissions?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data.submissions);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    }
  };

  const handleUpdate = async (
    id: number,
    updates: { isRead?: boolean; isArchived?: boolean }
  ) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update submission');
      }

      // Refresh submissions
      await fetchSubmissions();
    } catch (error) {
      console.error('Failed to update submission:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1510] flex items-center justify-center">
        <div className="text-lime-400 text-xl">Loading...</div>
      </div>
    );
  }

  const stats = {
    total: pagination?.total || 0,
    unread: submissions.filter((s) => !s.isRead && !s.isArchived).length,
    archived: submissions.filter((s) => s.isArchived).length,
  };

  return (
    <div className="min-h-screen bg-[#0a1510] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
            >
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-transparent border-2 border-red-500 text-red-500 font-bold uppercase hover:bg-red-500 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-transparent border-2 border-lime-400/20 p-4">
              <p
                className="text-sm uppercase text-gray-400 mb-1"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
              >
                Total
              </p>
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stats.total}
              </p>
            </div>
            <div className="bg-transparent border-2 border-lime-400/20 p-4">
              <p
                className="text-sm uppercase text-gray-400 mb-1"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
              >
                Unread
              </p>
              <p
                className="text-3xl font-bold text-lime-400"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stats.unread}
              </p>
            </div>
            <div className="bg-transparent border-2 border-lime-400/20 p-4">
              <p
                className="text-sm uppercase text-gray-400 mb-1"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
              >
                Archived
              </p>
              <p
                className="text-3xl font-bold text-gray-500"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stats.archived}
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              {(['all', 'unread', 'archived'] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => {
                    setFilter(filterOption);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 font-bold uppercase transition-all duration-300 ${
                    filter === filterOption
                      ? 'bg-lime-400 text-black'
                      : 'bg-transparent border-2 border-lime-400/20 text-lime-400 hover:border-lime-400'
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
                >
                  {filterOption}
                </button>
              ))}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search submissions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 px-4 py-2 bg-transparent border-2 border-white/20 focus:border-lime-400 text-white transition-all duration-300 outline-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
        </motion.div>

        {/* Submissions List */}
        <SubmissionsList submissions={submissions} onUpdate={handleUpdate} />

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-transparent border-2 border-lime-400 text-lime-400 font-bold uppercase hover:bg-lime-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              Previous
            </button>
            <span
              className="text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))
              }
              disabled={currentPage === pagination.totalPages}
              className="px-6 py-2 bg-transparent border-2 border-lime-400 text-lime-400 font-bold uppercase hover:bg-lime-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
