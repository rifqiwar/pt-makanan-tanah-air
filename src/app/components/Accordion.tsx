import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig"; // Adjust the path as necessary
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Define the interface for Accordion items
interface AccordionItem {
  id?: string; // Firebase document ID
  title: string;
  content: string;
}

const Accordion: React.FC = () => {
  const [items, setItems] = useState<AccordionItem[]>([]);
  const [newItem, setNewItem] = useState<AccordionItem>({
    title: "",
    content: "",
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Fetch Accordion data from Firebase
  const fetchAccordionItems = async () => {
    const querySnapshot = await getDocs(collection(db, "accordions"));
    const fetchedItems: AccordionItem[] = querySnapshot.docs
      .map((doc) => {
        const data = doc.data() as Omit<AccordionItem, "id">; // Use Omit to exclude 'id'
        return {
          id: doc.id,
          ...data,
        };
      })
      .filter((item) => item.title && item.content) as AccordionItem[]; // Ensure only valid items

    setItems(fetchedItems);
  };

  useEffect(() => {
    fetchAccordionItems();
  }, []);

  // Handle toggle for expanding/collapsing accordion
  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Add new accordion item to Firebase
  const addAccordionItem = async () => {
    if (newItem.title && newItem.content) {
      try {
        const docRef = await addDoc(collection(db, "accordions"), newItem);
        setItems([...items, { id: docRef.id, ...newItem }]);
        setNewItem({ title: "", content: "" }); // Reset input fields
      } catch (error) {
        console.error("Error adding accordion item:", error);
      }
    }
  };

  // Delete an accordion item from Firebase
  const deleteAccordionItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "accordions", id));
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting accordion item:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {items.map((item, index) => (
        <div key={item.id} className="border-b border-gray-300">
          <button
            className="w-full text-left py-4 px-6 font-medium text-lg flex justify-between items-center hover:bg-gray-100"
            onClick={() => handleToggle(index)}
          >
            {item.title}
            <span className="text-gray-500">
              {activeIndex === index ? "-" : "+"}
            </span>
          </button>
          <div
            className={`transition-all overflow-hidden duration-500 ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="px-6 py-4">
              <p className="text-gray-700">{item.content}</p>
              {/* <button
                className="text-red-500 mt-2"
                onClick={() => deleteAccordionItem(item.id as string)}
              >
                Delete
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
