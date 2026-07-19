import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingDown,
  TrendingUp,
  BarChart2,
  PieChart,
  Settings,
  User,
  LogOut,
  X,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Income', path: '/income', icon: TrendingUp },
    { name: 'Expenses', path: '/expenses', icon: TrendingDown },
    { name: 'Budget', path: '/budget', icon: PieChart },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Developer', path: '/developer', icon: Code2 },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/50 dark:border-slate-800/50 z-50 md:hidden flex flex-col"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black">
                    ET
                  </div>
                  <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
                    ExpenseTracker
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold ${
                        isActive
                          ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-danger hover:bg-danger/10 dark:hover:bg-danger/20 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
