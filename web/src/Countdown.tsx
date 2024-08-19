import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetTimestamp: number): Countdown => {
  const calculateTimeLeft = () => {
    const difference = targetTimestamp * 1000 - Date.now();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState<Countdown>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
};

export default useCountdown;
