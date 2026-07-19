import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function TechStackSection() {
  const stack = [
    {
      category: 'Frontend',
      icon: Layout,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      items: [
        { name: 'React', desc: 'Component architecture, Hooks, Context' },
        { name: 'JavaScript', desc: 'ES6+, Async flows, DOM manipulation' },
        { name: 'Tailwind CSS', desc: 'Utility classes, Custom @theme variables' },
        { name: 'HTML5', desc: 'Semantic tags, SEO, Web accessibility' },
        { name: 'CSS3', desc: 'Flexbox, CSS Grid, Transitions/Animations' },
      ],
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      items: [
        { name: 'Django', desc: 'Python framework, ORM, MVC pattern' },
        { name: 'REST API', desc: 'Endpoint routing, HTTP verbs, JSON parsing' },
      ],
    },
    {
      category: 'Database',
      icon: Database,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      items: [
        { name: 'PostgreSQL', desc: 'Relational DB, SQL queries, Join mapping' },
      ],
    },
    {
      category: 'Tools',
      icon: Wrench,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      items: [
        { name: 'Git', desc: 'Version control, Branching, Merging' },
        { name: 'GitHub', desc: 'PR reviews, Issues, Collaboration' },
        { name: 'VS Code', desc: 'Debugger setup, Ext extensions' },
        { name: 'Vite', desc: 'Fast bundling, Config setups' },
        { name: 'Postman', desc: 'API route validation & request tests' },
        { name: 'Figma', desc: 'UX layouts, Component mockups' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 15 } },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Tech Stack</h2>
        <p className="text-sm font-semibold text-slate-500">The tools, languages, and technologies I work with.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stack.map((cat) => (
          <motion.div
            key={cat.category}
            variants={cardVariants}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow duration-300"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${cat.color}`}>
                <cat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base">{cat.category}</h3>
            </div>

            {/* Stack Items */}
            <div className="flex-1 space-y-4">
              {cat.items.map((item) => (
                <div key={item.name} className="group flex flex-col gap-0.5 border-l-2 border-slate-100 dark:border-slate-800 hover:border-primary pl-3 transition-colors duration-250">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 leading-tight">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
