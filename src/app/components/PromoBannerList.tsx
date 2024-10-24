// src/app/components/PromoBannerList.tsx
import { Banner } from '@/types/Banner';
import React from 'react';
// import { Banner } from '../../../types/Banner'; // Pastikan ini sesuai dengan path yang benar

const PromoBannerList: React.FC<{
  banners: Banner[];
  onEdit: (banner: Banner) => void;
}> = ({ banners, onEdit }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Banner Promo</h2>
      <ul>
        {banners.map(banner => (
          <li key={banner.id} className="border p-4 mb-2 rounded">
            <h3 className="text-lg font-semibold">{banner.title}</h3>
            <img src={banner.imageUrl} alt={banner.title} className="mb-2" />
            <p>{banner.description}</p>
            <button onClick={() => onEdit(banner)} className="bg-yellow-500 text-white py-1 px-2 rounded">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromoBannerList;
