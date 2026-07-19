import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2 } from 'lucide-react';
import Input from './Input';

const transactionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  amount: z.coerce.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  note: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  tags: z.string().optional(),
});

export default function TransactionModal({ isOpen, onClose, onSubmit, transactionToEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
      priority: 'medium',
      paymentMethod: 'UPI',
      tags: '',
    },
  });

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        ...transactionToEdit,
        tags: transactionToEdit.tags ? transactionToEdit.tags.join(', ') : '',
      });
    } else {
      reset({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        note: '',
        priority: 'medium',
        paymentMethod: 'UPI',
        tags: '',
      });
    }
  }, [transactionToEdit, reset, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };
    onSubmit(formattedData);
    onClose();
  };

  const categories = {
    expense: ['Food & Dining', 'Rent & Living', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Rental', 'Gift', 'Other'],
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Title"
                placeholder="Swiggy, Rent, Client Payment"
                error={errors.title?.message}
                {...register('title')}
                disabled={isSubmitting}
              />
            </div>
            
            <Input
              label="Amount (₹)"
              type="number"
              step="any"
              placeholder="0.00"
              error={errors.amount?.message}
              {...register('amount')}
              disabled={isSubmitting}
            />

            <Input
              label="Date"
              type="date"
              error={errors.date?.message}
              {...register('date')}
              disabled={isSubmitting}
            />

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Type</label>
              <select
                {...register('type')}
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Category</label>
              <select
                {...register('category')}
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="">Select Category</option>
                {categories.expense.map((c) => <option key={c} value={c}>{c}</option>)}
                {categories.income.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs font-medium text-danger mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Payment Method</label>
              <select
                {...register('paymentMethod')}
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="UPI">UPI</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Priority</label>
              <select
                {...register('priority')}
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="col-span-2">
              <Input
                label="Tags (Comma separated)"
                placeholder="bills, shopping, fun"
                error={errors.tags?.message}
                {...register('tags')}
                disabled={isSubmitting}
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Note</label>
              <textarea
                {...register('note')}
                rows={2}
                placeholder="Optional descriptions..."
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-primary/10 transition-colors flex items-center justify-center cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
