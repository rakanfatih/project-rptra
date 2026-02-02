import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export const useAdminBookings = (onLogout) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/dashboard');
      setBookings(response.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (onLogout) onLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  const updateBookingStatus = async (id, action) => {
    try {
      const endpoint = action === 'approve' ? `/admin/approve/${id}` : `/admin/reject/${id}`;
      await api.patch(endpoint);
      await fetchBookings(); 
      return true;
    } catch (error) {
      console.error("Gagal update status:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, loading, fetchBookings, updateBookingStatus };
};