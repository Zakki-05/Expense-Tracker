import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulated API call latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Accept any credentials for mock frontend flow
    const displayName = email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const mockUser = { id: Date.now(), email, name: displayName, avatar: null };
    const mockToken = 'mock-jwt-header.payload.signature';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockToken);
    return mockUser;
  };

  const register = async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = { id: 2, email, name, avatar: null };
    const mockToken = 'mock-jwt-header.payload.signature';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockToken);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = (name, email) => {
    setUser((prev) => {
      const updated = { ...prev, name, email };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
