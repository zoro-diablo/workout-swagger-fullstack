import { WorkoutProvider } from './context/workout/workoutProvider';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
      <WorkoutProvider>
        <Home />
      </WorkoutProvider>
    </div>
  );
};

export default App;
