"use client"
// src/app/news/index.tsx
import CardNews from "@/app/components/CardNews";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import React, { useEffect, useState } from "react";

const NewsPage: React.FC = () => {
    const [newsItems, setNewsItems] = useState<any[]>([]); // Adjust type as necessary
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchNewsItems = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'news')); // Use getDocs instead of getDoc
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setNewsItems(items);
        } catch (error) {
          console.error("Error fetching news items:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchNewsItems();
    }, []);
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="container mx-auto p-4">
        <CardNews newsItems={newsItems} />
      </div>
    );
};

export default NewsPage;
