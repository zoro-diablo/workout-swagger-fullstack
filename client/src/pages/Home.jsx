import { useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
import { WorkoutContext } from '../context/workout/workoutContext';

const Home = () => {
  const { workouts, loading, error } = useContext(WorkoutContext);

  if (loading)
    return <div className='text-center mt-10 text-lg'>Loading...</div>;
  if (error)
    return <div className='text-center text-red-500 mt-10'>{error}</div>;
  if (!workouts || workouts.length === 0)
    return <div className='text-center mt-10'>No Workouts Found</div>;

  return (
    <div className='max-w-8xl mx-auto p-6 bg-sky-100'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
        Your Workouts
      </h1>

      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-1/3'>
          <WorkoutForm />
        </div>

        <div className='md:w-2/3'>
          {workouts && workouts.length > 0 ? (
            workouts.map((w) => <WorkoutCard workout={w} key={w._id} />)
          ) : (
            <p className='text-gray-500'>No workouts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
