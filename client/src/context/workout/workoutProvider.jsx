import { useEffect, useState } from 'react';
import { WorkoutContext } from './workoutContext';
import axios from 'axios';

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchWorkout();
  }, []);

  const addWorkout = (workouts) => {
    setWorkouts((prev) => [workouts, ...prev]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, loading, error, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};
