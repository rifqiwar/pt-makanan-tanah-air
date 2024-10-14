"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import OrderPopup from "./OrderPopup";
import styles from "./MainLayout.module.css";

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  rating: number;
  reviews: number;
}

const MainLayout: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      image: "path-to-your-steak-image",
      name: "Nasi Ayam Goreng",
      price: 10000,
      quantity: 0,
      category: "Paket 10.000",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 2,
      image: "path-to-your-steak-image",
      name: "Nasi Ayam Balado",
      price: 10000,
      quantity: 0,
      category: "Paket 10.000",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 3,
      image: "path-to-your-steak-image",
      name: "Nasi Ayam Bakar",
      price: 10000,
      quantity: 0,
      category: "Paket 10.000",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 4,
      image: "path-to-your-steak-image",
      name: "Paket Nasi Lele",
      price: 13000,
      quantity: 0,
      category: "Paket 13.000",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 5,
      image: "path-to-your-steak-image",
      name: "Paket Nasi Telur",
      price: 13000,
      quantity: 0,
      category: "Paket 13.000",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 6,
      image: "path-to-your-steak-image",
      name: "Nasi Nila",
      price: 15000,
      quantity: 0,
      category: "Paket Nasi Ikan",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 7,
      image: "path-to-your-steak-image",
      name: "Nasi Kembung",
      price: 15000,
      quantity: 0,
      category: "Paket Nasi Ikan",
      rating: 4.1,
      reviews: 250,
    },
    {
      id: 8,
      image: "path-to-your-steak-image",
      name: "Nasi Tongkol",
      price: 15000,
      quantity: 0,
      category: "Paket Nasi Ikan",
      rating: 4.1,
      reviews: 250,
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
      {/* <main className={styles.menuList}>
        {filteredMenu.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <image> </image>
            <h3>{item.name}</h3>
            <p>Rp {item.price.toLocaleString()}</p>
            <div>
              <button onClick={() => handleQuantityChange(index, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(index, 1)}>+</button>
            </div>
          </div>
        ))}
      </main> */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {filteredMenu.map((item, index) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-2 flex justify-between items-center">
              <h3 className="font-bold">{item.name}</h3>
              {/* <button className="bg-green-500 text-white p-2 rounded-full">
                +
              </button>
              <button className="bg-green-500 text-white p-2 rounded-full">
                -
              </button> */}
              <div>
                <button
                  className="bg-green-500 text-white p-1 rounded-full"
                  onClick={() => handleQuantityChange(index, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-green-500 text-white p-1 rounded-full"
                  onClick={() => handleQuantityChange(index, 1)}
                >
                  +
                </button>
              </div>
            </div>

            <p>Rp {item.price.toLocaleString()}</p>
            <div className="flex items-center text-sm mt-1">
              <span>{item.rating}</span>
              <span className="ml-2 text-yellow-400">★</span>
              <span className="ml-1 text-gray-500">({item.reviews})</span>
            </div>
          </div>
        ))}
      </div>

      {orderDetails.length > 0 && (
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
