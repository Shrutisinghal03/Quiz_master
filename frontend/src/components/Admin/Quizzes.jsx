import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllCard from './AllCard';
import "../../css/Publish.css"; 
const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Admin/v1/viewAllQuizzess', {
          withCredentials: true, // This will include cookies in the request
        });
      //  console.log('Response:', response.data.quizzes);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
 //   console.log('Quizzes state:', quizzes);
  }, [quizzes]);

  return (
    <div className="publish-container" style={{marginTop:'58rem'}}>
      {quizzes.length > 0 ? (
        quizzes.map((quiz, index) => (
          <AllCard key={index} quizDetails={quiz} />
        ))
      ) : (
        <p>Loading quiz details...</p>
      )}
    </div>
  );
};

export default Quizzes;
