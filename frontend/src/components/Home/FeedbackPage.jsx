import React from 'react';
import '../../css/FeedbackPage.css'; // Import CSS for styling
import FeedbackForm from './FeedbackForm';

const FeedbackPage = () => {
  return (
    <div className="landing-page-container">
      <div className="image-container">
        <img src="https://interbridge.mx/wp-content/uploads/2022/04/Interbridge-Acerca-de-nosotros-estudiante.jpg" alt="Landing Image" />
      </div>
      <div className="form-container">
        <FeedbackForm/>
      </div>
    </div>
  );
};

export default FeedbackPage;
