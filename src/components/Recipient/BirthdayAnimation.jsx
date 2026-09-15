import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { triggerBirthdayConfetti } from '../../utils/confetti';

const FloatingEmoji = ({ emoji, delay, duration }) => (
  <motion.div
    initial={{ y: 0, opacity: 1 }}
    animate={{
      y: -300,
      opacity: 0,
      x: (Math.random() - 0.5) * 200,
    }}
    transition={{
      duration,
      delay,
      ease: 'easeOut',
    }}
    className="fixed text-4xl pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      bottom: '0',
    }}
  >
    {emoji}
  </motion.div>
);

export function BirthdayAnimation({ recipientName, onComplete }) {
  const [showEmojis, setShowEmojis] = useState(true);

  useEffect(() => {
    triggerBirthdayConfetti();
    const timer = setTimeout(() => {
      setShowEmojis(false);
      onComplete?.();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const emojis = ['🎉', '🎊', '🎈', '🎁', '✨', '💝', '🌟', '💖'];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {showEmojis &&
        emojis.map((emoji, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <FloatingEmoji
              key={`${i}-${j}`}
              emoji={emoji}
              delay={j * 0.2}
              duration={3 + Math.random() * 2}
            />
          ))
        )}
    </div>
  );
}

export function BirthdayWish({ recipientName, age, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center py-12"
    >
      <motion.h1
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4"
      >
        Happy Birthday {recipientName}! 🎉
      </motion.h1>

      {age && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-semibold text-purple-600 mb-6"
        >
          You're turning {age} today!
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-2xl mx-auto bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-8"
      >
        <p className="text-xl text-gray-800 leading-relaxed italic">{message}</p>
      </motion.div>
    </motion.div>
  );
}