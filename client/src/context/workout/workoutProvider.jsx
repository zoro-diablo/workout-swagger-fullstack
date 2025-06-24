import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WorkoutContext } from './workoutContext';
import { AuthContext } from '../auth/authContext';

const BASE_URL = 'http://localhost:4000';

export const WorkoutProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/workouts`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWorkouts(data);
      } catch (err) {
        console.error('Failed to fetch workouts', err);
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          setError(err.response?.data?.err || 'Failed to fetch workouts');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [token, navigate]);

  const addWorkout = (workout) => {
    setWorkouts((prev) => [workout, ...prev]);
  };

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/workouts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error('Failed to delete workout', err);
      if (err.response?.status === 401) navigate('/login');
    }
  };

  const updateWorkout = async (id, updatedFields) => {
    try {
      const { data: updated } = await axios.patch(
        `${BASE_URL}/api/workouts/${id}`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkouts((prev) =>
        prev.map((w) => (w._id === id ? updated : w))
      );
    } catch (err) {
      console.error('Failed to update workout', err);
      if (err.response?.status === 401) navigate('/login');
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
