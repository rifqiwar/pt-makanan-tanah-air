// src/app/components/NewsDetail.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useEffect, useState } from 'react';

const NewsDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newsItem, setNewsItem] = useState<any>(null); // Adjust the type according to your data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      if (id) {
        console.log
        const docRef = doc(db, 'news', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNewsItem(docSnap.data());
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{newsItem.title}</h1>
      <img src={newsItem.thumbnail} alt={newsItem.title} className="w-full h-64 object-cover mt-4" />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {newsItem.photos.map((photo: string, index: number) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
        ))}
      </div>
      <p className="mt-4">{newsItem.description}</p>
      <div className="flex flex-wrap mt-2">
        {newsItem.tags.map((tag: string, index: number) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
