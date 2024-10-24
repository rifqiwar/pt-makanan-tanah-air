// src/app/components/ProductHome.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/firebase/firestore";
import styles from "./MainLayout.module.css";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import ProductPopup from "./ProductPopUp";
import OrderPopup from "./OrderPopup";
import BottomNav from "./BottomNav";
import { db } from "@/firebase/firebaseConfig";

const ProductHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderDetails, setOrderDetails] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);

  const loadCheapestProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        orderBy("price", "asc"),
        limit(4)
      );
      const querySnapshot = await getDocs(q);
      const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadCheapestProducts();
  }, []);

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsPopupOpen(false);
  };

  const calculateTotal = () => {
    return orderDetails.reduce(
      (total, item) => total + item.price * (item.quantity ?? 0),
      0
    );
  };

  const handleQuantityChange = (index: number, amount: number) => {
    const newProducts = [...products];
    const updatedProduct = { ...newProducts[index] };

    // Update quantity, ensuring it's at least 10
    updatedProduct.quantity = (updatedProduct.quantity ?? 0) + amount;
    if (updatedProduct.quantity < 10) {
      updatedProduct.quantity = 10;
    }

    newProducts[index] = updatedProduct;
    setProductQuantities(newProducts);

    // Update order details
    const updatedOrderDetails = newProducts.filter(
      (product) => product.quantity! >= 10
    );
    setOrderDetails(updatedOrderDetails);
  };

  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>
        <h1>Selamat Datang di Menu Rumah Makan Anda</h1>
      </header>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-md"
              onClick={() => openPopup(product)}
            />

            <div className="mt-2 flex justify-between items-center">
              <h3 className="font-bold">{product.name}</h3>
            </div>
            <p>Rp {product.price.toLocaleString()}</p>
            <div className="flex items-center text-sm mt-1">
              <span>{product.rating}</span>
              <span className="ml-2 text-yellow-400">★</span>
              <span className="ml-1 text-gray-500">({product.reviews})</span>
            </div>
            <div></div>
          </div>
        ))}
        <ProductPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          item={
            selectedProduct
              ? {
                  ...selectedProduct,
                  name: selectedProduct.name ?? "",
                  description: selectedProduct.description ?? "",
                  price: selectedProduct.price?.toString() ?? "",
                  image: selectedProduct.image ?? "",
                  brand: selectedProduct.brand ?? "",
                  composition: selectedProduct.composition ?? "",
                  date: selectedProduct.date ?? "",
                  deliveryTime: selectedProduct.deliveryTime ?? "",
                  quantity: selectedProduct.quantity ?? 0,
                }
              : null
          }
        />
        {orderDetails.length > 0 && (
          <div className={styles.orderSummary}>
            <p>
              Pesanan:{" "}
              {orderDetails
                .map((item) => `${item.quantity}x ${item.name}`)
                .join(", ")}
            </p>
            <p>Total Pemesanan: Rp {calculateTotal().toLocaleString()}</p>
          </div>
        )}
      </div>
      <OrderPopup
        showPopup={showPopup}
        onClose={togglePopup}
        orderDetails={orderDetails}
        totalOrderPrice={calculateTotal()}
      />
    </div>
  );
};

export default ProductHome;

function setProductQuantities(newProducts: Product[]) {
  // Implementasi fungsi ini tergantung pada logika aplikasi Anda.
  // Anda dapat menyimpan state kuantitas produk sesuai kebutuhan.
}
