import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from './Admin';
import Student from './Student';

const ViewStudents = () => {
  const [Students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Admin/v1/getAllStudents',{
          withCredentials:true
        });
        console.log('API response:', response.data); // Log full response object
        if (response.data && response.data.Students) {
          setStudents(response.data.Students);
        } else {
          console.error('Unexpected API response format:', response.data);
          setError('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching Students:', error);
        setError('Error fetching Students');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="admin-list">
      {error && <p>{error}</p>}
      {Students.map(stu => (
        <Student key={stu._id} admin={stu} />
      ))}
    </div>
  );
};

export default ViewStudents;
