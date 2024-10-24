"use client";
import CateringPage from "@/app/components/CateringPage";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageSlider from "@/app/components/ImageSlider";
import InstaGrid from "@/app/components/instagram";
import ProductList from "@/app/components/ProductList";
import TestimonialSlider from "@/app/components/TestimonialSlider";
import React, { PureComponent } from "react";
import PromoBanner from "@/app/components/PromoBanner";
import ProductHome from "@/app/components/ProductHome";
import dummyCardData from "@/app/components/dummyData";
import BottomNav from "@/app/components/BottomNav";
import Accordion from "@/app/components/Accordion";
import Card from "@/app/components/Card";

const Halaman: React.FC = () => {
  const handleCardClick = (id: number) => {
    const clickedCard = dummyCardData.find((card) => card.id === id);
    if (clickedCard) {
      alert(`You clicked on: ${clickedCard.title}`);
    }
  };
  const accordionData = [
    {
      title: "What is Next.js?",
      content:
        "Next.js is a React framework for production that provides infrastructure and simple development features.",
    },
    {
      title: "What is Tailwind CSS?",
      content:
        "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90.",
    },
    {
      title: "How does the accordion work?",
      content:
        "The accordion uses React state to control which item is open. Tailwind CSS is used for styling and animations.",
    },
  ];

  return (
    <div>
      <Header />
      <ImageSlider />
      <CateringPage />
      <ProductHome />
      <InstaGrid />
      <TestimonialSlider />
      <br />

      {/* <CardList cards={dummyCardData} onCardClick={handleCardClick} /> */}
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <Accordion />
      </div>
      <Footer />
      <BottomNav />
      <br />
      <br />

      {/* <h1>Our Products</h1> */}
    </div>
  );
};

export default Halaman;
