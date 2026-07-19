import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, FolderGit2, Star, Users, Globe } from 'lucide-react';

export default function GithubSection() {
  const stats = [
    { label: 'Total Commits', value: '1,200+', icon: GitCommit, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Projects Completed', value: '15+', icon: GitBranch, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Repositories', value: '24', icon: FolderGit2, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'GitHub Stars', value: '120+', icon: Star, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Followers', value: '80+', icon: Users, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Open Source Projects', value: '5+', icon: Globe, color: 'text-pink-500 bg-pink-500/10' },
  ];

  // Generate 52 weeks * 7 days of mock contribution levels (0 to 4)
  const contributionGrid = Array.from({ length: 112 }, (_, i) => {
    // Generate organic looking clusters
    const seed = Math.sin(i * 0.1) * Math.cos(i * 0.05);
    let level = 0;
    if (seed > 0.6) level = 4;
    else if (seed > 0.2) level = 3;
    else if (seed > -0.2) level = 2;
    else if (seed > -0.6) level = 1;
    return level;
  });

  const levelColors = [
    'bg-slate-100 dark:bg-slate-800/80',
    'bg-emerald-200 dark:bg-emerald-950/30',
    'bg-emerald-350 bg-emerald-400/50 dark:bg-emerald-800/40',
    'bg-emerald-500/70 dark:bg-emerald-600/70',
    'bg-emerald-600 dark:bg-emerald-500',
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">GitHub Contributions</h2>
        <p className="text-sm font-semibold text-slate-500">Activity summary and open-source contribution metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GitHub Mock Contribution Graph Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Commit History</h3>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Last 4 Months</span>
          </div>

          {/* Contributions Grid */}
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto py-2">
            {contributionGrid.map((level, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.3 }}
                className={`w-3.5 h-3.5 rounded-[3px] cursor-pointer ${levelColors[level]} transition-colors duration-150`}
                title={`Level ${level} Contribution`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-4">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-slate-800/80" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950/30" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400/50 dark:bg-emerald-800/40" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/70 dark:bg-emerald-600/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-500" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 leading-tight uppercase truncate mr-1">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-md ${stat.color} flex-shrink-0`}>
                  <stat.icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-lg font-black text-slate-850 dark:text-white mt-3 leading-none">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
