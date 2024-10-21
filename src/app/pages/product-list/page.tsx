// src/app/page.tsx
import React from "react";
import ProductList from "@/app/components/ProductList";

const ProductList2: React.FC = () => {
  return (
    <div>
      <h1>Our Products</h1>
      <ProductList />
    </div>
  );
};

export default ProductList2;
