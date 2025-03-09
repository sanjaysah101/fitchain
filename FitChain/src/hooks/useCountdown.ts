import { useEffect, useState } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return seconds;
};
