// src/app/components/ImageUploadForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";

interface ImageData {
  id: string;
  url: string;
  createdAt: any;
}

const ImageUploadForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState<ImageData[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editImageId, setEditImageId] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch all images from Firestore
  const fetchImages = async () => {
    const querySnapshot = await getDocs(collection(db, "sliderImages"));
    const fetchedImages: ImageData[] = [];
    querySnapshot.forEach((doc) => {
      fetchedImages.push({ id: doc.id, ...doc.data() } as ImageData);
    });
    setImages(fetchedImages);
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!imageFile) return;
    setIsUploading(true);
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await saveImageUrlToFirestore(downloadURL);
        setIsUploading(false);
        setUploadProgress(0);
        setImageFile(null);
        fetchImages();
      }
    );
  };

  // Save the uploaded image URL to Firestore
  const saveImageUrlToFirestore = async (url: string) => {
    try {
      await addDoc(collection(db, "sliderImages"), {
        url,
        createdAt: new Date(),
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error saving image URL to Firestore:", error);
    }
  };

  // Delete an image from Firestore
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "sliderImages", id));
      alert("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Enable edit mode and set the selected image
  const handleEdit = (id: string) => {
    setEditMode(true);
    setEditImageId(id);
  };

  // Update an image's URL in Firestore
  const handleUpdate = async () => {
    if (!editImageId || !imageFile) return;
    setIsUploading(true);
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          const imageDoc = doc(db, "sliderImages", editImageId);
          await updateDoc(imageDoc, { url: downloadURL });
          alert("Image updated successfully!");
          setEditMode(false);
          setEditImageId(null);
          setImageFile(null);
          setIsUploading(false);
          fetchImages();
        } catch (error) {
          console.error("Error updating image:", error);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={editMode ? handleUpdate : handleUpload}
        disabled={!imageFile || isUploading}
        className={`px-4 py-2 rounded-md text-white ${
          isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isUploading ? `Uploading... ${uploadProgress.toFixed(2)}%` : editMode ? "Update" : "Upload"}
      </button>

      {/* Display list of images */}
      <div className="w-full mt-6">
        <h2 className="text-lg font-semibold mb-4">Uploaded Images</h2>
        <ul className="space-y-4">
          {images.map((image) => (
            <li key={image.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm">
              <img src={image.url} alt="Uploaded" className="w-16 h-16 object-cover rounded-md mr-4" />
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(image.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="text-red-500 hover:text-red-700"
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

export default ImageUploadForm;
