import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthInterceptor from '../../hooks/useAuthInterceptor';
import { AuthContext } from './authContext';

const BASE_URL = 'http://localhost:4000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle 401 errors
  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError('Session expired. Please log in again.');
    navigate('/login');
  };

  useAuthInterceptor(token, handleUnauthorized);

  // Initialize state based on localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedEmail && storedRole) {
      setUser({ email: storedEmail, role: storedRole });
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login 
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      });

      const { token: authToken, email: userEmail, role } = response.data;

      localStorage.setItem('token', authToken);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);

      setToken(authToken);
      setUser({ email: userEmail, role });
      setIsAuthenticated(true);
      setLoading(false);
      navigate('/'); 

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.err || 'Login failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Signup 
  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${BASE_URL}/api/user/signup`, {
        email,
        password,
      });

      const { token: authToken, email: userEmail, role } = response.data;

      localStorage.setItem('token', authToken);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);

      setToken(authToken);
      setUser({ email: userEmail, role });
      setIsAuthenticated(true);
      setLoading(false);
      navigate('/'); 

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.err || 'Signup failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Admin Signup
  const signupAdmin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${BASE_URL}/api/user/signup-admin`, {
        email,
        password,
      });

      const { token: authToken, email: userEmail, role } = response.data;

      localStorage.setItem('token', authToken);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);

      setToken(authToken);
      setUser({ email: userEmail, role });
      setIsAuthenticated(true);
      setLoading(false);
      navigate('/'); 

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.err || 'Admin signup failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Logout 
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate('/login'); 
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    signupAdmin,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};