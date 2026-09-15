import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../components/Layout/Header';
import { CreateSurpriseForm } from '../components/Surprise/CreateSurpriseForm';
import { SurpriseCard } from '../components/Surprise/SurpriseCard';
import { surpriseAPI } from '../services/api';
import { motion } from 'framer-motion';

export function AdminDashboard() {
  const [surprises, setSurprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    fetchSurprises();
  }, []);

  const fetchSurprises = async () => {
    setLoading(true);
    try {
      const response = await surpriseAPI.getAll();
      setSurprises(response.data);
    } catch (err) {
      console.error('Failed to fetch surprises:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this surprise?')) return;
    try {
      await surpriseAPI.delete(id);
      setSurprises(surprises.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin Dashboard" subtitle="Manage your birthday surprises" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              activeTab === 'list'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            📋 My Surprises
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              activeTab === 'create'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            ➕ Create New
          </button>
        </div>

        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="create"
          >
            <CreateSurpriseForm onSuccess={fetchSurprises} />
          </motion.div>
        )}

        {activeTab === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="list"
          >
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : surprises.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 text-lg">No surprises created yet.</p>
                <p className="text-gray-500">Create your first surprise now!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surprises.map((surprise) => (
                  <SurpriseCard
                    key={surprise.id}
                    surprise={surprise}
                    onDelete={() => handleDelete(surprise.id)}
                    onEdit={() => console.log('Edit:', surprise.id)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}