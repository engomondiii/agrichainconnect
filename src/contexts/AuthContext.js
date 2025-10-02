import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Verify token and get user data
        const userData = await authService.verifyToken(token);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(email, password);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);

      return { success: true, user: response.user };
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(userData);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);

      return { success: true, user: response.user };
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Call logout endpoint
      await authService.logout();
      
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      setError(null);

      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Force logout on client side even if API call fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(refreshToken);
      
      // Update tokens
      localStorage.setItem('authToken', response.token);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      return { success: true };
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Force logout on refresh failure
      await logout();
      
      return { success: false, error: error.message };
    }
  }, [logout]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};