"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/firebase/firebaseConfig";
import styles from "./Footer.module.css";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
}

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const fetchSocialLinks = async () => {
    try {
      const snapshot = await getDocs(collection(db, "footers"));
      const links: SocialLink[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SocialLink[];

      console.log("Social Links:", links); // Debug log
      setSocialLinks(links);
    } catch (error) {
      console.error("Error fetching social links:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching social links..."); // Debug log
    fetchSocialLinks();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="flex justify-center space-x-4">
        {/* {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {link.name}
          </a>
        ))} */}
        {socialLinks.map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.id}
            className="flex flex-col items-center justify-center" // Updated to stack items vertically
          >
            <img
              src={link.imageUrl || "https://flowbite.com/docs/images/logo.svg"}
              className="h-10 mb-2" // Added margin-bottom for spacing
              alt="Logo"
            />
            <span>{link.name}</span> {/* Text will appear below the image */}
          </a>
        ))}
      </div>
      <br />
      <p className="text-center mb-4">
        &copy; {new Date().getFullYear()} padanganda.com. All rights reserved.
        <br />
        Jl Pakem - Kalasan, Pakem, Sleman, Yogyakarta WA 081283841343
      </p>
    </footer>
  );
};

export default Footer;
