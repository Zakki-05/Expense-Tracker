import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, FileText, Mail, MapPin, GraduationCap } from 'lucide-react';
import avatarImg from '../../assets/developer_avatar.png';

export default function HeroSection() {
  const socials = [
    { name: 'Portfolio', icon: Globe, url: 'https://zakki.dev', color: 'hover:text-blue-500 hover:border-blue-500/50' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/Zakki-05', color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-800 dark:hover:border-slate-200/50' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/zakki', color: 'hover:text-blue-600 hover:border-blue-600/50' },
    { name: 'Resume', icon: FileText, url: '#', color: 'hover:text-emerald-500 hover:border-emerald-500/50' },
    { name: 'Email', icon: Mail, url: 'mailto:zakki@example.com', color: 'hover:text-red-500 hover:border-red-500/50' },
  ];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-10 shadow-sm transition-colors duration-300">
      {/* Premium Gradient Background Blurs */}
      <div className="absolute top-0 right-0 -w-64 -h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -w-64 -h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Profile Image & Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-primary via-indigo-500 to-purple-600 shadow-xl">
            <img 
              src={avatarImg} 
              alt="Developer Avatar" 
              className="w-full h-full object-cover rounded-full bg-slate-100 dark:bg-slate-800"
            />
          </div>
          {/* Status Badge */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-full py-1.5 px-4 shadow-md flex items-center gap-2 whitespace-nowrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Available for projects</span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Zakki
            </h1>
            <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200">
              Senior React Frontend Engineer & UI/UX Designer
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            I design and build production-grade web applications. I specialize in building responsive architectures, state management systems, and high-fidelity user experiences using React and Tailwind CSS.
          </motion.p>

          {/* Quick Stats Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200/20">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>5+ Years Learning & Building</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200/20">
              <MapPin className="w-4 h-4 text-danger" />
              <span>Global / Remote</span>
            </div>
          </motion.div>

          {/* Social Links / Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:scale-[1.03] transition-all duration-200 font-bold text-xs ${social.color}`}
              >
                <social.icon className="w-4 h-4" />
                <span>{social.name}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
