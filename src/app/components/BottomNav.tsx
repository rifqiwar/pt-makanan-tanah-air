// components/BottomNav.tsx
import React, { useState } from "react";
import styles from "./BottomNav.module.css";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoTimeOutline,
  IoPersonOutline,
} from "react-icons/io5"; // Gunakan react-icons

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.bottomNav}>
      <div
        className={`${styles.navItem} ${
          activeTab === "Home" ? styles.active : ""
        }`}
        onClick={() => handleTabClick("Home")}
      >
        <IoHomeOutline className={styles.navIcon} />
        <span>Nasi Kotak</span>
      </div>
      <div
        className={`${styles.navItem} ${
          activeTab === "Search" ? styles.active : ""
        }`}
        onClick={() => handleTabClick("Search")}
      >
        <IoSearchOutline className={styles.navIcon} />
        <span>Paket</span>
      </div>
      <div
        className={`${styles.navItem} ${
          activeTab === "History" ? styles.active : ""
        }`}
        onClick={() => handleTabClick("History")}
      >
        <IoTimeOutline className={styles.navIcon} />
        <span>Pemesanan</span>
      </div>
      <div
        className={`${styles.navItem} ${
          activeTab === "Profile" ? styles.active : ""
        }`}
        onClick={() => handleTabClick("Profile")}
      >
        <IoPersonOutline className={styles.navIcon} />
        <span>Tentang Kami</span>
      </div>
    </div>
  );
};

export default BottomNav;
