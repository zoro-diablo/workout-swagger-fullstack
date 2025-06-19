import Home from './components/Home';
import { UserProvider } from './context/data/UserProvider';
import { ThemeProvider } from './context/theme/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Home />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
