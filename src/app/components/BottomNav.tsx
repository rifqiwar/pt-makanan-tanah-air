// components/BottomNav.tsx
import React, { useState } from "react";
import styles from "./BottomNav.module.css";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoTimeOutline,
  IoPersonOutline,
} from "react-icons/io5"; // Gunakan react-icons
import Link from "next/link";

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.bottomNav}>
      <Link href="/" passHref>
        <div
          className={`${styles.navItem} ${
            activeTab === "Home" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Home")}
        >
          <IoHomeOutline className={styles.navIcon} />
          <span>Home</span>
        </div>
      </Link>
      <Link href="/pages/main/product" passHref>
        <div
          className={`${styles.navItem} ${
            activeTab === "Paket" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Paket")}
        >
          <IoSearchOutline className={styles.navIcon} />
          <span>Paket</span>
        </div>
      </Link>
      <Link href="/pages/main/testimoni" passHref>
        <div
          className={`${styles.navItem} ${
            activeTab === "Testimoni" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Testimoni")}
        >
          <IoTimeOutline className={styles.navIcon} />
          <span>Testimoni</span>
        </div>
      </Link>
      <div
        className={`${styles.navItem} ${
          activeTab === "Reverensi" ? styles.active : ""
        }`}
        onClick={() => handleTabClick("Reverensi")}
      >
        <IoPersonOutline className={styles.navIcon} />
        <span>Reverensi</span>
      </div>
    </div>
  );
};

export default BottomNav;
