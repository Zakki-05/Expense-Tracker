import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Input from '../components/Input';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8 glass dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in to your premium fintech portal.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register('email')}
              disabled={isSubmitting}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-[38px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-slate-700 dark:text-slate-300">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="font-semibold text-primary hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Create account
          </Link>
        </p>

      </motion.div>
    </div>
  );
}
