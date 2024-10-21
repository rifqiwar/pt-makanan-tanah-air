import CateringPage from '@/app/components/CateringPage';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import ImageSlider from '@/app/components/ImageSlider';
import InstaGrid from '@/app/components/instagram';
import ProductList from '@/app/components/ProductList';
import TestimonialSlider from '@/app/components/TestimonialSlider';
import React, { PureComponent } from 'react';

const Halaman: React.FC = () => {
    return (
      <div>
        <Header/>
        <br />
        <ImageSlider />
        <CateringPage/>
        <ProductList />
        <InstaGrid />
        <TestimonialSlider/>
      
        <Footer />
        <br /><br />

        {/* <h1>Our Products</h1> */}
      </div>
    );
  };
  
  export default Halaman;