import React from 'react';
import { motion } from 'framer-motion';
import { Component, Layers, Wrench, Sparkles, Gauge, Smartphone } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { label: 'Components', value: '20+', icon: Component, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Pages', value: '12+', icon: Layers, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Custom Hooks', value: '6', icon: Wrench, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Reusable UI Elements', value: '8+', icon: Sparkles, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Performance Score', value: '98/100', icon: Gauge, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Responsive Screens', value: '100%', icon: Smartphone, color: 'text-rose-500 bg-rose-500/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Project Statistics</h2>
        <p className="text-sm font-semibold text-slate-500">Summary of the application size, code parameters, and performance scores.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-center text-center"
          >
            <div className="space-y-3 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-850 dark:text-white mt-4 leading-none">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
