import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/EditQuiz.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditQuiz = () => {
  const location = useLocation();
  const { id } = location.state || {};
   const navigate=useNavigate(); 
  const [questions, setQuestions] = useState([]);
  const [editedQuestions, setEditedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quiz/v1/getQuiz/${id}`, { withCredentials: true });
        
        const fetchedQuestions = await Promise.all(
          response.data.quiz.questions.map(async (q) => {
            const que = await axios.get(`http://localhost:3000/api/question/v1/getquestion/${q}`, { withCredentials: true });
            return que.data;
          })
        );
        
        setQuestions(fetchedQuestions);
        setEditedQuestions(fetchedQuestions.map(q => ({
          ...q,
          options: q.options ? q.options.slice() : [] // Ensure options is defined
        }))); // Initialize editedQuestions

        console.log('Questions:', editedQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const { value } = event.target;
    const edited = [...editedQuestions];
    edited[questionIndex].que.options[optionIndex] = value;
    setEditedQuestions(edited);
  };

  const handleCorrectOptionChange = (questionIndex, event) => {
    const { value } = event.target;
    const edited = [...editedQuestions];
    edited[questionIndex].que.correctOption = parseInt(value, 10);
    setEditedQuestions(edited);
  };

  const saveChanges = async () => {
    try {
      setQuestions(editedQuestions);
  console.log(editedQuestions);
     { editedQuestions.map(async(q)=>{
      console.log(q); 
    const res=await axios.put(`http://localhost:3000/api/question/v1/updatequestion/${id}/${q.que._id}`,q.que, {withCredentials:true},);
  toast.success(res.data.message); 
  navigate('/Quizzes')
    return  console.log('Questions saved successfully',res);
  })

  } 
     
    } catch (error) {
      console.error('Error saving questions:', error);
    }
  };

  return (
    <div className="Edit-container">
      {editedQuestions.map((question, index) => (
        <div key={index} className="question">
          <div className="question-text">{question.que.text}</div>
          <div className="options">
            {question.que.options.map((option, optIndex) => (
              <div key={optIndex} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e)}
                />
                <input
                  type="radio"
                  value={optIndex}
                  className="small-radio"
                  checked={question.que.correctOption === optIndex}
                  onChange={(e) => handleCorrectOptionChange(index, e)}
                />

              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={saveChanges}>Save</button>
    </div>
  );
};

export default EditQuiz;
