// src/app/pages/news/[id].tsx
import { useRouter } from "next/router";
import { db } from "@/firebase/firebaseConfig"; // Ensure this path is correct
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const DetailNews: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL
  const [newsItem, setNewsItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchNewsItem = async () => {
        const docRef = doc(db, "news", id as string); // Reference to the specific document
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setNewsItem({ id: docSnap.id, ...docSnap.data() }); // Store data if exists
        } else {
          console.error("No such document!");
        }
        setLoading(false); // Update loading state
      };

      fetchNewsItem();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!newsItem) return <div>No news item found!</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{newsItem.title}</h1>
      <img src={newsItem.thumbnail} alt={newsItem.title} className="w-full h-48 object-cover" />
      <p className="mt-4">{newsItem.description}</p>
      <div className="mt-2">
        {newsItem.tags.map((tag: string, index: number) => (
          <span key={index} className="text-sm text-blue-500 mr-2">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DetailNews;
