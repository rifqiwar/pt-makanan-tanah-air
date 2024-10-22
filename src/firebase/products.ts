// src/firebase/products.ts
import { db } from "./firebaseConfig"; // Ensure Firestore is properly configured
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Product } from "../types/Product";

export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  try {
    const productDoc = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDoc);

    if (productSnapshot.exists()) {
      // Cast to Product type while ensuring required fields
      return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
    } else {
      console.warn(`Product with ID ${productId} does not exist.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Re-throw error for further handling if needed
  }
};

export const updateProduct = async (product: Product): Promise<void> => {
  if (!product.id) {
    throw new Error("Product ID is required for updating.");
  }

  try {
    const productDoc = doc(db, "products", product.id);
    await updateDoc(productDoc, {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      brand: product.brand,
      composition: product.composition,
      date: product.date ?? null, // Handle optional fields
      deliveryTime: product.deliveryTime ?? null,
      tags: product.tags ?? [], // Update the tags field
    });
    console.log(`Product with ID ${product.id} was successfully updated.`);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw error after logging
  }
};
