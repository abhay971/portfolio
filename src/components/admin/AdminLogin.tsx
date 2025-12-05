import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  username: string;
  password: string;
}

export default function AdminLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token
      localStorage.setItem('adminToken', data.token);

      // Redirect to admin panel
      navigate('/admin');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1510] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
          >
            Admin Login
          </h1>
          <p
            className="text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-transparent border-2 border-lime-400/20 p-8 relative">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-lime-400" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-lime-400" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs uppercase text-lime-400 mb-3 font-bold"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-white/20 focus:border-lime-400 text-white transition-all duration-300 outline-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase text-lime-400 mb-3 font-bold"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-white/20 focus:border-lime-400 text-white transition-all duration-300 outline-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 border-2 border-red-500 bg-red-500/10 text-red-400"
              >
                <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {errorMessage}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className={`relative w-full px-8 py-4 bg-transparent border-2 border-lime-400 text-lime-400 font-bold uppercase overflow-hidden group transition-all duration-500 ${
                status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}
              whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
              whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
            >
              <span className="absolute inset-0 bg-lime-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                {status === 'loading' ? 'Logging in...' : 'Login'}
              </span>
            </motion.button>
          </form>
        </div>

        {/* Info */}
        <p
          className="text-center text-sm text-gray-500 mt-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Default credentials: admin / admin123
        </p>
      </motion.div>
    </div>
  );
}
