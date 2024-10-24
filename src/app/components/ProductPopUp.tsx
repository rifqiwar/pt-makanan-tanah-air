import React, { useState } from "react";
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
    quantity: number; // added quantity to manage item quantity
  } | null;
}

const ProductPopup: React.FC<ProductPopupProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash/COD");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !item) return null;

  // Get today's date for validation
  const today = new Date().toISOString().split("T")[0];

  // Calculate total price based on quantity
  const totalPrice = Number(item.price.replace(/\D/g, "")) * quantity;

  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta)); // Ensure at least 1 item
  };

  // Handle form validation and the "Pesan" button click
  const handleOrder = () => {
    if (!customerName) {
      setError("Nama pemesan harus diisi.");
      return;
    }

    if (quantity < 10) {
      const userConfirmed = window.confirm(
        "Pesanan kurang dari 10 pack akan dikenakan biaya ongkir order online. Apakah Anda ingin melanjutkan?"
      );
      if (!userConfirmed) {
        return;
      }
    }

    if (!paymentMethod) {
      setError("Pembayaran harus diisi.");
      return;
    }

    if (!deliveryDate) {
      setError("Tanggal harus diisi.");
      return;
    }

    if (deliveryDate < today) {
      setError("Tanggal pengiriman harus minimal hari ini.");
      return;
    }

    if (!deliveryLocation) {
      setError("Lokasi pengiriman harus diisi.");
      return;
    }

    setError(""); // Clear errors if validation passes

    const orderMessage = `
Thank you for shopping with us!
Order from Rumah Makan Anda, Pakem

Nama Pemesan: ${customerName}
Produk:
${quantity}x ${item.name} @Rp ${item.price}

Total Harga Barang: Rp ${totalPrice.toLocaleString()}
Ongkos Kirim: Rp ${quantity < 10 ? "Ditentukan" : "0"}
Total yang harus dibayar: Rp ${totalPrice.toLocaleString()}

Pembayaran: ${paymentMethod}
Alamat Pengiriman: ${deliveryLocation}

Harap mengirimkan foto bukti transfer kepada kami. Thank you so much, have a blissful day!`;

    // Encode message for WhatsApp URL
    const whatsappMessage = encodeURIComponent(orderMessage);
    const whatsappURL = `https://wa.me/6281283841343?text=${whatsappMessage}`;

    // Open WhatsApp with the generated message
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <img src={item.image} alt={item.name} className={styles.productImage} />
        <div className={styles.productDetailsContainer}>
          <div className={styles.productDetails}>
            <h2>
              <b> {item.name}</b>
            </h2>
            <p>Rp. {item.price}</p>
            <br />

            <hr />
            <br />
            <h4>
              {" "}
              <b>STORY </b>
            </h4>
            <p>{item.description}</p>
            <br />
            <hr />
            <h4>
              <b> KOMPOSISI </b>
            </h4>
            <p>{item.composition}</p>
            <br />
            <hr />
            <br />
          </div>

          {/* Input Fields */}
          <div className={styles.orderForm}>
            <label>Nama Pemesan:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={styles.input}
              required
            />

            {/* Quantity Counter */}
            <label>Jumlah:</label>
            <div className={styles.counter}>
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <label>Pembayaran:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={styles.input}
            >
              <option value="Cash/COD">Cash/COD</option>
              <option value="Transfer">Transfer</option>
            </select>

            <label>Tanggal:</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className={styles.input}
              min={today} // Ensure the date is at least today
            />

            <label>Lokasi Pengiriman:</label>
            <textarea
              // type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className={styles.input}
              required
            />
            <hr />

            {/* Display error message */}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        {/* Order Button */}
        <button className={styles.orderButton} onClick={handleOrder}>
          Pesan
        </button>
      </div>
    </div>
  );
};

export default ProductPopup;
