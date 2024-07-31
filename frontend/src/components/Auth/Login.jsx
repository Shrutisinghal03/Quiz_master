import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s1 from '../../assets/images/s1.jpg'
import axios from 'axios';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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
      if(r=="Admin"){
      toast.error("you cant register by yourself"); 
        return ;
      }
      const { data } = await axios.post(
        `http://localhost:3000/api/${r}/v1/sendotp`,
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
      navigate('/Signup');
      setEmail("");
    
      // Set this to true after registration is complete
    } catch (error) {
          console.log(data,selectedRole); 
      toast.error("Something went Wrong")
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' , height:'28rem'}}>
      <div className="signup-image" style={{ flex: '1', textAlign: 'center' }}>
        <img src={s1} alt="Signup" style={{height: '20rem' , width:'20rem' }} />
      </div>
      <div className="signup-form" style={{ flex: '1', marginLeft: '20px' }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <a href='/Login'>Already have an account?</a>
          <button id="otp-btn" type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
