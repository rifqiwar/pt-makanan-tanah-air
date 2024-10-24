// src/app/pages/manage-buttons/ManageButtons.tsx
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
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface ButtonData {
  id?: string;
  name: string;
  whatsapp: string;
  message: string;
}

const ManageButtons: React.FC = () => {
  const [buttons, setButtons] = useState<ButtonData[]>([]);
  const [newButton, setNewButton] = useState<ButtonData>({
    name: "",
    whatsapp: "62",
    message: "",
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "buttons"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const buttonData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ButtonData[];
      setButtons(buttonData);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewButton((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDoc(doc(db, "buttons", isEditing), {
          name: newButton.name,
          whatsapp: newButton.whatsapp,
          message: newButton.message,
        });
        setIsEditing(null);
        alert("Button successfully updated!");
      } else {
        await addDoc(collection(db, "buttons"), {
          ...newButton,
        });
        alert("Button successfully added!");
      }
      setNewButton({ name: "", whatsapp: "62", message: "" });
    } catch (error) {
      console.error("Error adding/updating button:", error);
    }
  };

  const handleEdit = (button: ButtonData) => {
    setNewButton(button);
    setIsEditing(button.id || null);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this button?"
    );
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "buttons", id));
      alert("Button successfully deleted!");
    } catch (error) {
      console.error("Error deleting button:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Manage WhatsApp Buttons
      </h2>
      <form onSubmit={handleAddOrUpdateButton} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Button Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newButton.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="whatsapp"
            className="block text-sm font-medium text-gray-700"
          >
            WhatsApp Number:
          </label>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            value={newButton.whatsapp}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={newButton.message}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isEditing
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Update Button" : "Add Button"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-10 mb-4">Buttons List</h3>
      <ul className="space-y-4">
        {buttons.map((button) => (
          <li
            key={button.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{button.name}</p>
              <p className="text-gray-600">WhatsApp: {button.whatsapp}</p>
              <p className="text-gray-600">Message: {button.message}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(button)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(button.id || "")}
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

export default ManageButtons;
