import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { useBudget } from '../context/BudgetContext';
import { formatCurrency } from '../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, Plus, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { transactions } = useExpenses();
  const { budgets } = useBudget();
  const navigate = useNavigate();

  // Compute Stats
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const incomeTransactions = transactions.filter((t) => t.type === 'income');

  const totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;
  const savings = Math.max(0, balance);

  // Take last 4 transactions for recent transactions
  const recentList = transactions.slice(0, 4);

  // Dynamically calculate category distributions for pie chart
  const categoriesList = ['Food & Dining', 'Rent & Living', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Other'];
  const colors = ['#2563EB', '#F59E0B', '#16A34A', '#DC2626', '#8B5CF6', '#EC4899', '#64748B'];

  const categoryData = categoriesList
    .map((cat, i) => {
      const value = expenseTransactions
        .filter((t) => t.category === cat)
        .reduce((acc, curr) => acc + curr.amount, 0);
      return { name: cat, value, color: colors[i] };
    })
    .filter((c) => c.value > 0);

  // Dynamically map last 6 months (mock trend based on current totals)
  const cashFlowData = [
    { month: 'Jan', Income: totalIncome * 0.7, Expense: totalExpense * 0.75 },
    { month: 'Feb', Income: totalIncome * 0.8, Expense: totalExpense * 0.8 },
    { month: 'Mar', Income: totalIncome * 0.9, Expense: totalExpense * 0.85 },
    { month: 'Apr', Income: totalIncome * 0.85, Expense: totalExpense * 0.9 },
    { month: 'May', Income: totalIncome * 0.95, Expense: totalExpense * 0.85 },
    { month: 'Jun', Income: totalIncome, Expense: totalExpense },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-sm font-semibold text-slate-500">Real-time financial summary in Indian Rupees.</p>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer text-sm"
        >
          <Plus size={16} /> Manage Transactions
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Current Balance', value: balance, icon: Wallet, color: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400' },
          { title: 'Monthly Income', value: totalIncome, icon: ArrowUpRight, color: 'bg-green-100 text-success dark:bg-green-950/30' },
          { title: 'Monthly Expenses', value: totalExpense, icon: ArrowDownRight, color: 'bg-red-100 text-danger dark:bg-red-950/30' },
          { title: 'Savings', value: savings, icon: PiggyBank, color: 'bg-amber-100 text-warning dark:bg-amber-950/30' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.title}</span>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-black mt-4">{formatCurrency(stat.value)}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-6">Cash Flow Trend</h3>
          <div className="h-72 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="Income" stroke="#16A34A" fillOpacity={1} fill="url(#colorInc)" strokeWidth={2} />
                <Area type="monotone" dataKey="Expense" stroke="#DC2626" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-6">Expense Distribution</h3>
          {categoryData.length > 0 ? (
            <>
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                      {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4 flex-1 overflow-y-auto">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      <span className="text-slate-600 dark:text-slate-400">{cat.name}</span>
                    </div>
                    <span>{formatCurrency(cat.value)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <p className="text-sm font-semibold">No expense records yet.</p>
              <p className="text-xs">Add transactions to generate chart.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Recent Activity</h3>
          <button onClick={() => navigate('/transactions')} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer">
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-medium">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {recentList.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3.5 font-bold text-slate-800 dark:text-white">{tx.title}</td>
                  <td className="py-3.5">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-2.5 py-1 rounded-full font-bold">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500">{tx.date}</td>
                  <td className={`py-3.5 text-right font-black ${tx.type === 'income' ? 'text-success' : 'text-slate-800 dark:text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
              {recentList.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-slate-400">No transactions recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
