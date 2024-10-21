// src/app/page.tsx
import React from "react";
import ProductList from "@/app/components/ProductList";
import { IonIcon } from "react-ionicons";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Our Products</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;
