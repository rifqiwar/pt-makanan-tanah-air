"use client";
// src/app/testimony/[id].tsx
import React, { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useParams } from 'next/navigation';
const TestimonyForm: React.FC = () => {
  // const router = useRouter();

  const { id } = useParams(); // Replaces useRouter()
  const [testimony, setTestimony] = useState("");
  // const { id } = router.query;
  // const [testimony, setTestimony] = useState("");
  const [client, setClient] = useState<{
    clientName: string;
    phoneNumber: string;
  } | null>(null);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        const docRef = doc(db, "testimonials", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setClient(
            docSnap.data() as { clientName: string; phoneNumber: string }
          );
        } else {
          console.error("No such document!");
        }
      };

      fetchClient();
    }
  }, [id]);

  const submitTestimony = async () => {
    if (!testimony) {
      alert("Please write your testimony");
      return;
    }

    const docRef = doc(db, "testimonials", id as string);
    await updateDoc(docRef, {
      testimony,
      status: "completed",
    });

    alert("Thank you for your feedback!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Submit Your Testimony
        </h2>

        {client && (
          <>
            <p className="text-lg mb-4">Hello, {client.clientName}!</p>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Write your testimony here..."
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
            />
            <button
              className="w-full bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded-md shadow hover:bg-green-700"
              onClick={submitTestimony}
            >
              Submit Testimony
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonyForm;
