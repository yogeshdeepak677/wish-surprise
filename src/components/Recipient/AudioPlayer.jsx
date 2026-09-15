import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function AudioPlayer({ audioPath }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio?.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio?.addEventListener('timeupdate', handleTimeUpdate);
    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
      audio?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold mb-4">🎵 Birthday Message</h3>

      <audio ref={audioRef} src={`/api${audioPath}`} />

      <button
        onClick={togglePlay}
        className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>

      <div className="mt-4">
        <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-white h-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2 opacity-80">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}

const { useState } = require('react');

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}