import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSurpriseData } from '../../hooks/useSurpriseData';

export function PasswordScreen({ slug }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { unlock } = useSurpriseData(slug);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await unlock(password);
    if (!success) {
      setError('Incorrect password. Try again!');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl text-center mb-6"
        >
          🎁
        </motion.div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Secret Surprise!</h1>
        <p className="text-center text-gray-600 mb-6">Enter the password to unlock your special gift</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
            disabled={loading}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm"
            >
              ❌ {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Unlocking...' : '🔓 Unlock Surprise'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}