"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useState } from "react";


export const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const MenuSite = () => {
    setIsOpen(!isOpen)
  };

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="logo"
          width={250}
          height={170}
        />
      </div>
      <div className={styles.navBurger} onClick={MenuSite}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div className={styles.navMenu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Главное
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Мой плейлист
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="../signin.html" className={styles.menuLink}>
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
