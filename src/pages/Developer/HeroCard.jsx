import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import avatarImg from '../../assets/developer_avatar.png';

export default function HeroCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-10 transition-all duration-300"
    >
      {/* Visual background gradient blur orbs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Avatar Container */}
      <div className="relative shrink-0">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-primary to-indigo-500 shadow-lg">
          <img 
            src={avatarImg} 
            alt="P. Mohammed Zakki Adnaan Profile" 
            className="w-full h-full object-cover rounded-full bg-slate-100 dark:bg-slate-800"
          />
        </div>
        {/* Pulsing Availability Dot */}
        <div className="absolute bottom-1.5 right-1.5 bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 rounded-full py-1 px-3 shadow flex items-center gap-1.5 whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Available</span>
        </div>
      </div>

      {/* Developer General Overview */}
      <div className="text-center md:text-left space-y-4 flex-1">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-850 dark:text-white leading-tight">
            P. Mohammed Zakki Adnaan
          </h2>
          <p className="text-base font-bold text-primary dark:text-blue-400">
            Frontend Developer
          </p>
        </div>

        <p className="text-sm font-semibold text-slate-650 dark:text-slate-400 leading-relaxed max-w-xl mx-auto md:mx-0">
          Passionate developer crafting modern, premium user interfaces with high performance and interactive animations.
        </p>

        <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-danger" />
          <span>Tamil Nadu, India</span>
        </div>
      </div>
    </motion.div>
  );
}
