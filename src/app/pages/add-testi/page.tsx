// src/app/pages/manage-testimonials/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";

interface Testimonial {
  id?: string;
  name: string;
  photo: string;
  message: string;
}

const ManageTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    name: "",
    photo: "",
    message: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const testimonialData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[];
      setTestimonials(testimonialData);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error("No image file selected");
    }
    const storageRef = ref(storage, `testimonials/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(storageRef);
  };

  const handleAddOrUpdateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let photoUrl = newTestimonial.photo;
      if (imageFile) {
        photoUrl = await uploadImage();
      }

      if (isEditing) {
        await updateDoc(doc(db, "testimonials", isEditing), {
          name: newTestimonial.name,
          photo: photoUrl,
          message: newTestimonial.message,
        });
        setIsEditing(null);
        alert("Testimonial successfully updated!");
      } else {
        await addDoc(collection(db, "testimonials"), {
          ...newTestimonial,
          photo: photoUrl,
          createdAt: new Date(),
        });
        alert("Testimonial successfully added!");
      }
      setNewTestimonial({ name: "", photo: "", message: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding/updating testimonial:", error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setNewTestimonial(testimonial);
    setIsEditing(testimonial.id || null);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      alert("Testimonial successfully deleted!");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Testimonials</h2>
      <form onSubmit={handleAddOrUpdateTestimonial} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newTestimonial.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={newTestimonial.message}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Photo:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-10 mb-4">Testimonials List</h3>
      <ul className="space-y-4">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-gray-800">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.message}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(testimonial)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial.id || "")}
                className="text-red-500 hover:text-red-700"
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

export default ManageTestimonials;
