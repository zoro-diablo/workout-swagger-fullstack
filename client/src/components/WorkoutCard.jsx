import { useContext, useState } from 'react';
import { WorkoutContext } from '../context/workout/workoutContext';
import { Link } from 'react-router-dom';

const WorkoutCard = ({ workout }) => {
  const { deleteWorkout } = useContext(WorkoutContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setIsDeleting(true);
      setError('');
      try {
        await deleteWorkout(workout._id);
      } catch (err) {
        const errorMessage =
          err.response?.data?.err || 'Failed to delete workout';
        setError(errorMessage);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 relative'>
      <Link to={`/workout/${workout._id}`}>
        <h2 className='text-xl font-semibold text-gray-800'>{workout.title}</h2>
        <p className='text-gray-600 mt-2'>
          Reps: <span className='font-medium'>{workout.reps}</span>
        </p>
        <p className='text-gray-600'>
          Load: <span className='font-medium'>{workout.load} kg</span>
        </p>
      </Link>
      {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete workout: ${workout.title}`}
        className={`absolute top-3 right-3 text-sm text-red-600 hover:underline ${
          isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'
        }`}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default WorkoutCard;
