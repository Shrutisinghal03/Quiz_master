import React, { useState } from 'react';
import '../../css/AdminPage.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateAdmin = () => {
    const navigate=useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password, confirmPassword } = formData; // Assuming formData is accessible
  
    try {
      const response = await axios.post(
        `http://localhost:3000/api/superAdmin/v1/registerAdmin`,
        { name, email, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      console.log(response.data); // Log the response data
      
      if (!response.data.success) {
        toast.error(response.data.message); // Handle error message
        return;
      }
  
      toast.success(response.data.message); // Show success message
  
      // Example of navigation or localStorage usage after successful registration
      navigate('/');
      localStorage.setItem('email', email);
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong"); // Generic error message
    }
  };
  return (
    <div className="admin-container">
      <div className="admin-header">
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="admin-image" />
        <h2>Admin Registration</h2>
      </div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
       
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateAdmin;
