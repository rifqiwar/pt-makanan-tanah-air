// src/app/update-product.tsx
import React from "react";
import UpdateProductForm from "../../components/UpdateProductForm";

const UpdateProductPage: React.FC = () => {
  return (
    <div>
      <h1>Update Product</h1>
      <UpdateProductForm productId={""} />
    </div>
  );
};

export default UpdateProductPage;
