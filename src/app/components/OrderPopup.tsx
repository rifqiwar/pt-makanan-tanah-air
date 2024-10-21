"use client";

import React, { useState } from "react";
import styles from "./OrderPopup.module.css";

interface OrderPopupProps {
  showPopup: boolean;
  onClose: () => void;
  orderDetails: { name: string; price: number; quantity?: number }[];
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
  const [selectedPackaging, setSelectedPackaging] = useState("Bungkus");

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

  const packagingOptions: Record<string, number> = {
    Bungkus: 0,
    "Launch Box": 1000,
    "Kotak Besar": 3000,
    Bento: 1500,
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setDeliveryFee(locations[district as LocationKeys] || 0);
  };

  const calculatePackagingFee = () => {
    const totalItems = orderDetails.reduce((sum, product) => sum + (product.quantity || 0), 0);
    return packagingOptions[selectedPackaging] * totalItems;
  };

  const calculateTotalPayment = () => {
    let total = totalOrderPrice + deliveryFee + calculatePackagingFee();
    if (totalOrderPrice > 100000) total -= deliveryFee; // Free delivery if total > 100000
    return total;
  };

  const handleSubmit = () => {
    if (!customerName || !selectedRegion || !selectedDistrict || !location || !paymentMethod) {
      alert("Please fill in all the fields.");
      return;
    }

    const packagingFee = calculatePackagingFee();

    const message = `Thank you for shopping with us!\nOrder from Pentolkoe Pusat, Pakem\n\nNama Pemesan: ${customerName}\nProduk:\n${orderDetails
      .map(
        (product) =>
          `${product.quantity}x ${product.name} @Rp ${product.price.toLocaleString()}`
      )
      .join(
        "\n"
      )}\n\nTotal Harga Barang: Rp ${totalOrderPrice.toLocaleString()}\nOngkos Kirim: Rp ${deliveryFee.toLocaleString()}\nKemasan: ${orderDetails.reduce(
        (sum, product) => sum + (product.quantity || 0),
        0
      )}x ${selectedPackaging} @Rp ${packagingOptions[selectedPackaging].toLocaleString()}\nTotal yang harus dibayar: Rp ${calculateTotalPayment().toLocaleString()}\n\nPembayaran: ${paymentMethod}\nAlamat Pengiriman: ${selectedRegion}, ${selectedDistrict}, ${location}\n\nHarap mengirimkan foto bukti transfer kepada kami. Thank you so much, have a blissful day!`;

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
            .map((product) => `${product.quantity}x ${product.name}`)
            .join(", ")}
        </p>
        <p>Total: Rp {totalOrderPrice.toLocaleString()}</p>
        <input
          type="text"
          placeholder="Nama Pemesan"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <select onChange={(e) => setSelectedRegion(e.target.value)} required>
          <option value="">Pilih Kabupaten</option>
          {Object.keys(regionOptions).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {selectedRegion && (
          <select onChange={(e) => handleDistrictChange(e.target.value)} required>
            <option value="">Pilih Kecamatan</option>
            {regionOptions[selectedRegion as keyof typeof regionOptions].map(
              (district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              )
            )}
          </select>
        )}
        <textarea
          placeholder="Detail Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <p>Ongkos Kirim: Rp {deliveryFee.toLocaleString()}</p>
        <select onChange={(e) => setSelectedPackaging(e.target.value)} required>
          <option value="Bungkus">Bungkus (Free)</option>
          <option value="Launch Box">Launch Box (+Rp 1,000)</option>
          <option value="Kotak Besar">Kotak Besar (+Rp 3,000)</option>
          <option value="Bento">Bento (+Rp 1,500)</option>
        </select>
        <select onChange={(e) => setPaymentMethod(e.target.value)} required>
          <option value="">Pilih Pembayaran</option>
          <option value="Cash/COD">Cash/COD</option>
          <option value="Transfer">Transfer</option>
          <option value="QRIS">QRIS</option>
        </select>
        <p>Total Pembayaran: Rp {calculateTotalPayment().toLocaleString()}</p>
        <button
          className="bg-yellow-500 text-white p-2 rounded-full"
          onClick={handleSubmit}
        >
          Bayar
        </button>
        <button className="text-black p-2 rounded-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderPopup;
