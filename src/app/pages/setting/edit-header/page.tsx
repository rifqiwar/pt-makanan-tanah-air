"use client";

import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { db, storage } from "@/firebase/firebaseConfig"; // Pastikan untuk mengatur jalur ini sesuai dengan struktur proyek Anda
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface HeaderData {
  id?: string;
  logo: string;
  text: string;
  ctaLink: string;
}

const HeaderCRUD: React.FC = () => {
  const [header, setHeader] = useState<HeaderData>({ logo: "", text: "", ctaLink: "" });
  const [newHeader, setNewHeader] = useState<HeaderData>({ logo: "", text: "", ctaLink: "" });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const headersCollectionRef = collection(db, "header");

  // Fetch header
  const fetchHeader = async () => {
    setIsLoading(true);
    try {
      const data = await getDocs(headersCollectionRef);
      if (data.docs.length > 0) {
        const fetchedHeader = { ...data.docs[0].data(), id: data.docs[0].id } as HeaderData;
        setHeader(fetchedHeader);
      }
    } catch (error) {
      alert("Error fetching header data: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  // Handle logo file change
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
  };

  // Upload and compress logo
  const handleLogoUpload = async () => {
    if (!logoFile) return;

    setIsLoading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(logoFile, options);
      const storageRef = ref(storage, `logos/${compressedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          alert("Error uploading logo: " + error);
          setIsLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setHeader({ ...header, logo: downloadURL });
          alert("Logo uploaded successfully!");
          setIsLoading(false);
        }
      );
    } catch (error) {
      alert("Error compressing or uploading logo: " + error);
      setIsLoading(false);
    }
  };

  // Update header
  const updateHeader = async () => {
    if (!header.id) {
      alert("Header ID is missing, cannot update.");
      return;
    }

    setIsLoading(true);
    try {
      const headerDoc = doc(db, "header", header.id);
      await updateDoc(headerDoc, header as { [key: string]: any });
      alert("Header updated successfully!");
      fetchHeader(); // Refresh the data
    } catch (error) {
      alert("Error updating header: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete header
  const deleteHeader = async () => {
    if (!header.id) {
      alert("Header ID is missing, cannot delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this header?")) {
      return;
    }

    setIsLoading(true);
    try {
      const headerDoc = doc(db, "header", header.id);
      await deleteDoc(headerDoc);
      setHeader({ logo: "", text: "", ctaLink: "" });
      alert("Header deleted successfully!");
    } catch (error) {
      alert("Error deleting header: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new header
  const addHeader = async () => {
    setIsLoading(true);
    try {
      let logoUrl = header.logo;
      if (logoFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(logoFile, options);
        const storageRef = ref(storage, `logos/${compressedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);
        
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              logoUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(null);
            }
          );
        });
      }

      const newHeaderData = { ...newHeader, logo: logoUrl };
      await addDoc(headersCollectionRef, newHeaderData);
      alert("Header added successfully!");
      setNewHeader({ logo: "", text: "", ctaLink: "" }); // Reset form
      fetchHeader(); // Refresh the data
    } catch (error) {
      alert("Error adding header: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-4 ${isLoading ? "opacity-50" : ""}`}>
      <h1 className="text-2xl mb-4">Header CRUD</h1>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Current Header</h3>
        <img src={header.logo} alt="Logo" className="w-32 mb-2" />
        <p>{header.text}</p>
        <a href={header.ctaLink} className="text-blue-500 underline">CTA Link</a>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Update Header</h3>
        <input
          type="text"
          placeholder="Text"
          value={header.text}
          onChange={(e) => setHeader({ ...header, text: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="CTA Link"
          value={header.ctaLink}
          onChange={(e) => setHeader({ ...header, ctaLink: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoFileChange}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleLogoUpload}
          className="bg-green-500 text-white py-1 px-4 rounded mb-2"
        >
          Upload Logo
        </button>
        <button
          onClick={updateHeader}
          className="bg-blue-500 text-white py-1 px-4 rounded mb-2"
        >
          Update Header
        </button>
        <button
          onClick={deleteHeader}
          className="bg-red-500 text-white py-1 px-4 rounded mb-2"
        >
          Delete Header
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Add New Header</h3>
        <input
          type="text"
          placeholder="Text"
          value={newHeader.text}
          onChange={(e) => setNewHeader({ ...newHeader, text: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="CTA Link"
          value={newHeader.ctaLink}
          onChange={(e) => setNewHeader({ ...newHeader, ctaLink: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoFileChange} // Reuse the same handler
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={addHeader}
          className="bg-blue-500 text-white py-1 px-4 rounded mb-2"
        >
          Add Header
        </button>
      </div>
    </div>
  );
};

export default HeaderCRUD;
