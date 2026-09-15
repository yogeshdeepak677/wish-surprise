import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Admin routes
export const adminAPI = {
  login: (email, password) => api.post('/admin/login', { email, password }),
  getMe: () => api.get('/admin/me'),
  logout: () => api.post('/admin/logout'),
  changePassword: (currentPassword, newPassword, confirmPassword) =>
    api.post('/admin/change-password', { currentPassword, newPassword, confirmPassword }),
};

// Surprise routes
export const surpriseAPI = {
  create: (data) => api.post('/surprises', data),
  getAll: () => api.get('/surprises'),
  update: (id, data) => api.put(`/surprises/${id}`, data),
  delete: (id) => api.delete(`/surprises/${id}`),
  uploadPhoto: (id, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post(`/surprises/${id}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadAudio: (id, file) => {
    const formData = new FormData();
    formData.append('audio', file);
    return api.post(`/surprises/${id}/audio`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteMedia: (mediaId) => api.delete(`/surprises/media/${mediaId}`),
  getQR: (id) => api.get(`/surprises/${id}/qr`),
};

// Public routes
export const publicAPI = {
  getSurprise: (slug) => api.get(`/public/${slug}`),
  unlock: (slug, password) => api.post(`/public/${slug}/unlock`, { password }),
};

export default api;