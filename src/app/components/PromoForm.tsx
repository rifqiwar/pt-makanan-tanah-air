// src/app/components/PromoBannerForm.tsx
"use client";

import React, { useState, useEffect } from 'react';

// Definisikan tipe untuk banner
interface Banner {
  id?: string; // id bersifat opsional untuk banner baru
  title: string;
  description: string;
  imageUrl: string;
}

const PromoBannerForm: React.FC<{
  banner: Banner | null; // banner bisa null jika tidak ada yang dipilih
  onSubmit: (banner: Banner) => void;
  onDelete: () => void;
}> = ({ banner, onSubmit, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setDescription(banner.description);
      setImageUrl(banner.imageUrl);
    }
  }, [banner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: banner?.id, title, description, imageUrl });
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full mb-2"
        required
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        placeholder="URL Gambar"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border rounded p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Simpan</button>
      {banner && (
        <button type="button" onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded ml-2">
          Hapus
        </button>
      )}
    </form>
  );
};

export default PromoBannerForm;
