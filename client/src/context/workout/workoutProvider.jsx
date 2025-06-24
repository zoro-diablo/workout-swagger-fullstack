import { useEffect, useState } from 'react';
import { WorkoutContext } from './workoutContext';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import useAuthInterceptor from '../../hooks/useAuthInterceptor';
import { useNavigate } from 'react-router';

export const WorkoutProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    setError('Session expired. Please log in again.');
    navigate('/login');
  };

  useAuthInterceptor(token, handleUnauthorized);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/workouts');
        setWorkouts(response.data);
      } catch (err) {
        setError('Failed to fetch workouts.', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchWorkout();
    } else {
      setLoading(false);
    }
  }, [token]);

  const addWorkout = (workout) => {
    setWorkouts((prev) => [workout, ...prev]);
  };

  const deleteWorkout = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/workouts/${id}`
      );
      setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
      console.log('Successfully Deleted the workout', response.data);
    } catch (err) {
      console.error('Failed to delete workout', err);
    }
  };

  const updateWorkout = async (id, updatedFields) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/workouts/${id}`,
        updatedFields
      );
      const updatedWorkout = response.data;

      setWorkouts((prev) =>
        prev.map((workout) => (workout._id === id ? updatedWorkout : workout))
      );
    } catch (err) {
      console.error('Failed to update workout', err);
      throw err;
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        loading,
        error,
        addWorkout,
        deleteWorkout,
        updateWorkout,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};