// src/app/update-product.tsx
import UpdateProductForm from "@/app/components/UpdateProductForm";
import React from "react";

const UpdateProductPage: React.FC = () => {
  return (
    <div>
      <h1>Update Product</h1>
      <UpdateProductForm productId={""} />
    </div>
  );
};

export default UpdateProductPage;
