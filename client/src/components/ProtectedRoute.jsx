import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, loading, user } = useAuth();

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