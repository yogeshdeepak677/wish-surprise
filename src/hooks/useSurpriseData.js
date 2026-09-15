import { useState, useEffect } from 'react';
import { publicAPI } from '../services/api';

export function useSurpriseData(slug) {
  const [surprise, setSurprise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const fetchSurprise = async () => {
      try {
        const response = await publicAPI.getSurprise(slug);
        setSurprise(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load surprise');
      } finally {
        setLoading(false);
      }
    };

    fetchSurprise();
  }, [slug]);

  const unlock = async (password) => {
    try {
      const response = await publicAPI.unlock(slug, password);
      setSurprise(response.data);
      setIsUnlocked(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to unlock surprise');
      return false;
    }
  };

  return { surprise, loading, error, isUnlocked, unlock };
}