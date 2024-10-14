"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import OrderPopup from "./OrderPopup";
import styles from "./MainLayout.module.css";
import ProductPopup from "./ProductPopUp";

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  brand: string;
  composition: string;
  deliveryTime: string;
  date: string;
}

const MainLayout: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      image:
        "https://dcostseafood.id/wp-content/uploads/2024/07/Nasi-ayam-goreng-kremes.jpg",
      name: "Nasi Ayam Goreng",
      price: 10000,
      quantity: 0,
      category: "Paket 10.000",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 2,
      image: "https://akcdn.detik.net.id/community/media/visual/2024/09/29/resep-ayam-balado-ala-rm-padang_43.jpeg?w=700&q=90",
      name: "Nasi Ayam Balado",
      price: 10000,
      quantity: 0,
      category: "Paket 10.000",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 3,
      image: "https://awsimages.detik.net.id/community/media/visual/2024/02/07/resep-ayam-bakar-jawa_43.jpeg?w=1200",
      name: "Nasi Ayam Bakar",
      price: 10000,
      quantity: 0,
      category: "Paket 10.000",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 4,
      image: "https://i0.wp.com/makanmana.net/wp-content/uploads/2015/03/paket-nasi-lele.jpg?w=600&ssl=1",
      name: "Paket Nasi Lele",
      price: 13000,
      quantity: 0,
      category: "Paket 13.000",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 5,
      image: "https://awsimages.detik.net.id/community/media/visual/2023/02/05/resep-nasi-goreng-telur_43.jpeg?w=1200",
      name: "Paket Nasi Telur",
      price: 13000,
      quantity: 0,
      category: "Paket 13.000",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 6,
      image: "https://aslimasako.com/storage/post/new-title-14082023-075149.jpg",
      name: "Nasi Nila",
      price: 15000,
      quantity: 0,
      category: "Paket Nasi Ikan",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 7,
      image: "https://akcdn.detik.net.id/visual/2021/03/20/ikan-kembung_169.jpeg?w=720&q=90",
      name: "Nasi Kembung",
      price: 15000,
      quantity: 0,
      category: "Paket Nasi Ikan",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
    {
      id: 8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbdw5F0YP2LUP-JBd2IkI0rCo83qN6DExXg&s",
      name: "Nasi Tongkol",
      price: 15000,
      quantity: 0,
      category: "Paket Nasi Ikan",
      rating: 4.1,
      reviews: 250,
      description: "Experience the flavors of Italy...",
      brand: "McRoni",
      composition: "Macaroni with arrabbiata sauce, meatball, croutons",
      date: "Rabu, 16 Okt 2024",
      deliveryTime: "09:00 - 12:30",
    },
  ]);

  const [filteredMenu, setFilteredMenu] = useState(menuItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState<MenuItem[]>([]);

  useEffect(() => {
    filterMenu();
  }, [selectedCategory]);

  const filterMenu = () => {
    if (selectedCategory === "All") {
      setFilteredMenu(menuItems);
    } else {
      setFilteredMenu(
        menuItems.filter((item) => item.category === selectedCategory)
      );
    }
  };

  const handleSearch = (query: string) => {
    setFilteredMenu(
      menuItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (product: any) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsPopupOpen(false);
  };

  const handleQuantityChange = (index: number, amount: number) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].quantity += amount;
    if (newMenuItems[index].quantity < 0) newMenuItems[index].quantity = 0;
    setMenuItems(newMenuItems);
    setFilteredMenu(newMenuItems);

    // Update order details
    const updatedOrderDetails = newMenuItems.filter(
      (item) => item.quantity > 0
    );
    setOrderDetails(updatedOrderDetails);
  };

  const calculateTotal = () => {
    return orderDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const handleClearOrder = () => {
    // Reload the page to clear order details
    window.location.reload();
  };
  

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>
        <h1>Selamat Datang di Menu Rumah Makan Anda</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <div className={styles.horizontalMenu}>
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Paket 10.000")}>
          Paket 10.000
        </button>
        <button onClick={() => setSelectedCategory("Paket 13.000")}>
          Paket 13.000
        </button>
        <button onClick={() => setSelectedCategory("Paket Nasi Ikan")}>
          Paket Nasi Ikan
        </button>
        {/* Add more categories as needed */}
      </div>
      <div className="mt-4  grid grid-cols-2 gap-4">
        {filteredMenu.map((item, index) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md"
              onClick={() => openPopup(item)}
            />
            <div className="mt-2 flex justify-between items-center">
              <h3 className="font-bold">{item.name}</h3>
            </div>

            <p>Rp {item.price.toLocaleString()}</p>
            <div className="flex items-center text-sm mt-1">
              <span>{item.rating}</span>
              <span className="ml-2 text-yellow-400">★</span>
              <span className="ml-1 text-gray-500">({item.reviews})</span>
            </div>
            <br />
            <hr />
            <br />
            {/* <div className="mt-2 flex justify-around items-center"> */}
            <div className={styles.counter}>
              <button onClick={() => handleQuantityChange(index, -1)}>-</button>

              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(index, 1)}>+</button>
            </div>
          </div>
        ))}
        <ProductPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          item={selectedProduct}
        />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* {orderDetails.length > 0 && (
        <div className={styles.orderSummary}>
          <p>
            Pesanan:{" "}
            {orderDetails
              .map((item) => `${item.quantity}x ${item.name}`)
              .join(", ")}
          </p>
          <p>Total Pemesanan: Rp {calculateTotal().toLocaleString()}</p>
          <button onClick={togglePopup}>Pesan</button>
        </div>
      )} */}
      {orderDetails.length > 0 && (
        <div className={styles.orderSummary}>
          <p>
            Pesanan:{" "}
            {orderDetails
              .map((item) => `${item.quantity}x ${item.name}`)
              .join(", ")}
          </p>
          <p>Total Pemesanan: Rp {calculateTotal().toLocaleString()}</p>
          <div className={styles.orderActions}>
            <button onClick={togglePopup}>Pesan</button>
            <button onClick={handleClearOrder} className={styles.clearButton}>
              Clear Order
            </button>
          </div>
        </div>
      )}

      <OrderPopup
        showPopup={showPopup}
        onClose={togglePopup}
        orderDetails={orderDetails}
        totalOrderPrice={calculateTotal()}
      />
    </div>
  );
};

export default MainLayout;
