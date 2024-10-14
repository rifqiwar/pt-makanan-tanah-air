"use client";

import React, { useState } from "react";
import styles from "./OrderPopup.module.css";

interface OrderPopupProps {
  showPopup: boolean;
  onClose: () => void;
  orderDetails: { name: string; price: number; quantity: number }[];
  totalOrderPrice: number;
}

const OrderPopup: React.FC<OrderPopupProps> = ({
  showPopup,
  onClose,
  orderDetails,
  totalOrderPrice,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [location, setLocation] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const regionOptions = {
    Sleman: ["Pakem", "Cangkringan", "Turi", "Godean"],
    Bantul: ["Sedayu", "Imogiri"],
    Kota: ["Umbulharjo", "UGM"],
  };

  type LocationKeys =
    | "Pakem"
    | "Cangkringan"
    | "Turi"
    | "Godean"
    | "Sedayu"
    | "Imogiri"
    | "Umbulharjo"
    | "UGM";

  const locations: Record<LocationKeys, number> = {
    Pakem: 10000,
    Cangkringan: 10000,
    Turi: 10000,
    Godean: 10000,
    Sedayu: 10000,
    Imogiri: 10000,
    Umbulharjo: 10000,
    UGM: 10000,
  };

  // Now you can safely index with a string that is of type LocationKeys
  const key: LocationKeys = "Pakem"; // or any other key
  const value = locations[key];

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    // setDeliveryFee(deliveryFee [district] || 0);
  };

  const calculateTotalPayment = () => {
    let total = totalOrderPrice + deliveryFee;
    if (totalOrderPrice > 100000) total -= deliveryFee; // Free delivery if total > 100000
    return total;
  };

  const handleSubmit = () => {
    const message = `Thank you for shopping with us!\nOrder from Pentolkoe Pusat, Pakem\n\nNama Pemesan: ${customerName}\nProduk:\n${orderDetails
      .map(
        (item) =>
          `${item.quantity}x ${item.name} @Rp ${item.price.toLocaleString()}`
      )
      .join(
        "\n"
      )}\n\nTotal Harga Barang: Rp ${totalOrderPrice.toLocaleString()}\nOngkos Kirim: Rp ${deliveryFee.toLocaleString()}\nTotal yang harus dibayar: Rp ${calculateTotalPayment().toLocaleString()}\n\nPembayaran: ${paymentMethod}\nAlamat Pengiriman: ${selectedRegion}, ${selectedDistrict}, ${location}\n\nHarap mengirimkan foto bukti transfer kepada kami. Thank you so much, have a blissful day!`;
    window.open(
      `https://wa.me/6281283841343?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (!showPopup) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Order Details</h2>
        <p>
          Pesanan:{" "}
          {orderDetails
            .map((item) => `${item.quantity}x ${item.name}`)
            .join(", ")}
        </p>
        <p>Total: Rp {totalOrderPrice.toLocaleString()}</p>
        <input
          type="text"
          placeholder="Nama Pemesan"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <select onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="">Pilih Kabupaten</option>
          {Object.keys(regionOptions).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {selectedRegion && (
          <select onChange={(e) => handleDistrictChange(e.target.value)}>
            <option value="">Pilih Kecamatan</option>
            {/* {regionOptions[selectedRegion].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))} */}
          </select>
        )}
        <textarea
          placeholder="Detail Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <p>Ongkos Kirim: Rp {deliveryFee.toLocaleString()}</p>
        <select onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">Pilih Pembayaran</option>
          <option value="Cash/COD">Cash/COD</option>
          <option value="Transfer">Transfer</option>
          <option value="QRIS">QRIS</option>
        </select>
        <p>Total Pembayaran: Rp {calculateTotalPayment().toLocaleString()}</p>
        <button className="bg-yellow-500 text-white p-2 rounded-full" onClick={handleSubmit}>Bayar</button>
        <button className=" text-black p-2 rounded-full" onClick={onClose}>
          Close
        </button>
        {/* <button className={styles.closeButton} onClick={onClose}>
          X
        </button> */}
      </div>
    </div>
  );
};

export default OrderPopup;
