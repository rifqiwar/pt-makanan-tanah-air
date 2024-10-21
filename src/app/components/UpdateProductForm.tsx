"use client"; // Mark this component as a client component

import { getProduct, updateProduct } from "@/firebase/products";
import { Product } from "@/types/Product";
import React, { useEffect, useState } from "react";

interface UpdateProductFormProps {
  productId: string; // The ID of the product to update
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [composition, setComposition] = useState("");
  const [date, setDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        if (productData) {
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          setImage(productData.image);
          setBrand(productData.brand);
          setComposition(productData.composition);
          setDate(productData.date);
          setDeliveryTime(productData.deliveryTime);
        }
      } catch (err) {
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      const updatedProduct: Product = {
        ...product,
        name,
        description,
        price: Number(price),
        image,
        brand,
        composition,
        date,
        deliveryTime,
      };

      try {
        await updateProduct(updatedProduct); // Implement this function in your firebase/products.ts
        alert("Product updated successfully!");
      } catch (err) {
        setError("Failed to update product.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Product</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <label>
        Brand:
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </label>
      <label>
        Composition:
        <input
          type="text"
          value={composition}
          onChange={(e) => setComposition(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Delivery Time:
        <input
          type="text"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
      </label>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProductForm;
