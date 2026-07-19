import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Settings as SettingsIcon, Sun, Moon, Bell, Trash2, Globe,
  Lock, Download, Info, Eye, EyeOff, RefreshCw, Database,
  Shield, Monitor, Palette, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpenseContext';
import { format } from 'date-fns';

// ─── Toggle Switch Component ──────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

// ─── Section Card Component ────────────────────────────────────────────────────
function SectionCard({ icon: Icon, iconColor = 'text-slate-400', title, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ─── Row Component ─────────────────────────────────────────────────────────────
function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex-1 mr-4">
        <p className="text-sm font-semibold text-slate-800 dark:text-white">{label}</p>
        {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return <hr className="border-slate-100 dark:border-slate-800/50" />;
}

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { transactions } = useExpenses();

  // ── Preferences ──
  const [currency, setCurrency] = useState(() => localStorage.getItem('settings_currency') || 'INR');
  const [language, setLanguage] = useState(() => localStorage.getItem('settings_language') || 'English');
  const [dateFormat, setDateFormat] = useState(() => localStorage.getItem('settings_date_format') || 'dd/MM/yyyy');
  const [compactView, setCompactView] = useState(() => localStorage.getItem('settings_compact') === 'true');
  const [animations, setAnimations] = useState(() => localStorage.getItem('settings_animations') !== 'false');

  // ── Notifications ──
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('settings_notifications');
    return saved ? JSON.parse(saved) : { budgetAlerts: true, weeklyReports: false, newFeatures: true, dailyReminder: false };
  });

  // ── Privacy ──
  const [hideAmounts, setHideAmounts] = useState(() => localStorage.getItem('settings_hide_amounts') === 'true');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => localStorage.getItem('settings_analytics') !== 'false');

  // ── Security ──
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [autoLock, setAutoLock] = useState(() => localStorage.getItem('settings_autolock') === 'true');

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('settings_currency', currency);
    localStorage.setItem('settings_language', language);
    localStorage.setItem('settings_date_format', dateFormat);
    localStorage.setItem('settings_compact', compactView);
    localStorage.setItem('settings_animations', animations);
    localStorage.setItem('settings_notifications', JSON.stringify(notifications));
    localStorage.setItem('settings_hide_amounts', hideAmounts);
    localStorage.setItem('settings_analytics', analyticsEnabled);
    localStorage.setItem('settings_autolock', autoLock);
    toast.success('Settings saved successfully!');
    setTimeout(() => window.location.reload(), 800);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
      localStorage.clear();
      toast.success('App data cleared!');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      user: user ? { name: user.name, email: user.email } : null,
      transactions,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported as JSON!');
  };

  const handleExportCSV = () => {
    const header = 'Title,Amount,Type,Category,Date,Payment Method,Note\n';
    const rows = transactions.map((t) =>
      `"${t.title}",${t.amount},${t.type},"${t.category}","${t.date}","${t.paymentMethod || ''}","${t.note || ''}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported as CSV!');
  };

  const handleSavePin = () => {
    if (newPin.length < 4) { toast.error('PIN must be at least 4 digits.'); return; }
    localStorage.setItem('settings_pin', newPin);
    setCurrentPin('');
    setNewPin('');
    toast.success('PIN updated successfully!');
  };

  const selectClass = "px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">Configure your application preferences.</p>
      </div>

      {/* ── 1. App Preferences ── */}
      <SectionCard icon={Palette} iconColor="text-primary" title="App Preferences">
        <SettingRow label="Dark Mode" desc="Enable modern dark color tones.">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </SettingRow>
        <Divider />
        <SettingRow label="Preferred Currency" desc="Set the default currency format.">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={selectClass}>
            <option value="INR">₹ Indian Rupee (INR)</option>
            <option value="USD">$ US Dollar (USD)</option>
            <option value="EUR">€ Euro (EUR)</option>
            <option value="GBP">£ British Pound (GBP)</option>
            <option value="JPY">¥ Japanese Yen (JPY)</option>
          </select>
        </SettingRow>
        <Divider />
        <SettingRow label="Language" desc="Choose your interface language.">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className={selectClass}>
            <option value="English">English</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Spanish">Español (Spanish)</option>
            <option value="French">Français (French)</option>
          </select>
        </SettingRow>
        <Divider />
        <SettingRow label="Date Format" desc="How dates are displayed across the app.">
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className={selectClass}>
            <option value="dd/MM/yyyy">DD/MM/YYYY</option>
            <option value="MM/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy-MM-dd">YYYY-MM-DD</option>
          </select>
        </SettingRow>
        <Divider />
        <SettingRow label="Compact View" desc="Show denser transaction lists.">
          <Toggle checked={compactView} onChange={() => setCompactView((p) => !p)} />
        </SettingRow>
        <Divider />
        <SettingRow label="Animations" desc="Enable smooth transitions and micro-animations.">
          <Toggle checked={animations} onChange={() => setAnimations((p) => !p)} />
        </SettingRow>
      </SectionCard>

      {/* ── 2. Notifications ── */}
      <SectionCard icon={Bell} iconColor="text-yellow-500" title="Notifications">
        {[
          { key: 'budgetAlerts', label: 'Overspending Alerts', desc: 'Warn when expenses exceed category budgets.' },
          { key: 'weeklyReports', label: 'Weekly Summary', desc: 'Receive automated weekly progress reports.' },
          { key: 'dailyReminder', label: 'Daily Reminder', desc: 'Nudge to log your daily expenses.' },
          { key: 'newFeatures', label: 'Product Updates', desc: 'Announce new premium features and updates.' },
        ].map((item, i) => (
          <React.Fragment key={item.key}>
            {i > 0 && <Divider />}
            <SettingRow label={item.label} desc={item.desc}>
              <Toggle checked={notifications[item.key]} onChange={() => handleToggleNotification(item.key)} />
            </SettingRow>
          </React.Fragment>
        ))}
      </SectionCard>

      {/* ── 3. Privacy ── */}
      <SectionCard icon={Eye} iconColor="text-purple-500" title="Privacy">
        <SettingRow label="Hide Amounts" desc="Mask all monetary values with ••••.">
          <Toggle checked={hideAmounts} onChange={() => setHideAmounts((p) => !p)} />
        </SettingRow>
        <Divider />
        <SettingRow label="Usage Analytics" desc="Help improve the app with anonymous usage data.">
          <Toggle checked={analyticsEnabled} onChange={() => setAnalyticsEnabled((p) => !p)} />
        </SettingRow>
      </SectionCard>

      {/* ── 4. Security ── */}
      <SectionCard icon={Shield} iconColor="text-green-500" title="Security">
        <SettingRow label="Auto-Lock App" desc="Require PIN when app is reopened after 5 minutes.">
          <Toggle checked={autoLock} onChange={() => setAutoLock((p) => !p)} />
        </SettingRow>
        <Divider />
        <div className="space-y-3 pt-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-white">Change App PIN</p>
          <p className="text-xs text-slate-500">Set a numeric PIN to protect your financial data.</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type={showPin ? 'text' : 'password'}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="New PIN (4-6 digits)"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10"
              />
              <button
                onClick={() => setShowPin((p) => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handleSavePin}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Set PIN
            </button>
          </div>
        </div>
      </SectionCard>

      {/* ── 5. Export Data ── */}
      <SectionCard icon={Download} iconColor="text-teal-500" title="Export Data">
        <SettingRow label="Export as JSON" desc={`${transactions.length} transactions will be included.`}>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> JSON
          </button>
        </SettingRow>
        <Divider />
        <SettingRow label="Export as CSV" desc="Open in Excel, Google Sheets, or any spreadsheet app.">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </SettingRow>
      </SectionCard>

      {/* ── 6. Data Management ── */}
      <SectionCard icon={Database} iconColor="text-red-500" title="Data Management">
        <SettingRow label="Reset App Data" desc="Delete all transactions, budgets, and settings permanently.">
          <button
            onClick={handleClearData}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl border border-red-300 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 font-semibold text-xs transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </SettingRow>
      </SectionCard>

      {/* ── 7. App Info ── */}
      <SectionCard icon={Info} iconColor="text-slate-400" title="About App">
        {[
          { label: 'App Name', value: 'Expense Tracker' },
          { label: 'Version', value: 'v1.0.0' },
          { label: 'Developer', value: 'P. Mohammed Zakki Adnaan' },
          { label: 'Built With', value: 'React + Vite + Tailwind CSS' },
          { label: 'Platform', value: 'Web & Android (Capacitor)' },
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            {i > 0 && <Divider />}
            <SettingRow label={item.label}>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.value}</span>
            </SettingRow>
          </React.Fragment>
        ))}
      </SectionCard>

      {/* ── Save Button ── */}
      <div className="flex justify-end pb-6">
        <button
          onClick={handleSaveSettings}
          className="py-3 px-8 rounded-2xl bg-primary hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
}
