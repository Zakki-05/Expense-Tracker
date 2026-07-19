import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Shield, CheckCircle, Loader2 } from 'lucide-react';
import Input from '../components/Input';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || 'Alex Johnson',
      email: user?.email || 'admin@domain.com',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateUser(data.name, data.email);
      toast.success('Profile details updated!');
    } catch (e) {
      toast.error('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Profile Details</h1>
        <p className="text-sm font-semibold text-slate-500">Update your primary information credentials.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800/50 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 flex items-center justify-center font-bold text-xl shadow-inner">
              {user?.name ? user.name.split(' ').map((n) => n[0]).join('') : 'U'}
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-slate-400 font-semibold">{user?.email || 'guest@domain.com'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
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
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-primary/20 transition-all flex items-center justify-center cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
