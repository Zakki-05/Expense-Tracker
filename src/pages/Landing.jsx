import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, BarChart3, Shield, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 overflow-hidden">
      {/* Navbar wrapper */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
            ET
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            ExpenseTracker
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold bg-primary text-white py-2 px-4 rounded-xl hover:bg-blue-700 shadow-md shadow-primary/10 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 py-1.5 px-3 rounded-full text-xs font-semibold">
            <Award size={14} /> Introducing Smarter Budget Analytics
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto bg-gradient-to-b from-slate-950 to-slate-800 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Take Control of Your Wealth with Premium Insights
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Monitor, analyze, and optimize your income and expenses with our modern, glassmorphic financial tracker.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3.5 px-6 rounded-2xl hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all hover:scale-[1.03] cursor-pointer"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left"
        >
          <div className="glass dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-primary flex items-center justify-center mb-6">
              <Wallet size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Transactions</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Categorize income and expenses with customizable tags, flags, priorities, and attachments.
            </p>
          </div>

          <div className="glass dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-success flex items-center justify-center mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Analytics</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Get detailed visual layouts of your financial trends using premium interactive charts.
            </p>
          </div>

          <div className="glass dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-warning flex items-center justify-center mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Your financial data is encrypted locally and secure. Ready for Django DRF integration.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
