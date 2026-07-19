import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Edit2, Trash2, Plus, TrendingDown } from 'lucide-react';
import TransactionModal from '../components/TransactionModal';
import toast from 'react-hot-toast';

export default function Expenses() {
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useExpenses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const totalExpense = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (tx) => {
    setEditingTransaction(tx);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    const dataWithType = { ...data, type: 'expense' };
    if (editingTransaction) {
      editTransaction(editingTransaction.id, dataWithType);
      toast.success('Expense updated!');
    } else {
      addTransaction(dataWithType);
      toast.success('Expense added!');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense record?')) {
      deleteTransaction(id);
      toast.success('Expense deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Expenses</h1>
          <p className="text-sm font-semibold text-slate-500">Track and manage your outgoing cash flows.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer text-sm"
        >
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Expense Summary Card */}
      <div className="bg-gradient-to-br from-red-650 to-rose-700 rounded-3xl p-8 text-white shadow-xl shadow-red-500/20 max-w-md">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-red-100" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-100">Total Outgoings</span>
        </div>
        <p className="text-4xl font-black mt-3">{formatCurrency(totalExpense)}</p>
      </div>

      {/* Expense List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Expense Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-medium border-collapse">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800/50">
                <th className="pb-3">Recipient/Service</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {expenseTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 font-bold text-slate-850 dark:text-white">{tx.title}</td>
                  <td className="py-4">
                    <span className="bg-slate-100 dark:bg-slate-850 text-slate-650 dark:text-slate-450 text-xs px-2.5 py-1 rounded-full font-bold">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 text-xs">{tx.paymentMethod}</td>
                  <td className="py-4 text-slate-500 text-xs">{tx.date}</td>
                  <td className="py-4 text-right font-black text-slate-900 dark:text-white">
                    -{formatCurrency(tx.amount)}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenEditModal(tx)} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(tx.id)} className="p-1.5 rounded-lg text-danger hover:bg-red-555/10 dark:hover:bg-red-950/20 transition-colors cursor-pointer">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {expenseTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 font-semibold">No expense records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        transactionToEdit={editingTransaction}
      />
    </div>
  );
}
