import React from 'react';
import { motion } from 'framer-motion';

export default function TechSection() {
  const techs = [
    { name: 'React.js', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' },
    { name: 'JavaScript', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    { name: 'Tailwind CSS', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' },
    { name: 'React Router', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
    { name: 'Context API', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
    { name: 'Axios', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
    { name: 'React Hook Form', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
    { name: 'Zod', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { name: 'Framer Motion', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
    { name: 'Recharts', color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20' },
    { name: 'Lucide React', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
    { name: 'Vite', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
    { name: 'Git', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
    { name: 'GitHub', color: 'bg-slate-550 bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Technologies Used</h2>
        <p className="text-sm font-semibold text-slate-500">Frameworks, libraries, and utilities powering this application.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-wrap gap-3"
      >
        {techs.map((tech) => (
          <motion.span
            key={tech.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors shadow-sm cursor-default ${tech.color}`}
          >
            {tech.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
