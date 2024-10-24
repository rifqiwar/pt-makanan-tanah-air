"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Utility from "./utility";
import { FaBars } from "react-icons/fa";

interface HeaderData {
  id: string;
  logo: string;
  text: string;
  ctaLink: string;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari koleksi "header" di Firestore
  const fetchHeaderData = async () => {
    try {
      const headerCollection = collection(db, "header");
      const headerSnapshot = await getDocs(headerCollection);
      const headerItems = headerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as HeaderData[];

      setHeaderData(headerItems);
    } catch (error) {
      console.error("Error fetching header data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <header className="bg-[#fdf5e6] flex items-center justify-between px-4 py-2">
        {/* Hamburger Icon */}
        <button className="text-3xl text-green-800 md:hidden">
          <FaBars />
        </button>

        {/* Logo and Text */}
        <div className="flex items-center space-x-2">
          {headerData.map((header) => (
            <img
              src={header.logo || "https://flowbite.com/docs/images/logo.svg"}
              className="h-10"
              alt="Logo"
            />
          ))}
          <div>
            <h1 className="text-2xl font-semibold text-green-900">
              Catering Anda
            </h1>
            <p className="text-sm text-gray-600">
              Lezat dan Sehat, Pilihan Tepat
            </p>
          </div>
        </div>

        {/* Placeholder for right-side content (optional) */}
        <div className="hidden md:block">
          {/* Add any other menu items or actions here */}
        </div>
      </header>
  );
};

export default Header;
