import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSurpriseData } from '../../hooks/useSurpriseData';
import { PasswordScreen } from './PasswordScreen';
import { BirthdayAnimation, BirthdayWish } from './BirthdayAnimation';
import { PhotoGallery } from './PhotoGallery';
import { AudioPlayer } from './AudioPlayer';
import { THEMES } from '../../constants/themes';

export function SurpriseExperience({ slug }) {
  const { surprise, loading, error, isUnlocked } = useSurpriseData(slug);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      setShowAnimation(true);
    }
  }, [isUnlocked]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🎁
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg p-8 text-center"
        >
          <p className="text-red-600 text-xl font-bold">⚠️ {error}</p>
        </motion.div>
      </div>
    );
  }

  if (!isUnlocked) {
    return <PasswordScreen slug={slug} />;
  }

  const theme = THEMES[surprise.theme] || THEMES['Rose Dream'];

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
      }}
      className="min-h-screen py-12 px-4"
    >
      {showAnimation && (
        <BirthdayAnimation
          recipientName={surprise.recipient_name}
          onComplete={() => setAnimationComplete(true)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationComplete ? 0 : 2 }}
        className="max-w-4xl mx-auto"
      >
        <BirthdayWish
          recipientName={surprise.recipient_name}
          age={surprise.age}
          message={surprise.message}
        />

        {surprise.audio && (
          <div className="mt-12 flex justify-center">
            <AudioPlayer audioPath={surprise.audio.path} />
          </div>
        )}

        {surprise.photos && surprise.photos.length > 0 && (
          <PhotoGallery photos={surprise.photos} />
        )}
      </motion.div>
    </div>
  );
}