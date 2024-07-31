// pages/QuizPage.js
import React from 'react';
import AttemptQuiz from './AttemptQuiz';
const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
  },
  {
    question: 'What is the capital of London?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
  },
  {
    question: 'What is the capital of Berlin?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
  },
  {
    question: 'What is the capital of Madrid?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
  },
  {
    question: 'What is the capital of Paris?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
  },
  // Add more quiz questions here
];

const QuizPage = () => {
  return (
    <div>
      <AttemptQuiz questions={quizQuestions} />
    </div>
  );
};

export default QuizPage;
