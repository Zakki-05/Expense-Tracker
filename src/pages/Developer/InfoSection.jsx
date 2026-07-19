import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Briefcase, GraduationCap, MapPin, Globe, Github, Linkedin, Mail, FileDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InfoSection() {
  const infoItems = [
    { label: 'Name', value: 'P. Mohammed Zakki Adnaan', icon: User },
    { label: 'Role', value: 'Frontend Developer', icon: Briefcase },
    { label: 'Specialization', value: 'React.js Developer', icon: Shield },
    { label: 'Education', value: 'Bachelor of Computer Applications (BCA)', icon: GraduationCap },
    { label: 'Experience', value: 'Frontend Projects using React.js', icon: Briefcase },
    { label: 'Location', value: 'Tamil Nadu, India', icon: MapPin },
  ];

  const socialItems = [
    { label: 'Portfolio', value: 'https://zakki-dev.netlify.app/', icon: Globe, href: 'https://zakki-dev.netlify.app/' },
    { label: 'GitHub', value: 'https://github.com/Zakki-05', icon: Github, href: 'https://github.com/Zakki-05' },
    { label: 'LinkedIn', value: 'https://linkedin.com/in/mohammed-zakki', icon: Linkedin, href: 'https://linkedin.com/in/mohammed-zakki-adnaan' },
    { label: 'Email', value: 'mohammedzakki05@gmail.com', icon: Mail, href: 'mailto:mohammedzakki05@gmail.com' },
  ];

  const handleDownloadResume = () => {
    toast.success('Resume download started! (Placeholder)');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Section 2: Developer Information */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Developer Information
          </h3>

          <div className="space-y-4">
            {infoItems.map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                    {item.label}
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 leading-normal">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {socialItems.map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                    {item.label}
                  </p>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary dark:text-blue-400 hover:underline mt-1 block truncate max-w-[200px]"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Resume Button */}
        <button
          onClick={handleDownloadResume}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-100 transition-all cursor-pointer text-sm"
        >
          <FileDown className="w-4 h-4" />
          <span>Download Resume</span>
        </button>
      </motion.div>

      {/* Section 3: About Me */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-center"
      >
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            About Me
          </h3>

          <div className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Hi, I'm P. Mohammed Zakki Adnaan, a passionate Frontend Developer specializing in React.js and modern web technologies.
            </p>
            <p>
              I enjoy building responsive, scalable, and user-friendly web applications that provide great user experiences.
            </p>
            <p className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/10">
              This Expense Tracker project was developed to showcase modern frontend development practices including reusable components, clean architecture, responsive layouts, state management, and interactive dashboards.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
