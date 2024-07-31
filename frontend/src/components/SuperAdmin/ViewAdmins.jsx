import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from './Admin';

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/superAdmin/v1/GetAllAdmins',{
          withCredentials:true
        });
        console.log('API response:', response); // Log full response object
        if (response.data && response.data.admins) {
          setAdmins(response.data.admins);
        } else {
          console.error('Unexpected API response format:', response.data);
          setError('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
        setError('Error fetching admins');
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="admin-list">
      {error && <p>{error}</p>}
      {admins.map(admin => (
        <Admin  admin={admin} />
      ))}
    </div>
  );
};

export default ViewAdmins;
