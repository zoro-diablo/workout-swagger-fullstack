import { useContext } from 'react';
import { Link } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
import { WorkoutContext } from '../context/workout/workoutContext';
import { AuthContext } from '../context/auth/authContext';

const Home = () => {
  const { workouts, loading, error } = useContext(WorkoutContext);
  const { user } = useContext(AuthContext);

  return (
    <div className='max-w-8xl mx-auto p-6 bg-sky-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
        Your Workouts
      </h1>

      {user?.role === 'admin' && (
        <div className='text-center mb-4'>
          <Link to='/admin' className='text-blue-400 hover:underline'>
            Admin Dashboard
          </Link>
        </div>
      )}

      <div className='flex flex-col md:flex-row gap-8'>
        {/* Workout Form */}
        <div className='md:w-1/3'>
          <WorkoutForm />
        </div>

        {/* Workout List */}
        <div className='md:w-2/3'>
          {loading && (
            <div className='text-center mt-10 text-lg'>Loading...</div>
          )}

          {error && (
            <div className='text-center text-red-500 mt-10'>{error}</div>
          )}

          {!loading && !error && workouts.length === 0 && (
            <div className='text-center mt-10'>No Workouts Found</div>
          )}

          {!loading && !error && workouts.length > 0 && (
            <div className='grid gap-4'>
              {workouts.map((w) => (
                <WorkoutCard workout={w} key={w._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
