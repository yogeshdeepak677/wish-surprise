import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📸 Special Moments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-200">
              <img
                src={`/api${photo.path}`}
                alt="Memory"
                className="w-full h-64 object-cover hover:opacity-80 transition"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        >
          <motion.img
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            src={`/api${selectedPhoto.path}`}
            alt="Full view"
            className="max-w-full max-h-full rounded-lg cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </motion.div>
  );
}