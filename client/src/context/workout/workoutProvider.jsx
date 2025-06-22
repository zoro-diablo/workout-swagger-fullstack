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
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
