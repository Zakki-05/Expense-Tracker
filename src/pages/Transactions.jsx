import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Search, SlidersHorizontal, Edit2, Trash2, Tag, Calendar, Plus } from 'lucide-react';
import TransactionModal from '../components/TransactionModal';
import toast from 'react-hot-toast';

export default function Transactions() {
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useExpenses();
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter & Search Logic
  const filtered = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.amount - a.amount;
    if (sortBy === 'lowest') return a.amount - b.amount;
    return 0;
  });

  // Paginated Results
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (tx) => {
    setEditingTransaction(tx);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, data);
      toast.success('Transaction updated!');
    } else {
      addTransaction(data);
      toast.success('Transaction added!');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted');
    }
  };

  const categories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Transactions</h1>
          <p className="text-sm font-semibold text-slate-500">View and manage your transaction history.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer text-sm"
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* Filters & Search Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2"
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses</option>
            <option value="income">Income</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-medium border-collapse">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800/50">
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {paginated.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4">
                    <div className="font-bold text-slate-800 dark:text-white">{tx.title}</div>
                    {tx.note && <div className="text-xs text-slate-400 mt-0.5">{tx.note}</div>}
                  </td>
                  <td className="py-4">
                    <span className="bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 text-xs px-2.5 py-1 rounded-full font-bold">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 text-xs">{tx.paymentMethod}</td>
                  <td className="py-4 text-slate-500 text-xs">{tx.date}</td>
                  <td className={`py-4 text-right font-black ${tx.type === 'income' ? 'text-success' : 'text-slate-800 dark:text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
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
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 font-semibold">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 text-xs">
            <span className="font-semibold text-slate-400">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">Prev</button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">Next</button>
            </div>
          </div>
        )}
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
