import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus('success');
      setStatusMessage(data.message || 'Thank you for your message! I will get back to you soon.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);

    } catch (error) {
      setStatus('error');
      setStatusMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-8">
            <div
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-lime-400/10"
              style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}
            >
              04
            </div>
            <div className="flex flex-col">
              <div className="h-[2px] w-24 bg-lime-400 mb-3" />
              <span
                className="text-base md:text-lg uppercase tracking-[0.3em] text-lime-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get In Touch
              </span>
            </div>
          </div>
        </motion.div>

        {/* Contact Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <h2
                className="font-bold uppercase mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                }}
              >
                <span className="text-white block mb-2">Let's Build</span>
                <span className="text-lime-400 block">Something Great</span>
              </h2>

              <p
                className="text-base md:text-lg text-gray-300 mb-12 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Have a project in mind or want to collaborate? Drop me a message
                and let's create something amazing together.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  className="group flex items-start gap-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-lime-400/10 border border-lime-400/30 group-hover:bg-lime-400 group-hover:border-lime-400 rounded-lg flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-lime-400 group-hover:text-black transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase text-gray-500 mb-1"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:your.email@example.com"
                      className="text-lg text-white group-hover:text-lime-400 transition-colors duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      your.email@example.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="group flex items-start gap-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-lime-400/10 border border-lime-400/30 group-hover:bg-lime-400 group-hover:border-lime-400 rounded-lg flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-lime-400 group-hover:text-black transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase text-gray-500 mb-1"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="text-lg text-white group-hover:text-lime-400 transition-colors duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  className="group flex items-start gap-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-lime-400/10 border border-lime-400/30 group-hover:bg-lime-400 group-hover:border-lime-400 rounded-lg flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-lime-400 group-hover:text-black transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase text-gray-500 mb-1"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
                    >
                      Location
                    </p>
                    <p
                      className="text-lg text-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      San Francisco, CA
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Form Container with Border */}
              <div className="relative p-6 sm:p-8 md:p-10 bg-transparent border-2 border-lime-400/20 overflow-hidden group hover:border-lime-400 transition-all duration-500">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-lime-400" />
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-lime-400" />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  {/* Name Field */}
                  <div className="relative group/field">
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase text-lime-400 mb-3 font-bold"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 min-h-[44px] bg-transparent border-b-2 border-white/20 focus:border-lime-400 text-white text-base md:text-lg transition-all duration-300 outline-none placeholder:text-gray-600"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Enter your name"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lime-400 group-focus-within/field:w-full transition-all duration-500" />
                  </div>

                  {/* Email Field */}
                  <div className="relative group/field">
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase text-lime-400 mb-3 font-bold"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 min-h-[44px] bg-transparent border-b-2 border-white/20 focus:border-lime-400 text-white text-base md:text-lg transition-all duration-300 outline-none placeholder:text-gray-600"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Enter your email"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lime-400 group-focus-within/field:w-full transition-all duration-500" />
                  </div>

                  {/* Message Field */}
                  <div className="relative group/field">
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase text-lime-400 mb-3 font-bold"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-white/20 focus:border-lime-400 text-white text-base md:text-lg transition-all duration-300 outline-none resize-none placeholder:text-gray-600"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Tell me about your project"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lime-400 group-focus-within/field:w-full transition-all duration-500" />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`relative w-full px-8 py-5 bg-transparent border-2 border-lime-400 text-lime-400 font-bold uppercase overflow-hidden group/button transition-all duration-500 hover:border-lime-400 ${
                      status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em', fontSize: '1.25rem' }}
                    whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  >
                    {/* Background slide effect */}
                    <span className="absolute inset-0 bg-lime-400 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-500" />

                    {/* Button text */}
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover/button:text-black transition-colors duration-500">
                      {status === 'loading' ? (
                        <>
                          Sending
                          <svg
                            className="w-5 h-5 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            className="w-5 h-5 transform group-hover/button:translate-x-2 transition-transform duration-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Status Messages */}
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 border-2 ${
                        status === 'success'
                          ? 'border-lime-400 bg-lime-400/10 text-lime-400'
                          : 'border-red-500 bg-red-500/10 text-red-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {status === 'success' ? (
                          <svg
                            className="w-5 h-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                        <p className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {statusMessage}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
