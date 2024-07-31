import React, { useState, useEffect } from 'react';
import '../../css/WordFlick.css'; // Assuming you have the CSS in App.css

const words = [
  'Explore, learn, and challenge yourself ',
  'Ready for a brain workout?',
  'Step into a world of fun and knowledge'
];

const WordFlick = () => {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [forwards, setForwards] = useState(true);
  const [skipCount, setSkipCount] = useState(0);

  const skipDelay = 15;
  const speed = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        if (offset >= words[index].length) {
          setSkipCount(skipCount => skipCount + 1);
          if (skipCount === skipDelay) {
            setForwards(false);
            setSkipCount(0);
          }
        }
      } else {
        if (offset === 0) {
          setForwards(true);
          setIndex(index => (index + 1) % words.length);
          setOffset(0);
        }
      }

      if (skipCount === 0) {
        setOffset(offset => (forwards ? offset + 1 : offset - 1));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [forwards, offset, skipCount, index]);

  return (
    <div className="wordflick">
 <div className="word">{words[index].substr(0, offset)}</div>
    </div>
   
  );
};
export default WordFlick; 
