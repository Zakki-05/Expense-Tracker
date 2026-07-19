import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center space-y-6 glass dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center animate-bounce">
            <Compass size={32} />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The page you are looking for doesn't exist or has been moved to another coordinate.
        </p>

        <div className="pt-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer text-sm"
          >
            <Home size={16} /> Back to Safety
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
