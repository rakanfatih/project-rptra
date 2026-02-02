import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path) => `http://127.0.0.1:8000/storage/${path}`;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/cms/gallery');
        if (Array.isArray(res.data)) {
            setGalleryData(res.data);
        } else {
            setGalleryData([]);
        }
      } catch (error) {
        console.error("Gagal load galeri:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { galleryData, loading, getImageUrl };
};