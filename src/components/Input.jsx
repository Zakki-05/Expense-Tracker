import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, type = 'text', ...props }, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`block w-full rounded-lg border bg-white dark:bg-slate-900 py-2.5 ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-primary'
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-danger animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
