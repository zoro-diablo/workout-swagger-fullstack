import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WorkoutContext } from '../context/workout/workoutContext';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const WorkoutPage = () => {
  const { workouts, deleteWorkout, updateWorkout } = useContext(WorkoutContext);
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [formError, setFormError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const localWorkout =
      workouts && Array.isArray(workouts)
        ? workouts.find((w) => w._id === id)
        : null;

    if (localWorkout) {
      setWorkout(localWorkout);
      setTitle(localWorkout.title);
      setReps(localWorkout.reps.toString());
      setLoad(localWorkout.load.toString());
      setLoading(false);
    } else {
      const fetchWorkout = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/workouts/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setWorkout(res.data);
          setTitle(res.data.title);
          setReps(res.data.reps.toString());
          setLoad(res.data.load.toString());
        } catch (err) {
          const errorMessage =
            err.response?.data?.err === 'No such workout or unauthorized'
              ? 'You are not authorized to access this workout'
              : err.response?.data?.err || 'Failed to fetch workout';
          setError(errorMessage);
          if (err.response?.status === 404) {
            navigate('/');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchWorkout();
    }
  }, [workouts, id, navigate, token]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setIsDeleting(true);
      setError('');
      try {
        await deleteWorkout(id);
        navigate('/');
      } catch (err) {
        const errorMessage =
          err.response?.data?.err === 'No such workout or unauthorized'
            ? 'You are not authorized to delete this workout'
            : 'Failed to delete workout';
        setError(errorMessage);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdate = async () => {
    setFormError('');
    setIsUpdating(true);
    if (!title || !reps || !load) {
      setFormError('All fields are required');
      setIsUpdating(false);
      return;
    }
    if (isNaN(reps) || isNaN(load)) {
      setFormError('Reps and Load must be valid numbers');
      setIsUpdating(false);
      return;
    }

    try {
      await updateWorkout(id, {
        title,
        reps: Number(reps),
        load: Number(load),
      });
      setFormError('');
      navigate('/');
    } catch (err) {
      const errorMessage =
        err.response?.data?.err === 'No such workout or unauthorized'
          ? 'You are not authorized to update this workout'
          : err.response?.data?.err || 'Failed to update workout';
      setFormError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className='text-center mt-10'>Loading...</div>;

  if (error || !workout) {
    return (
      <div className='text-center text-red-500 mt-10'>
        {error || 'Workout not found'}
        <div>
          <Link to='/' className='text-blue-400 underline'>
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Edit Workout</h1>
      <Link to='/' className='h-10 text-blue-400'>
        Home
      </Link>

      {formError && <div className='text-red-500 mb-4'>{formError}</div>}

      <div className='mb-4'>
        <label className='block text-gray-700 mb-1'>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          disabled={isUpdating || isDeleting}
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 mb-1'>Reps</label>
        <input
          type='number'
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          disabled={isUpdating || isDeleting}
        />
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 mb-1'>Load (kg)</label>
        <input
          type='number'
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          disabled={isUpdating || isDeleting}
        />
      </div>

      <div className='flex gap-4'>
        <button
          onClick={handleUpdate}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          onClick={handleDelete}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isUpdating || isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Workout'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutPage;
