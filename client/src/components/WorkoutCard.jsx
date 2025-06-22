import { useContext } from 'react';
import { WorkoutContext } from '../context/workout/workoutContext';
import { Link } from 'react-router-dom';

const WorkoutCard = ({ workout }) => {
  const { deleteWorkout } = useContext(WorkoutContext);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(workout._id);
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
      <button
        onClick={handleDelete}
        className='absolute top-3 right-3 text-sm text-red-600 hover:underline hover:cursor-pointer'
      >
        Delete
      </button>
    </div>
  );
};

export default WorkoutCard;
