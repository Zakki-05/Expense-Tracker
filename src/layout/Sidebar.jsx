import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Code2
} from 'lucide-react';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
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
    <aside className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200/50 dark:border-slate-800/50 hidden md:flex flex-col shadow-sm transition-colors duration-300">
      <div className="h-20 flex items-center px-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black">
            ET
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
            ExpenseTracker
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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
    </aside>
  );
}
