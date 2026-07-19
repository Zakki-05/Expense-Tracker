import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Sparkles, MonitorSmartphone, LineChart, Cpu, Moon, PieChart, TrendingDown, TrendingUp, BarChart } from 'lucide-react';

export default function ProjectHighlightsSection() {
  const highlights = [
    { title: 'Production Architecture', icon: Layers, desc: 'Clean, structured React architecture built on Context API and Custom Hooks.', color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Responsive Design', icon: MonitorSmartphone, desc: 'Fluid layout optimized for mobile screens, tablets, and wide desktop displays.', color: 'text-indigo-500 bg-indigo-500/10' },
    { title: 'Reusable Components', icon: Sparkles, desc: 'Modular inputs, buttons, wrappers, and modal components following DRY/SOLID principles.', color: 'text-purple-500 bg-purple-500/10' },
    { title: 'Dark Mode Integration', icon: Moon, desc: 'Native theme toggling using document class injection matching modern aesthetics.', color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Dynamic Charts', icon: LineChart, desc: 'Interactive Recharts dashboard visually mapping multi-month cash flow trends.', color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Performance Optimization', icon: Cpu, desc: 'Low-latency state recalculations, minimal bundle footprints, and fast asset pipelines.', color: 'text-rose-500 bg-rose-500/10' },
    { title: 'Authentication Ready', icon: ShieldCheck, desc: 'Protected routing shells, secure login state providers, and mock session contexts.', color: 'text-cyan-500 bg-cyan-500/10' },
    { title: 'Rich Analytics', icon: BarChart, desc: 'Comprehensive financial reports broken down by monthly cash flows and expense caps.', color: 'text-teal-500 bg-teal-500/10' },
    { title: 'Budget Planner', icon: PieChart, desc: 'Interactive limits, visual progress rings, and real-time category alerts.', color: 'text-violet-500 bg-violet-500/10' },
    { title: 'Expense Tracking', icon: TrendingDown, desc: 'Granular tracking of debits, categorizations, and automated totals updating.', color: 'text-red-500 bg-red-500/10' },
    { title: 'Income Tracking', icon: TrendingUp, desc: 'Detailed log of earnings, cash flow trends, and net savings adjustments.', color: 'text-green-500 bg-green-500/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90 } },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Project Highlights</h2>
        <p className="text-sm font-semibold text-slate-500">Core architectural highlights and features of this Expense Tracker.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-white leading-tight">{item.title}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
