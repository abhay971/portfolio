import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
    loadSubmissions(token);
  }, [navigate]);

  const loadSubmissions = async (token) => {
    try {
      const response = await fetch('/api/submissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Token expired
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load submissions');
      }

      setSubmissions(data.submissions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1510] flex items-center justify-center">
        <div className="text-lime-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1510] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-lime-400 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-400">
              Welcome back, {user?.username}! Manage your contact submissions.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a2520] border border-lime-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-1">Total Submissions</div>
            <div className="text-3xl font-bold text-lime-400">
              {submissions.length}
            </div>
          </div>
          <div className="bg-[#1a2520] border border-lime-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-1">Unread</div>
            <div className="text-3xl font-bold text-yellow-400">
              {submissions.filter((s) => !s.isRead).length}
            </div>
          </div>
          <div className="bg-[#1a2520] border border-lime-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-1">Archived</div>
            <div className="text-3xl font-bold text-gray-400">
              {submissions.filter((s) => s.isArchived).length}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No submissions yet. Check back later!
            </div>
          ) : (
            submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1a2520] border border-lime-500/20 rounded-xl p-6 hover:border-lime-500/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {submission.name}
                      </h3>
                      {!submission.isRead && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded">
                          New
                        </span>
                      )}
                      {submission.isArchived && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs font-medium rounded">
                          Archived
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-lime-400 hover:text-lime-300 text-sm"
                    >
                      {submission.email}
                    </a>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    {formatDate(submission.submittedAt)}
                  </div>
                </div>

                <div className="bg-[#0a1510] border border-lime-500/10 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </div>

                {submission.ipAddress && (
                  <div className="mt-4 text-xs text-gray-500">
                    IP: {submission.ipAddress}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-gray-400 hover:text-lime-400 transition-colors"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
