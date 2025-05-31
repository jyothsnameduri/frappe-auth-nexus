
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: 'IT' | 'HR' | 'Admin' | 'General';
  role: 'Employee' | 'Agent' | 'Admin';
  phone?: string;
  isActive: boolean;
  lastActive: Date;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    department: 'IT',
    role: 'Admin',
    phone: '+1 (555) 123-4567',
    isActive: true,
    lastActive: new Date(),
    createdAt: new Date('2023-01-15')
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    console.log('Login attempt:', { email, password });
    // In real app, this would make an API call
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    // Simulate API call
    console.log('Registration attempt:', userData);
    // In real app, this would make an API call
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
