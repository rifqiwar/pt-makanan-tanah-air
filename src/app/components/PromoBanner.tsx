// src/app/components/PromoBanner.tsx
"use client"; // Tambahkan ini di bagian atas file

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link dari Next.js
// import { db } from '../firebase'; // Import database Firestore Anda
import { collection, getDocs } from 'firebase/firestore'; // Import fungsi yang diperlukan dari Firestore
import { db } from '@/firebase/firebaseConfig';

interface Promo {
  id: string;
  title: string;
  description: string;
}

const PromoBanner: React.FC = () => {
  const [promo, setPromo] = useState<Promo | null>(null); // State untuk menyimpan data promo

  useEffect(() => {
    const fetchPromo = async () => {
      const promoCollection = collection(db, 'promos'); // Ganti 'promos' dengan nama koleksi Anda
      const promoSnapshot = await getDocs(promoCollection);
      const promoData = promoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Promo[];

      if (promoData.length > 0) {
        setPromo(promoData[0]); // Ambil promo pertama dari koleksi
      }
    };

    fetchPromo();
  }, []);

  if (!promo) {
    return <div>Loading...</div>; // Menampilkan loading saat data diambil
  }

  return (
    <Link href={`/pages/promo-detail?id=${promo.id}`} className="bg-blue-500 text-white p-5 block text-center">
      <h2 className="text-2xl font-bold">{promo.title}</h2>
      <p>{promo.description}</p>
    </Link>
  );
};

export default PromoBanner;
