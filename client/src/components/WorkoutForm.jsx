import axios from 'axios';
import { useContext, useState } from 'react';
import { WorkoutContext } from '../context/workout/workoutContext';
import { AuthContext } from '../context/auth/authContext';

const WorkoutForm = () => {
  const { addWorkout } = useContext(WorkoutContext);
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, reps, load };

    try {
      const response = await axios.post(
        'http://localhost:4000/api/workouts',
        workout,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle('');
      setReps('');
      setLoad('');
      setError(null);
      addWorkout(response.data);
      console.log('Workout Added:', response.data);
    } catch (err) {
      console.log('Error', err);
      setError('Failed to add workout');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'
    >
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
        Add a New Workout
      </h2>

      <div className='mb-4'>
        <label className='block text-gray-700 mb-1'>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 mb-1'>Reps</label>
        <input
          type='number'
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        />
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 mb-1'>Load (kg)</label>
        <input
          type='number'
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        />
      </div>

      <button
        type='submit'
        className='w-full hover:cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition'
      >
        Submit
      </button>

      {error && (
        <p className='mt-4 text-red-500 text-sm text-center'>{error}</p>
      )}
    </form>
  );
};

export default WorkoutForm;
