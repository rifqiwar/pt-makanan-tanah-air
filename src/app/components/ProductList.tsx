// // src/app/components/ProductList.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { fetchProducts, Product } from "@/firebase/firestore";
// import SearchBar from "./SearchBar";
// import styles from "./MainLayout.module.css";
// // import { db } from "../firebase/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import ProductPopup from "./ProductPopUp";
// import OrderPopup from "./OrderPopup";
// import BottomNav from "./BottomNav";
// import { db } from "@/firebase/firebaseConfig";

// interface Category {
//   id: string;
//   name: string;
// }

// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [filteredMenu, setFilteredMenu] = useState<Product[]>([]);
//   const [orderDetails, setOrderDetails] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const togglePopup = () => setShowPopup(!showPopup);

//   const loadProducts = async () => {
//     try {
//       const fetchedProducts = await fetchProducts();
//       setProducts(fetchedProducts);
//       setFilteredMenu(fetchedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const loadCategories = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "categories"));
//       const categoryList: Category[] = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Category[];
//       setCategories([{ id: "all", name: "All" }, ...categoryList]);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//     loadCategories();
//   }, []);

//   useEffect(() => {
//     filterMenu();
//   }, [selectedCategory, products]);

//   const filterMenu = () => {
//     if (selectedCategory === "All") {
//       setFilteredMenu(products);
//     } else {
//       setFilteredMenu(
//         products.filter((item) => item.category === selectedCategory)
//       );
//     }
//   };

//   const handleSearch = (query: string) => {
//     setFilteredMenu(
//       products.filter((item) =>
//         item.name.toLowerCase().includes(query.toLowerCase())
//       )
//     );
//   };

//   const openPopup = (product: Product) => {
//     setSelectedProduct(product);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setSelectedProduct(null);
//     setIsPopupOpen(false);
//   };

//   const calculateTotal = () => {
//     return orderDetails.reduce(
//       (total, item) => total + item.price * (item.quantity ?? 0),
//       0
//     );
//   };
//   const handleQuantityChange = (index: number, amount: number) => {
//     const newProducts = [...products];
//     const updatedProduct = { ...newProducts[index] };

//     // Update kuantitas, tetapi pastikan tidak di bawah 10
//     updatedProduct.quantity = (updatedProduct.quantity ?? 0) + amount;

//     // Pastikan kuantitas minimal adalah 10
//     if (updatedProduct.quantity < 10) {
//       updatedProduct.quantity = 10;
//     }

//     newProducts[index] = updatedProduct;
//     setProductQuantities(newProducts);

//     // Update order details
//     const updatedOrderDetails = newProducts.filter(
//       (product) => product.quantity! >= 10
//     );
//     setOrderDetails(updatedOrderDetails);
//   };

//   return (
//     <div className={styles.mainLayout}>
//       <header className={styles.header}>
//         <h1>Selamat Datang di Menu Rumah Makan Anda</h1>
//         <SearchBar onSearch={handleSearch} />
//       </header>
//       <div className={styles.horizontalMenu}>
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setSelectedCategory(category.name)}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//       <div className="mt-4 grid grid-cols-2 gap-4">
//         {filteredMenu.map((product, index) => (
//           <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-32 object-cover rounded-md"
//               onClick={() => openPopup(product)}
//             />
//             <div className="mt-2 flex justify-between items-center">
//               <h3 className="font-bold">{product.name}</h3>
//             </div>
//             <p>Rp {product.price.toLocaleString()}</p>
//             <div className="flex items-center text-sm mt-1">
//               <span>{product.rating}</span>
//               <span className="ml-2 text-yellow-400">★</span>
//               <span className="ml-1 text-gray-500">({product.reviews})</span>
//             </div>
//             <div>
//             <div className={styles.counter}>
//               <button
//                 onClick={() => handleQuantityChange(index, -1)}
//                 // disabled={product.quantity <= 5} // Disable jika kurang dari 5
//               >
//                 -
//               </button>
//               <span>{product.quantity ?? 0}</span>
//               <button onClick={() => handleQuantityChange(index, 1)}>+</button>
//             </div>
//             </div>
//           </div>
//         ))}
//         <ProductPopup
//           isOpen={isPopupOpen}
//           onClose={closePopup}
//           item={
//             selectedProduct
//               ? {
//                   ...selectedProduct,
//                   name: selectedProduct.name ?? "",
//                   description: selectedProduct.description ?? "",
//                   price: selectedProduct.price?.toString() ?? "",
//                   image: selectedProduct.image ?? "",
//                   brand: selectedProduct.brand ?? "",
//                   composition: selectedProduct.composition ?? "",
//                   date: selectedProduct.date ?? "",
//                   deliveryTime: selectedProduct.deliveryTime ?? "",
//                 }
//               : null
//           }
//         />
//         {orderDetails.length > 0 && (
//           <div className={styles.orderSummary}>
//             <p>
//               Pesanan:{" "}
//               {orderDetails
//                 .map((item) => `${item.quantity}x ${item.name}`)
//                 .join(", ")}
//             </p>
//             <p>Total Pemesanan: Rp {calculateTotal().toLocaleString()}</p>
//           </div>
//         )}
//         <BottomNav />
//       </div>
//       <OrderPopup
//         showPopup={showPopup}
//         onClose={togglePopup}
//         orderDetails={orderDetails}
//         totalOrderPrice={calculateTotal()}
//       />
//     </div>
//   );
// };

// export default ProductList;
// function setProductQuantities(newProducts: Product[]) {
//   throw new Error("Function not implemented.");
// }

// src/app/components/ProductList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from "@/firebase/firestore";
import SearchBar from "./SearchBar";
import styles from "./MainLayout.module.css";
import { collection, getDocs } from "firebase/firestore";
import ProductPopup from "./ProductPopUp";
import OrderPopup from "./OrderPopup";
import BottomNav from "./BottomNav";
import { db } from "@/firebase/firebaseConfig";

interface Category {
  id: string;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredMenu, setFilteredMenu] = useState<Product[]>([]);
  const [orderDetails, setOrderDetails] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setFilteredMenu(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoryList: Category[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      setCategories([{ id: "all", name: "All" }, ...categoryList]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterMenu();
  }, [selectedCategory, products]);

  const filterMenu = () => {
    if (selectedCategory === "All") {
      setFilteredMenu(products);
    } else {
      setFilteredMenu(
        products.filter((item) => item.category === selectedCategory)
      );
    }
  };

  const handleSearch = (query: string) => {
    setFilteredMenu(
      products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

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
        <SearchBar onSearch={handleSearch} />
      </header>
      <div className={styles.horizontalMenu}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {filteredMenu.map((product, index) => (
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
            {/* <div>
              <div className={styles.counter}>
                <button onClick={() => handleQuantityChange(index, -1)}>
                  -
                </button>
                <span>{product.quantity ?? 0}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>
                  +
                </button>
              </div>
            </div> */}
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
        <BottomNav />
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

export default ProductList;

function setProductQuantities(newProducts: Product[]) {
  // Assuming this function sets the product quantities in the relevant state or context.
  // The implementation needs to be defined according to your application logic.
  // For now, we can leave this function empty or remove it.
}
