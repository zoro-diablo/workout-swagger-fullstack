import WorkoutPage from './components/WorkoutPage';
import { WorkoutProvider } from './context/workout/workoutProvider';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <WorkoutProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/workout/:id' element={<WorkoutPage />} />
        </Routes>
      </WorkoutProvider>
    </BrowserRouter>
  );
};

export default App;
