import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import SplashScreen from './components/layout/SplashScreen';
import ParticleBackground from './components/about/ParticleBackground';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';

// Lazy load heavy sections for better initial load
const Projects = lazy(() => import('./components/projects/Projects'));
const Experience = lazy(() => import('./components/experience/Experience'));
const Contact = lazy(() => import('./components/contact/Contact'));

// Main portfolio page component
function PortfolioPage({ showSplash }) {
  return (
    <>
      {/* Global WebGL Particle Background - Fixed to viewport */}
      <ParticleBackground />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header />
        <ScrollProgress />

        <div className="min-h-screen">
          <Hero />
          <About />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="loading-shimmer w-full max-w-4xl h-96 rounded-lg" />
              </div>
            }
          >
            <Projects />
            <Experience />
            <Contact />
          </Suspense>
        </div>

        <Footer />
        <BackToTop />
      </div>

      {/* Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2 seconds to allow animations to complete
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portfolio */}
        <Route path="/" element={<PortfolioPage showSplash={showSplash} />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
