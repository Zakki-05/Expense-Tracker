import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Globe, FileText, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const links = [
    { label: 'Portfolio Website', icon: Globe, url: 'https://zakki.dev', color: 'hover:text-blue-500 hover:bg-blue-500/5 hover:border-blue-500/30' },
    { label: 'GitHub Profile', icon: Github, url: 'https://github.com/Zakki-05', color: 'hover:text-slate-800 dark:hover:text-white hover:bg-slate-500/5 hover:border-slate-500/30' },
    { label: 'LinkedIn Connection', icon: Linkedin, url: 'https://linkedin.com/in/zakki', color: 'hover:text-blue-600 hover:bg-blue-600/5 hover:border-blue-600/30' },
    { label: 'Download Resume', icon: FileText, url: '#', color: 'hover:text-emerald-500 hover:bg-emerald-500/5 hover:border-emerald-500/30' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-650 dark:from-blue-900/60 dark:to-indigo-900/60 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 md:p-12 shadow-sm text-center text-white">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto space-y-8 flex flex-col items-center">
        <div className="space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 dark:text-blue-300">
            Let's Collaborate
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-sm font-semibold text-blue-100 dark:text-slate-350 max-w-lg mx-auto leading-relaxed">
            I am currently open to consulting engagements, full-time engineering positions, and collaborative open-source web application build-outs.
          </p>
        </div>

        {/* Email CTA button */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          href="mailto:zakki@example.com"
          className="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-extrabold px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer text-sm"
        >
          <Mail className="w-4 h-4 text-primary" />
          <span>Get In Touch</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>

        {/* Quick Social Nodes */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-blue-100 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-xs font-bold"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
