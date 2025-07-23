"use client";

import React, { useState, useEffect, useRef } from "react";

type TimerProps = {
  active: boolean;
};

export default function Timer({ active }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active]);

  return (
    <div className="text-white text-center font-mono text-lg mt-2">
      Session active: {seconds}s
    </div>
  );
}