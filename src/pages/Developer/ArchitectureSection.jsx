import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, FolderHeart, LayoutGrid, RotateCw, Network, Compass, Layers } from 'lucide-react';

export default function ArchitectureSection() {
  const steps = [
    {
      title: 'Component UI Layer',
      icon: LayoutGrid,
      desc: 'Modular, presentation-only components receiving state via hooks.',
      tech: 'Vite, React, Tailwind CSS',
    },
    {
      title: 'Context API Layer',
      icon: Network,
      desc: 'Global state manager providers mapping Auth, Expenses, Budgets, and Themes.',
      tech: 'React Context API',
    },
    {
      title: 'Custom Hooks Layer',
      icon: RotateCw,
      desc: 'Decoupling side-effects, calculations, and data hooks from templates.',
      tech: 'useAuth, useExpenses, useTheme',
    },
    {
      title: 'Service & Utility Layer',
      icon: Cpu,
      desc: 'Formatting, currency calculations, routing protections, and mock requests.',
      tech: 'Zod schemas, Date-fns, Axios templates',
    },
  ];

  const details = [
    { name: 'Feature-Based Directory Structure', icon: FolderHeart, desc: 'Decoupled layouts, context systems, assets, styles, and route pages.' },
    { name: 'Responsive App Shell', icon: Compass, desc: 'Universal layout wrappers managing sidebars and desktop headers dynamically.' },
    { name: 'Clean Performance Audits', icon: Layers, desc: 'Strict component boundaries preventing unnecessary re-renders in heavy list modules.' },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Application Architecture</h2>
        <p className="text-sm font-semibold text-slate-500">Visual mapping of the Expense Tracker codebase architecture.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Data Flow Columns */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-extrabold mb-6 text-slate-800 dark:text-white">Data Flow Pipeline</h3>

          <div className="space-y-4 relative flex flex-col items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/20 p-4 rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white truncate">{step.title}</h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-normal">{step.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-primary dark:text-blue-400 bg-primary/5 dark:bg-primary/10 px-2.5 py-1 rounded-md shrink-0">
                    {step.tech}
                  </span>
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-slate-300 dark:text-slate-700 py-1"
                  >
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Supporting Architectural Pillars */}
        <div className="space-y-6 flex flex-col justify-between">
          {details.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-3 justify-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <pillar.icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">{pillar.name}</h4>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
