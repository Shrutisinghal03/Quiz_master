import React, { useEffect, useState } from 'react';
import '../../css/Admin.css'; // Create a CSS file for styling
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Academic = () => {
    const [result, setResult] = useState([]); 
    const [quizDetails, setQuiz] = useState({}); 
    const navigate = useNavigate(); 
    let role=localStorage.getItem('selectedRole'); 
   let idstu;
   if(role=='student'){
    let idstu=JSON.parse(localStorage.getItem('user'))._id; 
   }
 else{ 
    const location = useLocation();
  const { id } = location.state || {};
     idstu=id; 
   }
    const handleResult = async (e, result) => {
        e.preventDefault(); 
            setQuiz(result.quizId); 
            console.log("yha ki quixz"); 
        navigate('/Result', { state: { result, quizDetails  } });
    }; 

    useEffect(() => {
        const fetchResult = async () => {
            try {
              
                const response = await axios.get(`http://localhost:3000/api/student/v1/getAllresult/${idstu}`, {
                    withCredentials: true, // This will include cookies in the request
                });
                console.log(response.data);  
                setResult(response.data); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchResult();
    }, []);

    return (
        <div className="admin-list" style={{marginTop:'35rem'}}>
                <div  className="admin-item" style={{backgroundColor:'Black' , color:'white' , height:'2rem'}}>
                  
                    <div className="admin-details" style={{marginLeft:'8rem'}}>
                        <h3>Quiz Name</h3>
                    </div>
                    <div className="admin-details">
                        <h3>Admin Name</h3>
                    </div>
                 <h3> Check Result</h3>
                </div>
            {result.map((r) => (
                <div key={r._id} className="admin-item">
                    <img src="https://cdn.dribbble.com/users/1600854/screenshots/10838441/dribbble_avatar-01_4x.jpg" alt={r.quizId.name} />
                    <div className="admin-details">
                        <p>{r.quizId.name}</p>
                    </div>
                    <div className="admin-details">
                        <p>{r.adminId.name}</p>
                    </div>
                    <button className="view-profile-button" onClick={(e) => handleResult(e, r )}>View Result</button>
                </div>
            ))}
        </div>
    );
};

export default Academic;
