import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Developer from './pages/Developer';
import CapacitorHandler from './components/CapacitorHandler';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExpenseProvider>
          <BudgetProvider>
            <BrowserRouter>
              <CapacitorHandler />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Core App Layout Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="income" element={<Income />} />
                  <Route path="expenses" element={<Expenses />} />
                  <Route path="budget" element={<Budget />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="developer" element={<Developer />} />
                </Route>

                {/* Fallback 404 Route */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </BudgetProvider>
        </ExpenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
