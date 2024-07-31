import React, { useDebugValue, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';

const Result = () => {
  const location = useLocation();
  const { result, quizDetails } = location.state || {};
  const data = [
    { id: 0, value: result.rightAnswers, label: 'rightAnswers' },
    { id: 1, value: result.wrongAnswers, label: 'wrongAnswers' },
    { id: 2, value: result.totalQuestions, label: 'totalQuestions' },
    { id: 3, value: result.unanswered, label: 'unanswered' },
  ];
   useEffect(()=>{
    console.log(result); 
   })
  return (
    <div className="row gutters-sm" style={{ width: '100%' }}>
      <div className="col-sm-6 mb-3" style={{ width: '100%' }}>
        <div className="card h-80" style={{ width: '100%' ,marginLeft:'0' }}>
          <h1>{quizDetails.name}</h1>
        
          <h3>Passing Marks  : {quizDetails.passingMarks}</h3>
        <h3>Your Marks  : {result.score}</h3>  
        {!result.isPassed && <h2>Unfortunately you failed in this Quiz </h2>}
        {result.isPassed && <h2>Hurray you passed in Quiz</h2>}
          <div className="card-body">
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  label: {
                    offset: 20, // Adjust offset as needed
                    style: { fontSize: '14px', color: '#000', paddingLeft: '20px' }, // Customize label style
                  },
                },
              ]}
              width={650} // Set an appropriate width (e.g., 300px)
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
