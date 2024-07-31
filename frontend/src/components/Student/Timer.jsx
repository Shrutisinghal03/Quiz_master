import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime}) => {
 // 1 hour, 49 minutes, and 59 seconds in seconds
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('countdownTime');
    return savedTime !== null ? JSON.parse(savedTime) : initialTime;
  });

  useEffect(() => {
    const savedTime = localStorage.getItem('countdownTime');
    if (savedTime === null || JSON.parse(savedTime) > initialTime) {
      localStorage.setItem('countdownTime', JSON.stringify(initialTime));
      setTime(initialTime);
    }

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          localStorage.setItem('countdownTime', JSON.stringify(newTime));
          return newTime;
        } else {
          clearInterval(interval);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer: {formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
