import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/authContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to='/' />;
  }

  return children;
};
