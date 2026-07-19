import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ConnectSection() {
  const socials = [
    { label: 'Portfolio', icon: Globe, url: 'https://zakki-dev.netlify.app/', color: 'hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5' },
    { label: 'GitHub', icon: Github, url: 'https://github.com/Zakki-05', color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-800 dark:hover:border-slate-200/50 hover:bg-slate-500/5' },
    { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/mohammed-zakki-adnaan', color: 'hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/5' },
    { label: 'Email', icon: Mail, url: 'mailto:mohammedzakki05@gmail.com', color: 'hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5' },
    { label: 'Resume', icon: FileText, url: '#', color: 'hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5', isResume: true },
  ];

  const handleResumeClick = (e) => {
    toast.success('Resume download started! (Placeholder)');
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Connect With Me</h2>
        <p className="text-sm font-semibold text-slate-500">Reach out for collaborations, project design, or technical inquiries.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {socials.map((social) => {
            if (social.isResume) {
              return (
                <button
                  key={social.label}
                  onClick={handleResumeClick}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-650 dark:text-slate-400 hover:scale-[1.03] transition-all duration-200 font-extrabold text-sm cursor-pointer ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            }
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-650 dark:text-slate-400 hover:scale-[1.03] transition-all duration-200 font-extrabold text-sm ${social.color}`}
              >
                <social.icon className="w-4 h-4" />
                <span>{social.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
