import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';
import { UserContext } from '../context/data/UserContext';

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userData, loading, error } = useContext(UserContext);

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>

      <div style={{ marginTop: '20px' }}>
        {loading && <p>Loading user data...</p>}
        {error && <p>Error: {error}</p>}
        {userData && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h2>User Profile</h2>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Status:</strong> {userData.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            <div>
              <h2>Purchased Items</h2>
              {userData.items && userData.items.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {userData.items.map((item) => (
                    <li key={item.itemId} style={{ padding: '10px 0' }}>
                      <strong>{item.title}</strong> - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;