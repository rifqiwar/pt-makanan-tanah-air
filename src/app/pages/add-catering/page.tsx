// src/app/pages/CateringAdmin.tsx
"use client";

import React, { useState, useEffect } from "react";
// import { db, storage } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";

interface CateringItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CateringAdmin: React.FC = () => {
  const [cateringItems, setCateringItems] = useState<CateringItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "catering"));
      const items: CateringItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as CateringItem);
      });
      setCateringItems(items);
    };
    fetchData();
  }, []);

  // Handle image upload
  const handleImageUpload = async (): Promise<string | null> => {
    if (!image) return null;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };

  // Add or update item
  const handleSubmit = async () => {
    const imageUrl = await handleImageUpload();

    if (editId) {
      // Update existing item
      const itemRef = doc(db, "catering", editId);
      await updateDoc(itemRef, {
        title,
        description,
        ...(imageUrl ? { imageUrl } : {}),
      });
      setEditId(null);
    } else {
      // Add new item
      await addDoc(collection(db, "catering"), {
        title,
        description,
        imageUrl: imageUrl || "",
      });
    }

    // Clear form
    setTitle("");
    setDescription("");
    setImage(null);
  };

  // Delete item
  const handleDelete = async (id: string, imageUrl: string) => {
    await deleteDoc(doc(db, "catering", id));
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    setCateringItems(cateringItems.filter((item) => item.id !== id));
  };

  // Edit item
  const handleEdit = (item: CateringItem) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item.id || null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Catering Items</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mb-4"
      >
        <div className="mb-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* List of Catering Items */}
      <ul>
        {cateringItems.map((item) => (
          <li key={item.id} className="border p-4 mb-2">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p>{item.description}</p>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="w-32 h-32" />
            )}
            <div className="mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-600 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id!, item.imageUrl)}
                className="bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CateringAdmin;
