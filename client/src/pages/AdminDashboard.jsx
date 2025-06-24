import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const AdminDashboard = () => {
  const { user, signupAdmin, token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        const errorMessage = err.response?.data?.err || 'Failed to fetch users';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, token, navigate]);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!newAdminEmail || !newAdminPassword) {
      setFormError('Email and password are required');
      return;
    }

    try {
      const result = await signupAdmin(newAdminEmail, newAdminPassword);
      if (result.success) {
        setNewAdminEmail('');
        setNewAdminPassword('');
        setUsers((prev) => [...prev, { email: newAdminEmail, role: 'admin' }]);
      } else {
        setFormError(result.error);
      }
    } catch (err) {
      setFormError('Failed to create admin user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${BASE_URL}/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } catch (err) {
        const errorMessage = err.response?.data?.err || 'Failed to delete user';
        setError(errorMessage);
      }
    }
  };

  if (loading) return <div className='text-center mt-10'>Loading...</div>;
  if (error) return <div className='text-center text-red-500 mt-10'>{error}</div>;

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Admin Dashboard</h1>
      <Link to='/' className='text-blue-400 mb-4 inline-block'>Home</Link>

      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Create Admin User</h2>
      <form onSubmit={handleCreateAdmin} className='mb-8 space-y-4'>
        <div>
          <label className='block text-gray-700 mb-1'>Email</label>
          <input
            type='email'
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Admin email'
          />
        </div>
        <div>
          <label className='block text-gray-700 mb-1'>Password</label>
          <input
            type='password'
            value={newAdminPassword}
            onChange={(e) => setNewAdminPassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Admin password'
          />
        </div>
        {formError && <div className='text-red-500'>{formError}</div>}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Create Admin
        </button>
      </form>

      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Manage Users</h2>
      {users.length === 0 && <p>No users found</p>}
      {users.map((u) => (
        <div key={u._id} className='flex justify-between items-center p-2 border-b border-gray-200'>
          <span>{u.email} ({u.role})</span>
          <button
            onClick={() => handleDeleteUser(u._id)}
            className='text-red-600 hover:underline'
            aria-label={`Delete user: ${u.email}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;