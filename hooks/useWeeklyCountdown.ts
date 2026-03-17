'use client';

import { useState, useEffect } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Returns time remaining until next Sunday 23:59:59 Pacific Time.
 * Resets every Monday at 00:00 PT (new week countdown starts).
 */
export function useWeeklyCountdown(): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    function getEndOfWeek(): Date {
      // Get current time in Pacific timezone
      const now = new Date();
      const pacificNow = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
      );

      // Find next Sunday 23:59:59
      const dayOfWeek = pacificNow.getDay(); // 0=Sun, 1=Mon, ...
      const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

      const endOfWeek = new Date(pacificNow);
      endOfWeek.setDate(endOfWeek.getDate() + daysUntilSunday);
      endOfWeek.setHours(23, 59, 59, 0);

      // Convert back: calculate the offset between local and pacific
      const localNow = new Date();
      const offsetMs = localNow.getTime() - pacificNow.getTime();
      return new Date(endOfWeek.getTime() + offsetMs);
    }

    function calculate() {
      const now = new Date();
      const end = getEndOfWeek();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: false,
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
