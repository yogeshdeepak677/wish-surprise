import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { surpriseAPI } from '../../services/api';

export function MediaUpload({ surpriseId, type, onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      if (type === 'photo') {
        await surpriseAPI.uploadPhoto(surpriseId, file);
      } else if (type === 'audio') {
        await surpriseAPI.uploadAudio(surpriseId, file);
      }

      // Show preview
      if (type === 'photo') {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {type === 'photo' ? '📸 Upload Photos' : '🎵 Upload Audio'}
      </h3>

      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        accept={type === 'photo' ? 'image/*' : 'audio/*'}
        className="hidden"
        id={`${type}-input`}
      />

      <label
        htmlFor={`${type}-input`}
        className="inline-block px-6 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-pink-600 transition disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : `Choose ${type}`}
      </label>

      {preview && type === 'photo' && (
        <img src={preview} alt="Preview" className="mt-4 max-w-xs mx-auto rounded-lg" />
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </motion.div>
  );
}