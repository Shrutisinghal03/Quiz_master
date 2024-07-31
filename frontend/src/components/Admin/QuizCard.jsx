import React, { useEffect, useState } from 'react';
import '../../css/QuizCard.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quizDetails }) => {
    const [name,setName]=useState(""); 
    const [green,setGreen]=useState('Update'); 
    const [red,setRed]=useState('Delete'); 
    const navigate = useNavigate();
    let role=localStorage.getItem('selectedRole'); 
   
  const handlePublish = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.get(`http://localhost:3000/api/Admin/v1/PublishQuiz/${quizDetails._id}`, {
        withCredentials: true, // This will include cookies in the request
      });
      return toast.success(response.data.message); 
    } catch (error) {
      console.error(error);
    }
  }; 
  const handleGreen=async()=>{
    if(role=='Admin'){
      const isConfirmed=window.confirm("Are You Sure to Update This Quiz");
      if(isConfirmed){
        let id=quizDetails._id; 
        navigate('/Update', { state: { id } });
      }
   
    }
  }
  
  const handleRed=async()=>{
    if(role=='Admin'){
      const isConfirmed=window.confirm("Are You Sure to Delete This Quiz");
      if(isConfirmed){
        try {
          const {data}=await axios.delete(`http://localhost:3000/api/quiz/v1/delete/${quizDetails._id}`
            ,{withCredentials:true});
            toast(data.message); 
           return console.log(data); 
        } catch (error) {
           return console.log(error); 
        }
      }
   
    }

   }
  // Determine button styles based on isPublished
  const buttonStyle = {
    backgroundColor: quizDetails.isPublished ? 'lightgreen' : 'green',
    cursor: quizDetails.isPublished ? 'not-allowed' : 'pointer',
    marginBottom:'0'
  };

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/Admin/v1/${quizDetails.author}`, {
          withCredentials: true, // This will include cookies in the request
        });
      setName(response.data.name); 
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAuthorName();
  }, [quizDetails]);

  return (
    <div className="card"  style={{paddingBottom:'0'}}>
      <img src="https://img.icons8.com/?size=100&id=MhJkWoOW6dEp&format=png&color=000000" alt="Logo" className="card-logo" />
      <h2 className="card-title">Quiz Details</h2>
      <div className="card-content">
        <p><strong>Name:</strong> {quizDetails.name}</p>
        <p><strong>Total Questions:</strong> {quizDetails.totalQuestions}</p>
        <p><strong>Duration:</strong> {quizDetails.duration}</p>
        <p><strong>Difficulty Level:</strong> {quizDetails.difficultyLevel}</p>
        <p><strong>Mentor:</strong> {name}</p>
        <button
          className="publish-button"
          style={buttonStyle}
          disabled={quizDetails.isPublished}
          onClick={handlePublish}
        >
          Publish
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleGreen}
            style={{ backgroundColor: 'green' }}
          >
          {green}
          </button>
          <button
            onClick={handleRed}
            style={{ backgroundColor: 'red' }}
          >
          {red}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
