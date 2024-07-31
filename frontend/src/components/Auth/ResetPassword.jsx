import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function ResetPassword() {
  const [otp, setotp] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    let role = localStorage.getItem('selectedRole'); 
    let email=localStorage.getItem('email'); 

    try {
       
      const { data } = await axios.post(
        `http://localhost:3000/api/${role}/v1/verifyOtpChangePassword`,
        { otp, password ,email},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ); 
      setotp("");
      setPassword("");
      console.log(data);
      toast.success(data.message);
      // Set this to true after registration is complete
    } catch (error) {
     console.log("oowww owwww not change password", error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="image">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="Image" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="otp">otp</label>
            <input
              type="Number"
              id="otp"
              value={otp}
              onChange={(e)=>{setotp(e.target.value)}}
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
