// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AddProductForm from "@/app/components/AddProductForm";
// import AddProductForm from "@/app/components/AddProductForm";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity:number;
  rating:number;
  reviews:number;
  description:string;
  brand:string;
  composition:string;
  category: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State for selected product

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Management</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setSelectedProduct(null); // Clear the selected product when adding
          setShowModal(true);
        }}
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-500">{product.category}</p>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => handleEditProduct(product)} // Open form for editing
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <AddProductForm
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null); // Clear selected product on close
          }}
          onProductAdded={fetchProducts}
          productToEdit={selectedProduct} // Pass the selected product for editing
        />
      )}
    </div>
  );
};

export default ProductManagement;
