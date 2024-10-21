// src/app/components/LinkGenerator.tsx
"use client";

import React, { useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

const LinkGenerator: React.FC = () => {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [testimonialLink, setTestimonialLink] = useState<string | null>(null);

  const generateLink = async () => {
    if (!clientName || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Create a unique link with the client name and phone number
      const docRef = await addDoc(collection(db, "testimonials"), {
        clientName,
        phoneNumber,
        status: "pending",
      });

      const generatedLink = `${window.location.origin}/testimony/${docRef.id}`;
      setTestimonialLink(generatedLink);
    } catch (error) {
      console.error("Error generating testimonial link:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Generate Testimonial Link
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter client name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-700"
          onClick={generateLink}
        >
          Generate Link
        </button>

        {testimonialLink && (
          <div className="mt-6">
            <p className="text-green-600 font-bold">
              Link generated successfully!
            </p>
            <Link href={testimonialLink} className="text-blue-600 underline">
              Click here to send this link to the customer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
