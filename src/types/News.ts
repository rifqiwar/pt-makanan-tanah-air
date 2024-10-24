// src/types/index.ts
export interface NewsItem {
    id: string; // Add this line
    title: string;
    thumbnail: string;
    description: string;
    tags: string[];
    photos: string[]; // URLs of the uploaded photos
  }
  