// src/app/pages/CateringPage.tsx
"use client";

import React, { useEffect, useState } from "react";
// import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import styles from "./MainLayout.module.css";

interface CateringItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CateringPage: React.FC = () => {
  const [cateringItems, setCateringItems] = useState<CateringItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "catering"));
        const items: CateringItem[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as CateringItem);
        });
        setCateringItems(items);
      } catch (error) {
        console.error("Error fetching catering items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainLayout}>
      <h1 className="text-2xl font-bold mb-4">Catering Menu</h1>
      {cateringItems.length === 0 ? (
        <p>No catering items available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 ">
          {cateringItems.map((item) => (
            <li key={item.id} className="border p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-2">{item.title}</h2>
              <p className="mb-2">{item.description}</p>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CateringPage;
