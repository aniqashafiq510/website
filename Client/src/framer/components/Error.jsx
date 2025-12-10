import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

export default function Error() {
  const navigate = useNavigate();

  return (
  <div 
    
    className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-violet-900 to-black  text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* Left: Illustration + code */}
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur p-6 shadow-lg border border-white/10">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">404</h1>
            <p className="mt-2 text-sm text-white/80">Page not found</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Looks like you took a wrong turn.
          </h2>

          <p className="text-white/80 max-w-xl">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Try returning to the homepage or contact support
            if the problem persists.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 active:scale-95 transition-transform shadow-md text-sm font-medium"
            >
              ← Back to Home
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/10 transition-colors text-sm"
            >
              Reload
            </button>
          </div>

          <span className="mt-4 text-xs text-white/50">Error code: 404 • Not Found</span>
        </div>

        {/* Right: decorative SVG / hero */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-xl p-6 bg-white/3 border border-white/6 shadow-inner">
            {/* Simple futuristic SVG illustration */}
            <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              <rect x="20" y="40" width="560" height="320" rx="18" fill="url(#g1)" opacity="0.08" />

              <g transform="translate(40,60)">
                <rect x="0" y="0" width="520" height="260" rx="12" fill="#ffffff" fillOpacity="0.03"/>

                <g transform="translate(20,20)">
                  <rect x="0" y="0" width="160" height="120" rx="8" fill="#fff" fillOpacity="0.04" />
                  <rect x="190" y="0" width="300" height="120" rx="8" fill="#fff" fillOpacity="0.03" />

                  <rect x="0" y="150" width="380" height="80" rx="8" fill="#fff" fillOpacity="0.02" />

                  <circle cx="460" cy="190" r="28" fill="url(#g1)" opacity="0.95" />

                  <g transform="translate(30,20)">
                    <motion.circle initial={{ r: 4 }} animate={{ r: 12 }} transition={{ repeat: Infinity, duration: 1.6, repeatType: 'reverse' }} cx="8" cy="8" r="8" fill="#fff" fillOpacity="0.9" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
    
  );
}

