import React, { useEffect, useState } from 'react';
import '../../css/QuizCard.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AllCard = ({ quizDetails }) => {
  const [user, setUser] = useState({});
  const [result,setResult]=useState({}); 
  const navigate = useNavigate();
  let role=localStorage.getItem('selectedRole'); 
 
 
 const handleResult=(e)=>{
  e.preventDefault();
  navigate('/Result', { state: { result ,quizDetails ,user } });
 }
  const handleProfile = async (e) => {
    e.preventDefault();
    navigate('/profile', { state: { user } });
  };
  const handleAttempt = async (e) => {
    e.preventDefault();
    const isConfirmed=window.confirm("Attempt The Quiz")
    if(isConfirmed){
      let id=quizDetails._id; 
      navigate('/AttemptQuiz', { state: { id } });
    }
   
  };
  
  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
     
        const response = await axios.get(`http://localhost:3000/api/Admin/v1/${quizDetails.author}`, {
          withCredentials: true,
        });
        setUser(response.data); // Corrected variable name
        // console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error(error);
      }
    };
    const result = async () => {
      try {
       
        const response = await axios.get(`http://localhost:3000/api/student/v1/getresult/${quizDetails._id}`, {
          withCredentials: true,
        });
      // Corrected variable name
        console.log("result",response.data); // Log the fetched data
        setResult(response.data);
      } catch (error) {
        console.error(error);
      }
    };
   result();
   fetchAuthorName(); 
  }, [quizDetails]);

  return (
    <div className="card" > 
      <img src="https://img.icons8.com/?size=100&id=MhJkWoOW6dEp&format=png&color=000000" alt="Logo" className="card-logo" />
      <h2 className="card-title">Quiz Details</h2>
      <div className="card-content">
        <p><strong>Name:</strong> {quizDetails.name}</p>
        <p><strong>Total Questions:</strong> {quizDetails.totalQuestions}</p>
        <p><strong>Duration:</strong> {quizDetails.duration}</p>
        <p><strong>Difficulty Level:</strong> {quizDetails.difficultyLevel}</p>
        <p><strong>Mentor:</strong> {user.name}</p>
        <button onClick={handleProfile} style={{marginBottom:'0'}}>View Mentor Profile</button>
        { role=='student' && !result &&
 <button onClick={handleAttempt} style={{marginBottom:'0'}}>Attempt Quiz</button>
        }
          { role=='student' && result &&
 <button onClick={handleResult} style={{marginBottom:'0', backgroundColor:'blue'}}>View Result</button>
        }
       
      </div>
    </div>
  );
};

export default AllCard;