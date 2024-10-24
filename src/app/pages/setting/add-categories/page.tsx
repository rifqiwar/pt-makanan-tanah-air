// src/app/pages/CategoryManagement.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface Category {
  id: string;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoryList: Category[] = [];
      querySnapshot.forEach((doc) => {
        categoryList.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(categoryList);
    };
    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "") return;
    try {
      const docRef = await addDoc(collection(db, "categories"), {
        name: newCategoryName,
      });
      setCategories([...categories, { id: docRef.id, name: newCategoryName }]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Update an existing category
  const handleUpdateCategory = async () => {
    if (editingCategory && editingCategory.name.trim() !== "") {
      try {
        await updateDoc(doc(db, "categories", editingCategory.id), {
          name: editingCategory.name,
        });
        setCategories(
          categories.map((category) =>
            category.id === editingCategory.id
              ? { ...category, name: editingCategory.name }
              : category
          )
        );
        setEditingCategory(null);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Add new category"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Add Category
        </button>
      </div>

      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center p-2 border-b">
            {editingCategory && editingCategory.id === category.id ? (
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, name: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div>
              {editingCategory && editingCategory.id === category.id ? (
                <button
                  onClick={handleUpdateCategory}
                  className="bg-green-500 text-white p-2 rounded ml-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingCategory(category)}
                  className="bg-yellow-500 text-white p-2 rounded ml-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="bg-red-500 text-white p-2 rounded ml-2"
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

export default CategoryManagement;
