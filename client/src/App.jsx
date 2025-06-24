import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkoutPage from './components/WorkoutPage';
import { WorkoutProvider } from './context/workout/workoutProvider';

import Home from './pages/Home';
import { AuthProvider } from './context/auth/authProvider';
import { Header } from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='min-h-screen bg-gray-50'>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />

            {/* Protected routes */}
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <WorkoutProvider>
                    <Home />
                  </WorkoutProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path='/workout/:id'
              element={
                <ProtectedRoute>
                  <WorkoutProvider>
                    <WorkoutPage />
                  </WorkoutProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
