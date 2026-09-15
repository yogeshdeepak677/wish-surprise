import { useState, useCallback } from 'react';

export function useConfetti() {
  const [confetti, setConfetti] = useState([]);

  const createConfetti = useCallback(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
      angle: Math.random() * 360,
    }));
    setConfetti(pieces);

    setTimeout(() => setConfetti([]), 3000);
  }, []);

  return { confetti, createConfetti };
}