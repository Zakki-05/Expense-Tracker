import React, { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext();

const initialBudgets = [
  { category: 'Food & Dining', limit: 15000 },
  { category: 'Rent & Living', limit: 25000 },
  { category: 'Transport', limit: 6000 },
  { category: 'Entertainment', limit: 8000 },
  { category: 'Utilities', limit: 5000 },
];

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  const [monthlyLimit, setMonthlyLimit] = useState(() => {
    const saved = localStorage.getItem('monthly_limit');
    return saved ? parseFloat(saved) : 60000;
  });

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('monthly_limit', monthlyLimit.toString());
  }, [monthlyLimit]);

  const updateCategoryBudget = (category, limit) => {
    setBudgets((prev) => {
      const exists = prev.some((b) => b.category === category);
      if (exists) {
        return prev.map((b) => (b.category === category ? { ...b, limit: parseFloat(limit) } : b));
      }
      return [...prev, { category, limit: parseFloat(limit) }];
    });
  };

  const updateMonthlyLimit = (limit) => {
    setMonthlyLimit(parseFloat(limit));
  };

  return (
    <BudgetContext.Provider value={{ budgets, monthlyLimit, updateCategoryBudget, updateMonthlyLimit }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error('useBudget must be used within a BudgetProvider');
  return context;
};
