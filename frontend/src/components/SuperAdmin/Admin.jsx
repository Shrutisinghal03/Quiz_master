import React, { useEffect, useState } from 'react';
import '../../css/Admin.css'; // Create a CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = ({ admin }) => {
  const [user,setuser]=useState({}); 
    const navigate=useNavigate(); 
    let role=localStorage.getItem('selectedRole'); 
   let isStu=true;
    if(admin.quizzes){
      isStu=false; 
    }
  const handleProfile= async (e) => {
    e.preventDefault(); 
    navigate('/profile', { state: { user } });
  }; 
  const handleResult= async (e) => {
    e.preventDefault(); 
    let id=admin._id; 
    navigate('/Academic', { state: { id } });
  };

  // Determine button styles based on isPublished

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/Admin/v1/${admin._id}`, {
          withCredentials: true, // This will include cookies in the request
        });
      setuser(response.data);  
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthorName();
  }, [admin]);

  return (
    <div className="admin-list">
     
        <div key={admin._id} className="admin-item">
          <img src="https://cdn.dribbble.com/users/1600854/screenshots/10838441/dribbble_avatar-01_4x.jpg" alt={admin.fullName} />
          <div className="admin-details">
            <p>{admin.name}</p>
          </div>
          <div className="admin-details">
            <p>{admin.email}</p>
           
          </div>
        
          <button className="view-profile-button" onClick={handleProfile}>View Profile</button> 
         
        </div>
    </div>
  );
};

export default Admin;
