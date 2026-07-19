import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Info, Activity, Laptop, ShieldAlert, Award } from 'lucide-react';

export default function ProjectInfoSection() {
  const projectDetails = [
    { label: 'Application Name', value: 'Expense Tracker', icon: AppWindow, color: 'text-blue-500' },
    { label: 'Version', value: 'v1.0.0', icon: Info, color: 'text-indigo-500' },
    { label: 'Status', value: 'Production Ready', icon: Activity, color: 'text-success' },
    { label: 'Built With', value: 'React.js + Tailwind CSS', icon: Laptop, color: 'text-cyan-500' },
    { label: 'Developer', value: 'P. Mohammed Zakki Adnaan', icon: Award, color: 'text-purple-500' },
    { label: 'License', value: 'MIT License', icon: ShieldAlert, color: 'text-emerald-500' },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Project Information</h2>
        <p className="text-sm font-semibold text-slate-500">Technical details regarding application parameters and releases.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectDetails.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/20"
            >
              <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-center justify-center ${item.color} shrink-0`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  {item.label}
                </p>
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-1.5 leading-none">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
