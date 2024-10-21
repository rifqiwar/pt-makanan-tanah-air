// src/app/components/BottomNavBar.tsx
import React from 'react';
import styles from './BottomNavBar.module.css';

const BottomNavBar: React.FC = () => {
  return (
    <div className={styles.bottomNav}>
      <div className={styles.navItem}>
        <i className="ion-ios-home-outline" />
        <span>Home</span>
      </div>
      <div className={styles.navItem}>
        <i className="ion-ios-heart-outline" />
        <span>Favorites</span>
      </div>
      <div className={styles.navItem}>
        <i className="ion-ios-cart-outline" />
        <span>Cart</span>
      </div>
      <div className={styles.navItem}>
        <i className="ion-ios-person-outline" />
        <span>Profile</span>
      </div>
      <div className={styles.navItem}>
        <i className="ion-ios-search-outline" />
        <span>Search</span>
      </div>
    </div>
  );
};

export default BottomNavBar;
