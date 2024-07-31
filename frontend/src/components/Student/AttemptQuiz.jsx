import React, { useEffect, useState } from 'react';
import '../../css/AttemptQuiz.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AttemptQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

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
        console.log('Questions:', fetchedQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();

    // Disable copy
    const disableCopy = (e) => e.preventDefault();
    document.addEventListener('copy', disableCopy);

    // Disable Print Screen
    const disablePrintScreen = (e) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
      }
    };
    document.addEventListener('keyup', disablePrintScreen);

    // Disable Ctrl+P (Print)
    const disablePrint = (e) => {
      if (e.ctrlKey && e.key === 'p') {
        alert('Printing is disabled!');
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', disablePrint);

    // // Disable right-click
    // const disableRightClick = (e) => e.preventDefault();
    // document.addEventListener('contextmenu', disableRightClick);

    return () => {
      // Cleanup event listeners on component unmount
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('keyup', disablePrintScreen);
      // document.removeEventListener('keydown', disablePrint);
      // document.removeEventListener('contextmenu', disableRightClick);
    };
  }, [id]);

  const totalQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [chooseOptions, setChooseOptions] = useState(Array(questions.length).fill(null));
  const [reviewedQuestions, setReviewedQuestions] = useState([]);

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const selectOption = (optionIndex) => {
    const updatedSelections = [...chooseOptions];
    updatedSelections[currentQuestion] = optionIndex;
    setChooseOptions(updatedSelections);
    console.log('choose', chooseOptions);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const markForReview = () => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = null;
    setSelectedOptions(updatedSelections);
    if (!reviewedQuestions.includes(currentQuestion)) {
      setReviewedQuestions([...reviewedQuestions, currentQuestion]);
      console.log(reviewedQuestions);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    }
    console.log('mark for', reviewedQuestions);
  };

  const getQuestionNumberColorClass = (questionIndex) => {
    if (selectedOptions[questionIndex] != null || selectedOptions[questionIndex] !== undefined) {
      console.log('green', selectedOptions[questionIndex]);
      return 'attempted';
    } else if (reviewedQuestions.includes(questionIndex)) {
      console.log('blue');
      return 'review';
    } else {
      console.log('red');
      return 'not-attempted';
    }
  };

  const submitQuiz = async () => {
    const isConfirmed = window.confirm('Are you sure to Submit');
    if (isConfirmed) {
      try {
        const finalAnswers = selectedOptions.map((option, index) => ({
          questionIndex: index,
          answerIndex: option,
          markedForReview: reviewedQuestions.includes(index),
        }));
        console.log(finalAnswers);

        const response = await axios.post(`http://localhost:3000/api/quizAttempt/v1/attemptQuiz/${id}`, finalAnswers, { withCredentials: true });
        console.log(response);
        toast(response.data.message);
        navigate('/');
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveAndNext = () => {
    const updatedSelections = [...selectedOptions];
    const optionIndex = chooseOptions[currentQuestion];
    updatedSelections[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelections);
    if (reviewedQuestions.includes(currentQuestion)) {
      const updated = reviewedQuestions.filter(q => q !== currentQuestion);
      setReviewedQuestions(updated);
      console.log(updated);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    }
    console.log('selected', selectedOptions);
  };

  const clearAns = () => {
    selectedOptions[currentQuestion] = null;
    chooseOptions[currentQuestion] = null;
    reviewedQuestions[currentQuestion] = null;
    chooseOptions[currentQuestion] = null;
    console.log('clear answer:', selectedOptions);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    }
  };

  if (questions.length === 0) {
    return null; // Render nothing until questions are fetched
  }

  const currentQuizQuestion = questions[currentQuestion];
  console.log('selected op', selectedOptions);

  return (
    <div className="box">
      <h1>Quiz</h1>
      <div className="question">
        <h3>{currentQuizQuestion.que.text}</h3>
        <div className="options">
          {currentQuizQuestion.que.options.map((option, index) => (
            <button
              key={option.id}
              className={`option ${chooseOptions[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => selectOption(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="question-navigation">
        <div className="question-status">
          {[...Array(totalQuestions)].map((_, index) => (
            <span
              key={index}
              className={`question-number ${getQuestionNumberColorClass(index)}`}
              onClick={() => goToQuestion(index)}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {currentQuestion > 0 && <button onClick={goToPreviousQuestion}>Previous</button>}
        <button onClick={markForReview}>Mark for Review And Next</button>
        <button onClick={clearAns}>Clear</button>
        <button onClick={saveAndNext}>Save and Next</button>
        {currentQuestion === questions.length - 1 && <button onClick={submitQuiz}>Submit</button>}
      </div>
    </div>
  );
};

export default AttemptQuiz;
