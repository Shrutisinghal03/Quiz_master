import React from 'react';

const Card = ({ logo, title, text }) => {
  return (
    <div className="card" id="cardHome">
      <img src={logo} alt="Logo" className="card-logo" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
}

export default Card;
