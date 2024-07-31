import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('selectedRole') || '');
 const navigate=useNavigate(); 
  const handleRoleSelect = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let role = localStorage.getItem('selectedRole');
    let isAuth=localStorage.getItem('isAuthorized'); 
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);

       console.log(email,password); 

    try {
      if(isAuth && user)
        return  toast.error("you are already logged In")
       
      const { data } = await axios.post(
        `http://localhost:3000/api/${role}/v1/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ); 
      setEmail("");
      setPassword("");
      console.log(data);
      toast.success(data.message);
      if(data.user!=null){
        localStorage.setItem('isAuthorized', true); 
        localStorage.setItem('user',JSON.stringify(data.user));
       
      }
      navigate("/")
      // Set this to true after registration is complete
    } catch (error) {
     console.log("oowww owwww not registration", error);
    }
  };
  return (
    <div className="login-container">
      <div className="logo">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp" alt="Logo" />
      </div>
      <div className="login-form">
        <div className="image">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="Image" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
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
          <a href='/forgot'> Forgot Password?</a>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login2;
