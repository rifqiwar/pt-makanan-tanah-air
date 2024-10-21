// src/app/pages/fitur/page.tsx
"use client"; // This line makes this component a Client Component

import React from "react";
import ProductList from "@/app/components/ProductList"; // Ensure this is a client component too

const FiturPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white text-center p-6">
        <h1 className="text-4xl font-bold">Fitur Page</h1>
      </header>
      <section className="p-6">
        <h2 className="text-2xl font-semibold">Our Features</h2>
        <ProductList /> {/* This component should also be a client component */}
      </section>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2024 Your Company Name. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FiturPage;
