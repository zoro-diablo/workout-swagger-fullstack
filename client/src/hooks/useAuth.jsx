import { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return {
    user: context.user,
    token: context.token,
    isAuthenticated: context.isAuthenticated,
    loading: context.loading,
    error: context.error,
    login: context.login,
    signup: context.signup,
    signupAdmin: context.signupAdmin,
    logout: context.logout,
    clearError: context.clearError,
  };
};