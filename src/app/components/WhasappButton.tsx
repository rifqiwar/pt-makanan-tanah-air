// components/WhatsAppButton.tsx
"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig"; // Adjust the path as needed
import { collection, onSnapshot } from "firebase/firestore";

interface WhatsAppButtonData {
  id: string;
  name: string;
  whatsapp: string;
  message: string;
}

const WhatsAppButton: React.FC = () => {
  const [buttonData, setButtonData] = useState<WhatsAppButtonData | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "buttons"), (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as WhatsAppButtonData[];
        setButtonData(data[0]); // Assuming you want the first button; adjust as needed
      }
      setLoading(false); // Set loading to false after data is fetched
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Show loading state
  }

  if (!buttonData) {
    return <div className="text-center">No button data found.</div>; // Handle case where no data is found
  }

  const { whatsapp, message } = buttonData;
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="flex justify-center">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <button
          style={{
            backgroundColor: "#28a745", // Hex for green
            color: "#ffffff", // Hex for white
            padding: "0.5rem 1rem", // Tailwind equivalent of px-4 py-2
            borderRadius: "0.375rem", // Tailwind equivalent of rounded-md
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#218838")
          } // Darker green on hover
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          } // Reset to original green
        >
          {buttonData.name}
        </button>
      </a>
    </div>
  );
};

export default WhatsAppButton;
