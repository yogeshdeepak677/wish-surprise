import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEMES, EXPIRY_OPTIONS } from '../../constants/themes';
import { getPasswordStrength } from '../../utils/formatting';
import { surpriseAPI } from '../../services/api';

export function CreateSurpriseForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    recipient_name: '',
    birthday_date: '',
    age: '',
    message: '',
    theme: 'Rose Dream',
    password: '',
    password_confirm: '',
    expiry: '48h',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.password_confirm) {
        throw new Error('Passwords do not match');
      }

      await surpriseAPI.create(formData);
      onSuccess?.();
      setFormData({
        recipient_name: '',
        birthday_date: '',
        age: '',
        message: '',
        theme: 'Rose Dream',
        password: '',
        password_confirm: '',
        expiry: '48h',
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Surprise</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="recipient_name"
          placeholder="Recipient Name"
          value={formData.recipient_name}
          onChange={handleChange}
          required
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="date"
          name="birthday_date"
          value={formData.birthday_date}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="number"
          name="age"
          placeholder="Age (optional)"
          value={formData.age}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <textarea
        name="message"
        placeholder="Birthday Message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
      />

      <select
        name="theme"
        value={formData.theme}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
      >
        {Object.keys(THEMES).map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>

      <select
        name="expiry"
        value={formData.expiry}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
      >
        {EXPIRY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="••••••••"
          />
          {passwordStrength && (
            <p className="text-sm mt-1 text-gray-600">Strength: {passwordStrength}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            value={formData.password_confirm}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Surprise'}
      </button>
    </motion.form>
  );
}