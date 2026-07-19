import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Input from '../components/Input';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function Register() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await authRegister(data.name, data.email, data.password);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Join us to manage your expenses seamlessly.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name')}
              disabled={isSubmitting}
            />

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

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
