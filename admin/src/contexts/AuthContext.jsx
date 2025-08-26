import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for token in localStorage
      const storedToken = localStorage.getItem('adminToken');
      
      if (storedToken) {
        // Verify token with backend
        const response = await fetch('https://vikasgudi.up.railway.app/api/auth/admin/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true);
            setToken(storedToken);
          } else {
            // Token invalid, clear it
            localStorage.removeItem('adminToken');
            setIsAuthenticated(false);
            setToken(null);
          }
        } else {
          // Token invalid, clear it
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
          setToken(null);
        }
      } else {
        setIsAuthenticated(false);
        setToken(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Call logout endpoint
      await fetch('https://vikasgudi.up.railway.app/api/auth/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('adminToken');
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    loading,
    token,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
