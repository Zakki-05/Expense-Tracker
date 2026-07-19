import React from 'react';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  const skills = [
    { name: 'React.js', percentage: 95, color: 'bg-primary' },
    { name: 'JavaScript (ES6+)', percentage: 90, color: 'bg-amber-500' },
    { name: 'Tailwind CSS', percentage: 95, color: 'bg-cyan-500' },
    { name: 'HTML5 & CSS3', percentage: 95, color: 'bg-orange-500' },
    { name: 'Responsive Web Design', percentage: 95, color: 'bg-indigo-500' },
    { name: 'REST APIs & Integrations', percentage: 85, color: 'bg-emerald-500' },
    { name: 'Git & Command Line', percentage: 90, color: 'bg-red-500' },
    { name: 'GitHub Collaboration', percentage: 90, color: 'bg-slate-700 dark:bg-slate-500' },
    { name: 'UI / UX Design', percentage: 85, color: 'bg-purple-500' },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Technical Skills</h2>
        <p className="text-sm font-semibold text-slate-500">Core proficiency levels in design and engineering domains.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                <span className="text-slate-400 dark:text-slate-500">{skill.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                  className={`h-full rounded-full ${skill.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
