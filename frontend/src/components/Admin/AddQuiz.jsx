// src/components/AddQuiz.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/AddQuiz.css'; // Import the CSS file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




  

 
const AddQuiz = () => {
  const navigate=useNavigate(); 
  const [quizDetails, setQuizDetails] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    duration: '',
    difficultyLevel: '',
    totalQuestions: 0,
    negativeMark: 0,
    maxMarks: 0,
    passingMarks: 0,
    isPublished: false,
  });

  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: 0 },
  ]);

  const handleQuizDetailChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, e) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[qIndex].options[aIndex] = value;
    setQuestions(newQuestions);
  };

  const handlecorrectOptionChange = (index, e) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index].correctOption = parseInt(value, 10);
    setQuestions(newQuestions);
  };







  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...quizDetails,
      questions,
    };
    console.log(data); 
    try {
      const response = await axios.post('http://localhost:3000/api/quiz/v1/create', data, {
        withCredentials: true, // This will include cookies in the request
      });
      console.log('Response:', response);
      toast.success(response.data.message); 
      return navigate("/")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <h2>Quiz Details</h2>
      <div className="grid-container">
        <input type="text" name="name" placeholder="Name" onChange={handleQuizDetailChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleQuizDetailChange} />
        <input type="datetime-local" name="startTime" onChange={handleQuizDetailChange} />
        <input type="datetime-local" name="endTime" onChange={handleQuizDetailChange} />
        <input type="text" name="duration" placeholder="Duration" onChange={handleQuizDetailChange} />
        <select name="difficultyLevel" onChange={handleQuizDetailChange}>
          <option value="">Select Difficulty Level</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input type="number" name="totalQuestions" placeholder="Total Questions" onChange={handleQuizDetailChange} />
        <input type="number" name="negativeMark" placeholder="Negative Mark" onChange={handleQuizDetailChange} />
        <input type="number" name="maxMarks" placeholder="Max Marks" onChange={handleQuizDetailChange} />
        <input type="number" name="passingMarks" placeholder="Passing Marks" onChange={handleQuizDetailChange} />
        <div className="radio-group">
          <label>
            <input type="radio" name="isPublished" value="true" onChange={handleQuizDetailChange} /> Published
          </label>
          <label>
            <input type="radio" name="isPublished" value="false" onChange={handleQuizDetailChange} /> Not Published
          </label>
        </div>
      </div>

      <h2>Questions</h2>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-container">
          <input type="text" name="question" placeholder="Question" onChange={(e) => handleQuestionChange(qIndex, e)} />
          <div className="options-container">
            {q.options.map((a, aIndex) => (
              <div>
              <input
                key={aIndex}
                type="text"
                placeholder={`Answer ${aIndex + 1}`}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
              />

              <input
              type="radio"
              value={aIndex}
              className="small-radio"
              checked={q.correctOption === aIndex}
              onChange={(e) => handlecorrectOptionChange(qIndex, e)}
            />

              </div>
              
            ))}
          </div>
          {/* <input
            type="text"
            name="correctOption"
            placeholder="Correct Answer"
            onChange={(e) => handlecorrectOptionChange(qIndex, e)}
          /> */}
        </div>
      ))}
      <button type="button" onClick={addQuestion}>+ Add Question</button>
      <button type="submit">Submit Quiz</button>
    </form>
  );
};

export default AddQuiz;
