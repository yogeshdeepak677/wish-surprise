import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout/Header';
import { motion } from 'framer-motion';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header title="Wish Surprise" subtitle="Create magical birthday experiences" />

      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Make Birthdays Unforgettable 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create personalized, interactive surprise experiences with photos, messages, and audio
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
          >
            Get Started →
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎨',
              title: 'Personalized Themes',
              description: 'Choose from 6 beautiful themes to match the vibe',
            },
            {
              icon: '📸',
              title: 'Photo Gallery',
              description: 'Share precious memories with an interactive gallery',
            },
            {
              icon: '🔐',
              title: 'Password Protected',
              description: 'Keep surprises safe with password protection',
            },
            {
              icon: '🎁',
              title: 'QR Code Sharing',
              description: 'Easy sharing via QR code or link',
            },
            {
              icon: '🎵',
              title: 'Audio Messages',
              description: 'Add your voice message to make it personal',
            },
            {
              icon: '⏰',
              title: 'Auto Expiry',
              description: 'Set when the surprise expires automatically',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}