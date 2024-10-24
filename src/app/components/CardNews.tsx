"use client"
import React from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead

interface CardNewsProps {
  newsItems: {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    tags: string[];
  }[];
}

const CardNews: React.FC<CardNewsProps> = ({ newsItems }) => {
  const router = useRouter(); // Now this will work properly

  const handleCardClick = (id: string) => {
    router.push(`/news/${id}`); // Navigates to the news detail page
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {newsItems.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleCardClick(item.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleCardClick(item.id);
            }
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-500 mr-2">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardNews;
