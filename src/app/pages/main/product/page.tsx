// src/app/page.tsx
"use client"
import React from "react";
import ProductList from "@/app/components/ProductList";
import { IonIcon } from "react-ionicons";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Accordion from "@/app/components/Accordion";
import BottomNav from "@/app/components/BottomNav";
import WhatsAppButton from "@/app/components/WhasappButton";

const ProductPage: React.FC = () => {
  return (
    <div>
      <Header />
      <WhatsAppButton/>
      <ProductList />
      <Accordion />
      <Footer />
      <BottomNav/>
    </div>
  );
};

export default ProductPage;
