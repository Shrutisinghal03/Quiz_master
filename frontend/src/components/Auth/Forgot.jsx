import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('selectedRole') || '');

  const handleRoleSelect = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let r=localStorage.getItem('selectedRole'); 
      const { data } = await axios.post(
        `http://localhost:3000/api/${r}/v1/forgotPassword`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    
      console.log(data,selectedRole); 
      if(!data.success)
      return toast.error(data.message);
      toast.success(data.message);
      navigate('/ResetPassword');
      localStorage.setItem('email',email); 
      // Set this to true after registration is complete
    } catch (error) {
          console.log(data,selectedRole); 
      toast.error("Something went Wrong")
    }
  };

  return (
    <div className="container">
      <div className="signup-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
          <div className="radio-group">
          {['superAdmin', 'Admin', 'student'].map((role) => (
            <label key={role} className="radio-label">
              <input
                type="radio"
                value={role}
                checked={role === selectedRole}
                onChange={handleRoleSelect}
              />
              {role}
            </label>
          ))}
        </div>
          <button  id="otp-btn" type="submit">Send Otp</button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
