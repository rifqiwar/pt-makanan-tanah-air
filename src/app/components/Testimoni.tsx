"use client";
import Card from '@/app/components/Card';
import Modal from '@/app/components/ModalCard';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import Footer from '@/app/components/Footer';

interface Testimonial {
  name: string;
  photo: string;
  message: string;
  imageUrl: string;

}

const TestimoniCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Testimonial>({
    name: '',
    photo: '',
    message: '',
    imageUrl: '',
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Mengambil data dari Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => doc.data() as Testimonial);
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedCard(testimonial);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Testimony</h1>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            name={testimonial.name}
            message={testimonial.message}
            imageUrl={testimonial.imageUrl}
            photo={testimonial.photo}
            onClick={() => handleCardClick(testimonial)}
          />
        ))}
      </div>
      {showModal && (
        <Modal
          title={selectedCard.name}
          description={selectedCard.message}
          imageUrl={selectedCard.imageUrl}
          avatarUrl={selectedCard.photo}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TestimoniCard;
