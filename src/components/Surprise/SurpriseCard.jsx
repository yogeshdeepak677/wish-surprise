import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { surpriseAPI } from '../../services/api';
import { calculateTimeUntilExpiry } from '../../utils/formatting';

export function SurpriseCard({ surprise, onDelete, onEdit }) {
  const [qrCode, setQrCode] = useState(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (showQR && !qrCode) {
      fetchQRCode();
    }
  }, [showQR]);

  const fetchQRCode = async () => {
    try {
      const response = await surpriseAPI.getQR(surprise.id);
      setQrCode(response.data.qrCode);
    } catch (err) {
      console.error('Failed to fetch QR code:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{surprise.recipient_name}</h3>
          <p className="text-gray-600 text-sm">{surprise.birthday_date}</p>
        </div>
        <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full">
          {calculateTimeUntilExpiry(surprise.expires_at)}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {showQR ? 'Hide QR' : 'Show QR'}
        </button>
        <button
          onClick={onEdit}
          className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>

      {showQR && qrCode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex justify-center"
        >
          <img src={qrCode} alt="QR Code" className="w-48 h-48" />
        </motion.div>
      )}
    </motion.div>
  );
}