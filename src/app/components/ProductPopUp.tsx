import React from "react";
import styles from "./ProductPopup.module.css";

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    description: string;
    price: string;
    image: string;
    brand: string;
    composition: string;
    date: string;
    deliveryTime: string;
  } | null;
}
const ProductPopup: React.FC<ProductPopupProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <img src={item.image} alt={item.name} className={styles.productImage} />
        <div className={styles.productDetails}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <div>
            <strong>Brand: </strong>
            {item.brand}
          </div>
          <div className={styles.dateInfo}>
            <strong>Date: </strong>
            {item.date}
            <br />
            <strong>Delivery: </strong>
            {item.deliveryTime}
          </div>
          <h4>Story</h4>
          <p>{item.description}</p>
          <h4>Composition</h4>
          <p>{item.composition}</p>
        </div>
        <button className={styles.orderButton}>Pesan</button>
      </div>
    </div>
  );
};

export default ProductPopup;
