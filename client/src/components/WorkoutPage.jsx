import { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WorkoutContext } from '../context/workout/workoutContext';

const WorkoutPage = () => {
  const { workouts, deleteWorkout, updateWorkout } = useContext(WorkoutContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = workouts?.find((w) => w._id === id);

  const [title, setTitle] = useState(workout?.title || '');
  const [reps, setReps] = useState(workout?.reps || '');
  const [load, setLoad] = useState(workout?.load || '');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(id);
      navigate('/');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateWorkout(id, {
        title,
        reps,
        load,
      });
      alert('Workout updated successfully!');
    } catch (err) {
      alert('Failed to update workout.', err);
    }
  };

  if (!workout) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        Workout not found or still loading...
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Edit Workout</h1>
      <Link to='/'>
        <p className='h-10 text-blue-400'>Home</p>
      </Link>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-1'>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 mb-1'>Reps</label>
        <input
          type='number'
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 mb-1'>Load (kg)</label>
        <input
          type='number'
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='flex gap-4'>
        <button
          onClick={handleUpdate}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Save Changes
        </button>

        <button
          onClick={handleDelete}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
        >
          Delete Workout
        </button>
      </div>
    </div>
  );
};

export default WorkoutPage;
