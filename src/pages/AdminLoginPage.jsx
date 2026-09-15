import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout/Header';
import { LoginForm } from '../components/Auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { admin } = useAuth();

  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600">
      <Header title="Admin Login" subtitle="Access your surprise management dashboard" />

      <div className="max-w-6xl mx-auto px-4 py-20">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
}