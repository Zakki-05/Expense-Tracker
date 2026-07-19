import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Atom, Flame, Lightbulb, GraduationCap } from 'lucide-react';

export default function AboutSection() {
  const roles = [
    {
      title: 'Frontend Developer',
      icon: Code2,
      description: 'Crafting responsive, semantic, and high-performance user interfaces. Specialized in modular design architectures and custom layout solutions.',
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'React Developer',
      icon: Atom,
      description: 'Deep understanding of Component-Based designs, state propagation via Context, performance optimization hooks, and React Router configurations.',
      color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'JavaScript Enthusiast',
      icon: Flame,
      description: 'Passionate about modern ES6+ paradigms, asynchronous workflow patterns, clean closures, functional code flows, and robust error-handling.',
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Problem Solver',
      icon: Lightbulb,
      description: 'Focusing on algorithmic efficiency, elegant UI state management, debugging complex state issues, and solving structural bottlenecks.',
      color: 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Continuous Learner',
      icon: GraduationCap,
      description: 'Constantly testing and incorporating new paradigms, tool chains, and specifications like Tailwind v4, Vite configurations, and micro-animations.',
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">About Me</h2>
        <p className="text-sm font-semibold text-slate-500">My core technical pillars and philosophy.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Core Philosophy Intro Card */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary/5 to-indigo-500/5 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="space-y-4 text-center md:text-left flex-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Designing with Precision, Developing for Performance
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              I believe in clean, expressive code and fluid, responsive interfaces. Every layout I craft is optimized for accessibility, cross-browser consistency, and pixel-perfect layouts. By combining software engineering concepts with intuitive UI/UX practices, I build tools that users enjoy interacting with.
            </p>
          </div>
        </motion.div>

        {/* Core Pillars Grid */}
        {roles.map((role) => (
          <motion.div
            key={role.title}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
              <role.icon className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">{role.title}</h4>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {role.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
