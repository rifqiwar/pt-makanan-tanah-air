// src/firebase/firestore.ts
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

// Define the Product interface with all required properties
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Ensure this matches your Firestore data structure
  deliveryTime: string; // Add deliveryTime if this is part of your Firestore data
  quantity?: number; // Optional property if it's not always present
  category?: string;
  reviews?: any; // You can further define this type based on your data structure
  rating?: number;
  description?: string;
  brand?: string;
  composition?: string;
  date?: any; // Adjust this based on how you are storing dates
}

// Fetch products from Firestore
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList: Product[] = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
      image: doc.data().image, // Update to match your Firestore property
      deliveryTime: doc.data().deliveryTime || "", // Use a default if not present
      quantity: doc.data().quantity,
      category: doc.data().category,
      reviews: doc.data().reviews,
      rating: doc.data().rating,
      description: doc.data().description,
      brand: doc.data().brand,
      composition: doc.data().composition,
      date: doc.data().date,
    }));
    return productsList;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
