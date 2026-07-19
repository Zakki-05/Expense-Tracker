import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

const initialTransactions = [
  { id: '1', title: 'HDFC Salary Credit', amount: 85000, type: 'income', category: 'Salary', date: '2026-07-15', note: 'Monthly pay', priority: 'medium', paymentMethod: 'Bank Transfer', tags: ['work', 'salary'] },
  { id: '2', title: 'Swiggy Delivery', amount: 650, type: 'expense', category: 'Food & Dining', date: '2026-07-14', note: 'Dinner with friends', priority: 'low', paymentMethod: 'UPI', tags: ['food', 'hangout'] },
  { id: '3', title: 'Airtel Broadband', amount: 999, type: 'expense', category: 'Utilities', date: '2026-07-12', note: 'Home internet', priority: 'medium', paymentMethod: 'Net Banking', tags: ['utilities', 'bills'] },
  { id: '4', title: 'Rent Payment', amount: 22000, type: 'expense', category: 'Rent & Living', date: '2026-07-01', note: 'July rent', priority: 'high', paymentMethod: 'Bank Transfer', tags: ['rent', 'fixed'] },
];

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTx = {
      ...transaction,
      id: Date.now().toString(),
      amount: parseFloat(transaction.amount)
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const editTransaction = (id, updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedTx, amount: parseFloat(updatedTx.amount) } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ transactions, addTransaction, editTransaction, deleteTransaction }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within an ExpenseProvider');
  return context;
};
