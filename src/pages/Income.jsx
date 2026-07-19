import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Edit2, Trash2, Plus, TrendingUp } from 'lucide-react';
import TransactionModal from '../components/TransactionModal';
import toast from 'react-hot-toast';

export default function Income() {
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useExpenses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const incomeTransactions = transactions.filter((t) => t.type === 'income');
  const totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (tx) => {
    setEditingTransaction(tx);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    const dataWithType = { ...data, type: 'income' };
    if (editingTransaction) {
      editTransaction(editingTransaction.id, dataWithType);
      toast.success('Income updated!');
    } else {
      addTransaction(dataWithType);
      toast.success('Income added!');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this income record?')) {
      deleteTransaction(id);
      toast.success('Income deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Income Sources</h1>
          <p className="text-sm font-semibold text-slate-500">Track and manage your diverse revenue streams.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer text-sm"
        >
          <Plus size={16} /> Add Income
        </button>
      </div>

      {/* Income Summary Card */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl shadow-green-500/20 max-w-md">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-150" />
          <span className="text-xs font-bold uppercase tracking-wider text-green-100">Total Income</span>
        </div>
        <p className="text-4xl font-black mt-3">{formatCurrency(totalIncome)}</p>
      </div>

      {/* Income List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Income Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-medium border-collapse">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800/50">
                <th className="pb-3">Source</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {incomeTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 font-bold text-slate-850 dark:text-white">{tx.title}</td>
                  <td className="py-4">
                    <span className="bg-slate-100 dark:bg-slate-850 text-slate-650 dark:text-slate-450 text-xs px-2.5 py-1 rounded-full font-bold">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 text-xs">{tx.paymentMethod}</td>
                  <td className="py-4 text-slate-500 text-xs">{tx.date}</td>
                  <td className="py-4 text-right font-black text-success">
                    +{formatCurrency(tx.amount)}
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
              {incomeTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 font-semibold">No income records found.</td>
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
