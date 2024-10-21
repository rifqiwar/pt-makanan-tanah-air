// src/firebase/products.ts
import { db } from "./firebaseConfig"; // Ensure you have configured Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Product } from "../types/Product";

export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  const productDoc = doc(db, "products", productId);
  const productSnapshot = await getDoc(productDoc);

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
  } else {
    return null;
  }
};

export const updateProduct = async (product: Product): Promise<void> => {
  const productDoc = doc(db, "products", product.id);
  await updateDoc(productDoc, {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    brand: product.brand,
    composition: product.composition,
    date: product.date,
    deliveryTime: product.deliveryTime,
  });
};
