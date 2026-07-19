import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Input from '../components/Input';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSent(true);
      toast.success('Password reset link sent to ' + data.email);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
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
        {!isSent ? (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Reset Password
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Enter your email address and we'll send you a recovery link.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="name@company.com"
                error={errors.email?.message}
                {...register('email')}
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-success animate-bounce" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Check Your Email
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We have sent a password reset link to your email address. Please check your inbox.
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
