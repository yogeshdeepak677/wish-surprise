import React from 'react';
import { motion } from 'framer-motion';

export function Header({ title, subtitle }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-6 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">🎁 {title}</h1>
        {subtitle && <p className="text-pink-100 text-lg">{subtitle}</p>}
      </div>
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; 2024 Wish Surprise. Created with ❤️ for special moments.</p>
        <p className="text-sm mt-2">Making birthdays magical, one surprise at a time.</p>
      </div>
    </footer>
  );
}