/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { STORAGE_KEYS } from '../config/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await api.register(email, password, username);
      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ ...user, ...userData }));
  };

  const completeOnboarding = async (onboardingData) => {
    try {
      const response = await api.completeOnboarding(onboardingData);
      if (response.success) {
        updateUser({ onboardingCompleted: true, ...onboardingData });
        return { success: true, data: response.data };
      }
      return { success: false, error: response.message || 'Onboarding failed' };
    } catch (error) {
      console.error('Onboarding error:', error);
      return { success: false, error: error.message || 'Onboarding failed' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
