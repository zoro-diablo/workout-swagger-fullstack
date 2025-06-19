import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Async
    // const fetchUserData = async () => {
    //   try {
    //     const response = await axios.get(
    //       'http://localhost:3002/testApi/success'
    //     );
    //     setUserData(response.data.data);
    //     setLoading(false);
    //   } catch (err) {
    //     setError(err.response?.data?.message || err.message || 'Axios Error');
    //     setLoading(false);
    //   }
    // };
    // fetchUserData();

    //Then method
    axios.get('http://localhost:3002/testApi/success').then((response)=>{
        setUserData(response.data.data)
        setLoading(false)
    }).catch((err)=>{
        setError(err.response?.data?.message || err.message || 'Axios Error')
        setLoading(false)
    })
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
