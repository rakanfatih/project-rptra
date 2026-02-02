import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useWargaBookings = (user) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await api.get('/riwayat-saya'); 
            setBookings(response.data);
        } catch (error) {
            console.error("Gagal ambil riwayat:", error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchHistory();
  }, [user]);

  return { bookings, loading };
};