import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Bell, Menu, User as UserIcon } from 'lucide-react';

export default function Navbar({ onMobileMenuToggle }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-6 shadow-sm sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
            ET
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button
          className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200/50 dark:border-slate-800/50 pl-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-inner">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
              {user?.name || 'Guest User'}
            </p>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {user?.email || 'guest@domain.com'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
