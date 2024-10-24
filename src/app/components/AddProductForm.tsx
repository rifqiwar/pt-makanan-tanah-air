"use client";
import React, { useState, useEffect } from "react";
// import { db, storage } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  brand: string;
  composition: string;
  tags: string[];
}

interface AddProductFormProps {
  onClose: () => void;
  onProductAdded: () => void;
  productToEdit?: Product | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  onClose,
  onProductAdded,
  productToEdit,
}) => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    image: "",
    quantity: 0,
    category: "",
    rating: 0,
    reviews: 0,
    description: "",
    brand: "",
    composition: "",
    tags: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  // Define the fetchTags function before using it
  const fetchTags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagList = querySnapshot.docs.map((doc) => doc.data().name); // Assuming the tag data has a 'name' field
      setSuggestedTags(tagList);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchTags(); // Call fetchTags after it is defined
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const addTag = (tag: string) => {
    if (!product.tags.includes(tag)) {
      // Prevent duplicates
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...prevProduct.tags, tag],
      }));
    }
    setTagInput(""); // Clear the input after adding the tag
  };

  const removeTag = (index: number) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags: prevProduct.tags.filter((_, i) => i !== index),
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    const input = e.target.value.toLowerCase();
    if (input) {
      // Filter suggested tags based on user input
      const filteredTags = suggestedTags.filter((tag) =>
        tag.toLowerCase().includes(input)
      );
      setSuggestedTags(filteredTags);
    } else {
      // Reset suggested tags when input is empty
      fetchTags();
    }
  };

  const selectTag = (tag: string) => {
    addTag(tag);
    setSuggestedTags([]); // Clear suggestions after selecting a tag
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.description ||
      !product.rating ||
      !product.composition ||
      !imageFile
    ) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      if (imageFile) {
        const storageRef = ref(storage, `products/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              console.error("Error uploading file:", error);
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      if (productToEdit) {
        const productRef = doc(db, "products", productToEdit.id!);
        await updateDoc(productRef, {
          ...product,
          price: Number(product.price),
          quantity: Number(product.quantity),
          rating: Number(product.rating),
          reviews: 0,
          image: imageUrl || productToEdit.image,
        });
      } else {
        await addDoc(collection(db, "products"), {
          ...product,
          price: Number(product.price),
          quantity: Number(product.quantity),
          rating: Number(product.rating),
          reviews: 0,
          image: imageUrl,
        });
      }

      setMessage("Product saved successfully!");
      setProduct({
        name: "",
        price: 0,
        image: "",
        quantity: 0,
        category: "",
        rating: 0,
        reviews: 0,
        description: "",
        brand: "",
        composition: "",
        tags: [],
      });
      setImageFile(null);
      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {productToEdit ? "Edit Product" : "Add New Product"}
        </h2>
        {message && (
          <div
            className={`mb-4 p-2 text-white rounded ${
              message.includes("successfully") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Other input fields here */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Komposisi</label>
            <textarea
              name="composition"
              value={product.composition}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1"
              required={!productToEdit} // Make required only when adding a new product
            />
          </div>
          <div>
            <label className="block text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => removeTag(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Press Enter to add a tag"
            />
            {tagInput && (
              <div className="mt-2 bg-white border rounded p-2">
                {suggestedTags.map((tag) => (
                  <div
                    key={tag}
                    className="cursor-pointer hover:bg-gray-200 p-1"
                    onClick={() => selectTag(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : productToEdit
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
