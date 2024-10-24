// src/app/add-news/page.tsx
"use client"
import React from "react";
import NewsInput from "@/app/components/NewsInput";

const AddNewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <NewsInput />
    </div>
  );
};

export default AddNewsPage;
