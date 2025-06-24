import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './authContext';

const BASE_URL = 'http://localhost:4000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize state based on localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedEmail && storedRole) {
      setToken(storedToken);
      setUser({ email: storedEmail, role: storedRole });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login (public)
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
      navigate('/');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.err || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Signup (public)
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
      navigate('/');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.err || 'Signup failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Admin Signup
  const signupAdmin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${BASE_URL}/api/user/signup-admin`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { token: authToken, email: userEmail, role } = response.data;

      localStorage.setItem('token', authToken);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);

      setToken(authToken);
      setUser({ email: userEmail, role });
      setIsAuthenticated(true);
      navigate('/');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.err || 'Admin signup failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
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

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
