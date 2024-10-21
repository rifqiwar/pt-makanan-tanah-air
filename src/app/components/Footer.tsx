// src/app/components/Footer.tsx
import React from "react";
import styles from "./Footer.module.css"; // Pastikan untuk membuat file CSS Module ini

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} padanganda.com. All rights reserved.
      </p>
      <div className={styles.socials}>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
