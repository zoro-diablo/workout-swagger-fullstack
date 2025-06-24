import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <h1 className='text-xl font-semibold text-gray-900'>
              Workout Tracker
            </h1>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-gray-700'>
              Welcome, {user?.email}
            </span>
            <button
              onClick={logout}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
