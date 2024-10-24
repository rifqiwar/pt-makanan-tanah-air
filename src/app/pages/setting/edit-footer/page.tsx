// src/app/components/Footer.tsx
"use client";

import React, { useEffect, useState } from "react";
// import { db, storage } from "../firebase"; // Pastikan jalur ini sesuai
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage
import imageCompression from 'browser-image-compression';
import { db, storage } from "@/firebase/firebaseConfig";

interface SocialLink {
  id?: string;
  name: string;
  url: string;
  imageUrl?: string; // Tambahkan properti untuk URL gambar
}

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // State untuk gambar
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchSocialLinks = async () => {
    try {
      const snapshot = await getDocs(collection(db, "footers"));
      const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SocialLink[];
      setSocialLinks(links);
    } catch (error) {
      setAlert({ message: "Failed to fetch links.", type: "error" });
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const handleAddLink = async () => {
    let imageUrl: string | undefined;

    // Jika ada gambar, kompres dan upload
    if (image) {
      const options = {
        maxSizeMB: 1, // Maksimal 1 MB
        useWebWorker: true,
      };

      try {
        const compressedImage = await imageCompression(image, options);
        const imageRef = ref(storage, `footers/${compressedImage.name}`);
        await uploadBytes(imageRef, compressedImage);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        setAlert({ message: "Failed to upload image.", type: "error" });
        return; // Hentikan proses jika ada error
      }
    }

    try {
      await addDoc(collection(db, "footers"), { name, url, imageUrl });
      setAlert({ message: "Link added successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: "Failed to add link.", type: "error" });
    }
    
    setName('');
    setUrl('');
    setImage(null); // Reset image
    fetchSocialLinks();
  };

  const handleEditLink = (link: SocialLink) => {
    if (link.id) {
      setEditId(link.id);
      setName(link.name);
      setUrl(link.url);
      setImage(null); // Set gambar null saat edit
    }
  };

  const handleUpdateLink = async () => {
    let imageUrl: string | undefined;

    // Jika ada gambar, kompres dan upload
    if (image) {
      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };

      try {
        const compressedImage = await imageCompression(image, options);
        const imageRef = ref(storage, `footers/${compressedImage.name}`);
        await uploadBytes(imageRef, compressedImage);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        setAlert({ message: "Failed to upload image.", type: "error" });
        return;
      }
    }

    if (editId) {
      const linkRef = doc(db, "footers", editId);
      try {
        await updateDoc(linkRef, { name, url, ...(imageUrl && { imageUrl }) }); // Update imageUrl hanya jika ada
        setAlert({ message: "Link updated successfully!", type: "success" });
      } catch (error) {
        setAlert({ message: "Failed to update link.", type: "error" });
      }
      setEditId(undefined);
      setName('');
      setUrl('');
      setImage(null);
      fetchSocialLinks();
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteDoc(doc(db, "footers", id));
      setAlert({ message: "Link deleted successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: "Failed to delete link.", type: "error" });
    }
    fetchSocialLinks();
  };

  return (
    <footer className="bg-white text-gray-800 p-5 shadow-md">
      <p className="text-center mb-4">&copy; {new Date().getFullYear()} padanganda.com. All rights reserved.</p>
      <div className="space-y-2 mb-4">
        {socialLinks.map(link => (
          <div key={link.id} className="flex items-center justify-between p-2 border-b border-gray-200">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {link.name}
            </a>
            {link.imageUrl && (
              <img src={link.imageUrl} alt={link.name} className="w-16 h-16 object-cover rounded" />
            )}
            <div>
              <button
                onClick={() => handleEditLink(link)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteLink(link.id!)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 mr-2 mb-2 md:mb-0 flex-1"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded p-2 mr-2 mb-2 md:mb-0 flex-1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="border rounded p-2 mb-2 md:mb-0 flex-1"
        />
        <button
          onClick={editId ? handleUpdateLink : handleAddLink}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update Link" : "Add Link"}
        </button>
      </div>
      {alert && (
        <div className={`mt-4 p-3 rounded ${alert.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          {alert.message}
        </div>
      )}
    </footer>
  );
};

export default Footer;
