import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { MdAddCircleOutline } from "react-icons/md";
// import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"; // Tailwind icons

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

const AccordionCRUD: React.FC = () => {
  const [items, setItems] = useState<AccordionItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch all accordion items from Firestore
  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "accordions"));
    const accordionItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AccordionItem[];
    setItems(accordionItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Create a new accordion item
  const createItem = async () => {
    if (newTitle && newContent) {
      await addDoc(collection(db, "accordions"), {
        title: newTitle,
        content: newContent,
      });
      setNewTitle("");
      setNewContent("");
      fetchItems();
    }
  };

  // Update an accordion item
  const updateItem = async (id: string) => {
    const itemDoc = doc(db, "accordions", id);
    await updateDoc(itemDoc, { title: newTitle, content: newContent });
    setEditId(null);
    fetchItems();
  };

  // Delete an accordion item
  const deleteItem = async (id: string) => {
    const itemDoc = doc(db, "accordions", id);
    await deleteDoc(itemDoc);
    fetchItems();
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Add Accordion</h1>

      {/* Add or Edit Item */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 w-full"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        {editId ? (
          <button
            onClick={() => updateItem(editId)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Item
          </button>
        ) : (
          <button
            onClick={createItem}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Item
          </button>
        )}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-md">
            <button
              className="w-full text-left p-4 font-medium flex justify-between items-center"
              onClick={() => setEditId(editId === item.id ? null : item.id)}
            >
              {item.title}
              <span className="flex space-x-2">
                <MdAddCircleOutline
                  className="w-5 h-5 text-blue-500 cursor-pointer"
                  onClick={() => {
                    setNewTitle(item.title);
                    setNewContent(item.content);
                    setEditId(item.id);
                  }}
                />
                <MdAddCircleOutline //trash
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => deleteItem(item.id)}
                />
              </span>
            </button>
            {editId === item.id && (
              <div className="p-4 border-t">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionCRUD;
