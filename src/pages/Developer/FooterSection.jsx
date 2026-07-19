import React from 'react';

export default function FooterSection() {
  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 pb-4 text-center space-y-2">
      <p className="text-sm font-semibold text-slate-505 dark:text-slate-400 flex items-center justify-center gap-1">
        Designed and Developed with <span className="text-danger animate-pulse">❤️</span> by{' '}
        <span className="font-extrabold text-slate-800 dark:text-white">P. Mohammed Zakki Adnaan</span>
      </p>
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
        Frontend Developer | React.js Developer
      </p>
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600">
        &copy; 2026 All Rights Reserved.
      </p>
    </footer>
  );
}
