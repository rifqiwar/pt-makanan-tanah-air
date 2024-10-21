// src/app/components/TagManagement.tsx
"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Tag {
  id: string;
  name: string;
}

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagName, setTagName] = useState("");
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch tags from Firestore
  const fetchTags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tag[];
      setTags(tagList);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Add or update a tag
  const handleSaveTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setMessage("Tag name is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (editingTag) {
        // Update existing tag
        await updateDoc(doc(db, "tags", editingTag.id), { name: tagName });
        setTags(
          tags.map((tag) =>
            tag.id === editingTag.id ? { ...tag, name: tagName } : tag
          )
        );
        setMessage("Tag updated successfully.");
      } else {
        // Add new tag
        const newTag = { name: tagName.trim() };
        const docRef = await addDoc(collection(db, "tags"), newTag);
        setTags([...tags, { id: docRef.id, name: tagName }]);
        setMessage("Tag added successfully.");
      }
      setTagName("");
      setEditingTag(null);
    } catch (error) {
      console.error("Error saving tag:", error);
      setMessage("Failed to save tag.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a tag
  const handleDeleteTag = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tags", id));
      setTags(tags.filter((tag) => tag.id !== id));
      setMessage("Tag deleted successfully.");
    } catch (error) {
      console.error("Error deleting tag:", error);
      setMessage("Failed to delete tag.");
    }
  };

  // Edit a tag
  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setMessage("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTag(null);
    setTagName("");
    setMessage("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tag Management</h1>
      <form onSubmit={handleSaveTag} className="mb-4 space-y-4">
        {message && (
          <div
            className={`p-2 rounded text-white ${
              message.includes("successfully") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <div>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter tag name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : editingTag ? "Update Tag" : "Add Tag"}
          </button>
          {editingTag && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 rounded bg-gray-500 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-2">Existing Tags</h2>
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>{tag.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditTag(tag)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagManagement;
