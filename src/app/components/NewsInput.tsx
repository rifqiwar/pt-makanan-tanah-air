// src/app/components/NewsInput.tsx
import React, { useState, useEffect } from 'react';
import { db, storage } from '@/firebase/firebaseConfig'; 
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

const NewsInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]); // For existing tags
  const [newTag, setNewTag] = useState<string>(''); // For new tag input

  useEffect(() => {
    const fetchTags = async () => {
      const tagsCollection = collection(db, 'tags');
      const tagsSnapshot = await getDocs(tagsCollection);
      const tagsList = tagsSnapshot.docs.map(doc => doc.data().name as string);
      setAllTags(tagsList);
    };

    fetchTags();
  }, []);

  const handlePhotoChange = (index: number, file: File | null) => {
    if (file) {
      const newPhotos = [...photos];
      newPhotos[index] = file;
      setPhotos(newPhotos);
    }
  };

  const addPhotoField = () => {
    setPhotos([...photos, new File([], '')]); // Add a new empty File object
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnail(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newsData = {
        title,
        thumbnail: '',
        description,
        tags,
        photos: [] as string[],
      };

      if (thumbnailFile) {
        const thumbnailUrl = await uploadImage(thumbnailFile);
        newsData.thumbnail = thumbnailUrl;
      }

      const photoUrls = await Promise.all(photos.map(file => uploadImage(file)));
      newsData.photos = photoUrls;

      // Add news item to Firestore
      await addDoc(collection(db, 'news'), newsData);

      // Save new tags to Firestore if they don't already exist
      for (const tag of tags) {
        if (!allTags.includes(tag)) {
          await setDoc(doc(db, 'tags', tag), { name: tag });
        }
      }

      // Reset form
      setTitle('');
      setThumbnail(null);
      setPhotos([]);
      setDescription('');
      setTags([]);
      setNewTag('');
      alert('News item added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add news item.');
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    if (!file) return '';

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleTagChange = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag)); // Remove tag if already selected
    } else {
      setTags([...tags, tag]); // Add tag if not selected
    }
  };

  const addNewTag = () => {
    if (newTag && !allTags.includes(newTag)) {
      setTags([...tags, newTag]);
      setAllTags([...allTags, newTag]); // Update existing tags to include new
      setNewTag(''); // Clear input field
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add News</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="thumbnail">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="w-full border rounded-md p-2"
            required
          />
          {thumbnail && (
            <div className="mt-2">
              <img src={thumbnail} alt="Thumbnail Preview" className="h-32 object-cover" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Photos</label>
          {photos.map((photo, index) => (
            <div className="flex mb-2" key={index}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                className="flex-grow border rounded-md p-2"
                required
              />
              {/* Add the "Remove" button to remove specific files */}
              <button
                type="button"
                onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          {/* Button to add more photo input fields */}
          <button
            type="button"
            onClick={addPhotoField}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Photo
          </button>
          <div className="mt-2">
            {photos.map((photo, index) => {
              const url = URL.createObjectURL(photo);
              return (
                <img
                  key={index}
                  src={url}
                  alt={`Photo Preview ${index + 1}`}
                  className="h-32 object-cover mt-2"
                />
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tags</label>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag"
            className="w-full border rounded-md p-2 mb-2"
          />
          <button
            type="button"
            onClick={addNewTag}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Tag
          </button>
          <div className="mt-2">
            {allTags.map((tag, index) => (
              <button
                key={index}
                type="button"
                className={`mr-2 mt-2 px-3 py-1 rounded-md ${tags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Submit News
        </button>
      </form>
    </div>
  );
};

export default NewsInput;
