// src/types/Product.ts
// export interface Product {
  // id: string; // Firestore document ID
  // name: string;
  // description: string;
  // price: number;
  // image: string;
  // brand: string;
  // composition: string;
  // date: string;
  // deliveryTime: string;

//   id: string;
//   image: string;
//   name: string;
//   price: number;
//   quantity: number;
//   category: string;
//   rating: number;
//   reviews: number;
//   description: string;
//   brand: string;
//   composition: string;
//   deliveryTime: string;
//   date: string;
// }
export interface Product {
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
  deliveryTime: string;
  date: string;
  tags:string[];
}
