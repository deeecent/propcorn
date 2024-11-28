import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function decompose(time: number) {
  return {
    days: Math.floor(time / (60 * 60 * 24)),
    hours: Math.floor((time / (60 * 60)) % 24),
    minutes: Math.floor((time / 60) % 60),
    seconds: Math.floor(time % 60),
  };
}

function calculateTimeLeft(targetTimestamp: number) {
  const now = Date.now();
  const difference = targetTimestamp * 1000 - now;

  if (difference > 0) {
    return decompose(difference / 1000);
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

const useCountdown = (targetTimestamp: number): Countdown => {
  const [timeLeft, setTimeLeft] = useState<Countdown>(
    calculateTimeLeft(targetTimestamp),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
};

export default useCountdown;
