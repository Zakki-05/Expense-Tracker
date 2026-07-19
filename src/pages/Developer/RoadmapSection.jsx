import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldAlert, Database, BellRing, SmartphoneCharging, Container, Workflow, BrainCircuit } from 'lucide-react';

export default function RoadmapSection() {
  const steps = [
    { title: 'Backend Integration', icon: Server, desc: 'Migrate to Node.js/Express or Django REST server for persistent cloud data.', status: 'Upcoming' },
    { title: 'JWT Authentication', icon: ShieldAlert, desc: 'Secure registration, pass-token updates, and session refreshes.', status: 'Upcoming' },
    { title: 'PostgreSQL Relational DB', icon: Database, desc: 'Robust transactional schemas with automated foreign key constraints.', status: 'Upcoming' },
    { title: 'Smart Notifications', icon: BellRing, desc: 'In-app budget limit alerts and weekly expense reports via email/push.', status: 'Upcoming' },
    { title: 'Progressive Web App (PWA)', icon: SmartphoneCharging, desc: 'Offline entry caching, service workers, and standalone application installation.', status: 'Upcoming' },
    { title: 'Docker Containerization', icon: Container, desc: 'Consistent staging/prod environments using container orchestration images.', status: 'Upcoming' },
    { title: 'CI / CD Workflows', icon: Workflow, desc: 'Automatic linting, testing, and Vercel/AWS hosting on master merges.', status: 'Upcoming' },
    { title: 'AI-Powered Insights', icon: BrainCircuit, desc: 'Predictive spending trends and budget tips powered by neural models.', status: 'Upcoming' },
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
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Future Roadmap</h2>
        <p className="text-sm font-semibold text-slate-500">Upcoming updates, tech integrations, and feature development.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary dark:text-blue-400 bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-md">
                  Phase 0{index + 1}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {step.status}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-350">
                  <step.icon className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-xs text-slate-800 dark:text-white leading-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-normal">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
