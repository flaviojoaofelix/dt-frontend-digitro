import { useState, useEffect } from 'react';

function CallTimer({ startDate }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const actualTime = new Date().getTime();
      const startTime = new Date(startDate).getTime();
      const timeDiff = actualTime - startTime;

      setTime(Math.floor(timeDiff / 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startDate]);

  const minutes = ('0' + Math.floor(time / 60)).slice(-2);
  const seconds = ('0' + (time % 60)).slice(-2);

  return `${minutes}:${seconds}`;
}

export default CallTimer;
