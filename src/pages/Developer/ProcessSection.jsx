import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, PenTool, Layout, Code2, TestTube, Globe, RefreshCcw } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    { title: 'Planning', icon: ClipboardList, desc: 'Defining application goals, core features, and user journeys.', color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Research', icon: Search, desc: 'Analyzing design systems, market competitors, and technical constraints.', color: 'text-cyan-500 bg-cyan-500/10' },
    { title: 'Wireframe', icon: PenTool, desc: 'Mapping structural layouts and site navigation without design noise.', color: 'text-indigo-500 bg-indigo-500/10' },
    { title: 'Design', icon: Layout, desc: 'Crafting high-fidelity components, assets, color palettes, and dark schemes.', color: 'text-purple-500 bg-purple-500/10' },
    { title: 'Development', icon: Code2, desc: 'Writing clean, modular React modules and style declarations.', color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Testing', icon: TestTube, desc: 'Validating route logic, state updates, responsive layouts, and schemas.', color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Deployment', icon: Globe, desc: 'Bundling with Vite and publishing onto modern cloud networks.', color: 'text-teal-500 bg-teal-500/10' },
    { title: 'Improvement', icon: RefreshCcw, desc: 'Gathering user telemetry and applying performance modifications.', color: 'text-rose-500 bg-rose-500/10' },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Development Process</h2>
        <p className="text-sm font-semibold text-slate-500">My structured methodology for bringing ideas to production.</p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 pl-6 md:pl-8 space-y-8 py-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative"
          >
            {/* Timeline Node Icon Indicator */}
            <span className={`absolute -left-[45px] md:-left-[53px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-slate-50 dark:border-slate-950 ${step.color} flex items-center justify-center shadow-sm`}>
              <step.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </span>

            {/* Content Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Phase 0{index + 1}
              </span>
              <h3 className="font-extrabold text-sm text-slate-850 dark:text-white leading-tight">
                {step.title}
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-normal max-w-2xl">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
