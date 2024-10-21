// src/app/pages/InstaGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface InstagramPost {
  id: string;
  media_url: string;
  caption: string;
  permalink: string;
}

const InstaGrid: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Replace YOUR_ACCESS_TOKEN with your Instagram API access token
        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink&access_token=YOUR_ACCESS_TOKEN`
        );
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="bg-[#f5f3e5] p-4 text-center">
      <h2 className="text-green-900 font-bold text-xl mb-4">
        MASIH BELUM YAKIN?
      </h2>
      <p className="text-green-700 mb-6">Follow ig @rm.padanganda yuk!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={post.media_url}
              alt={post.caption || "Instagram Post"}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white p-2 text-sm">{post.caption}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstaGrid;
