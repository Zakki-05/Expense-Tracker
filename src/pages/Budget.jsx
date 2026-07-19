import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Target, AlertTriangle, CheckCircle, Edit, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Budget() {
  const { budgets, monthlyLimit, updateCategoryBudget, updateMonthlyLimit } = useBudget();
  const { transactions } = useExpenses();

  // Modal edit states
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingLimit, setEditingLimit] = useState('');
  const [newMonthlyLimit, setNewMonthlyLimit] = useState('');
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);

  // Compute expenses by category
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const totalExpense = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  const getExpensesForCategory = (category) => {
    return expenseTransactions
      .filter((t) => t.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const handleSaveGlobalLimit = () => {
    if (!newMonthlyLimit || parseFloat(newMonthlyLimit) <= 0) {
      toast.error('Please enter a valid monthly limit.');
      return;
    }
    updateMonthlyLimit(newMonthlyLimit);
    setIsEditingGlobal(false);
    toast.success('Monthly budget updated!');
  };

  const handleStartEditCategory = (budget) => {
    setEditingCategory(budget.category);
    setEditingLimit(budget.limit);
  };

  const handleSaveCategoryLimit = (category) => {
    if (!editingLimit || parseFloat(editingLimit) <= 0) {
      toast.error('Please enter a valid category limit.');
      return;
    }
    updateCategoryBudget(category, editingLimit);
    setEditingCategory(null);
    toast.success(`${category} limit updated!`);
  };

  const remainingMonthly = monthlyLimit - totalExpense;
  const isGlobalOverspent = totalExpense > monthlyLimit;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Budget Planner</h1>
        <p className="text-sm font-semibold text-slate-500">Plan limits to avoid overspending.</p>
      </div>

      {/* Global Limit card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Monthly Limit</span>
            {isEditingGlobal ? (
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  value={newMonthlyLimit}
                  onChange={(e) => setNewMonthlyLimit(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-sm w-full focus:outline-none"
                  placeholder={monthlyLimit.toString()}
                />
                <button onClick={handleSaveGlobalLimit} className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-700">Save</button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-black">{formatCurrency(monthlyLimit)}</p>
                <button onClick={() => { setIsEditingGlobal(true); setNewMonthlyLimit(monthlyLimit); }} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                  <Edit size={12} /> Edit
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Remaining Balance</span>
          <p className={`text-2xl font-black mt-2 ${isGlobalOverspent ? 'text-danger' : 'text-success'}`}>
            {formatCurrency(remainingMonthly)}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex items-center gap-3">
          {isGlobalOverspent ? (
            <>
              <AlertTriangle className="w-10 h-10 text-danger animate-pulse" />
              <div>
                <p className="text-sm font-bold text-danger">Budget Limit Exceeded</p>
                <p className="text-xs text-slate-500">Consider reducing non-essential costs.</p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="w-10 h-10 text-success" />
              <div>
                <p className="text-sm font-bold text-success">Within Safe Limit</p>
                <p className="text-xs text-slate-500">Your savings are on track this month!</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Category Budgets Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Category Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((b) => {
            const spent = getExpensesForCategory(b.category);
            const percent = Math.min((spent / b.limit) * 100, 100);
            const isOver = spent > b.limit;

            return (
              <div key={b.category} className="border border-slate-100 dark:border-slate-800/50 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-white">{b.category}</span>
                  {editingCategory === b.category ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={editingLimit}
                        onChange={(e) => setEditingLimit(e.target.value)}
                        className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-850 text-xs w-24 bg-white dark:bg-slate-900 focus:outline-none"
                      />
                      <button onClick={() => handleSaveCategoryLimit(b.category)} className="bg-success text-white px-2 py-0.5 rounded text-xs">Save</button>
                    </div>
                  ) : (
                    <button onClick={() => handleStartEditCategory(b)} className="text-xs font-semibold text-slate-400 hover:text-primary hover:underline flex items-center gap-1 cursor-pointer">
                      <Edit size={12} /> Edit Limit
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Spent: {formatCurrency(spent)}</span>
                  <span>Limit: {formatCurrency(b.limit)}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-danger' : percent > 85 ? 'bg-warning' : 'bg-primary'}`}
                  ></div>
                </div>

                {isOver && (
                  <p className="text-xs font-medium text-danger flex items-center gap-1">
                    <AlertTriangle size={12} /> Warning: Limit exceeded by {formatCurrency(spent - b.limit)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
