"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useState } from "react";
import { LogoutState } from "@/store/features/authSlice";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const [isAuth, setIsAuth] = useState(false);

  console.log(isOpen);
  const clickSite = () => {
    setIsOpen(!isOpen);
  };

  // const isAuthReg = () => {
  //   setIsAuth(!isAuth);
  // };

  //перенести это на кнопку выйти
  const logout = () => {
    dispatch(LogoutState());
    //передать логаут на онклик
  };

  const isAuth = useAppSelector((strore) => strore.auth.user) 
  console.log(isAuth)

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
      <div className={styles.navBurger} onClick={clickSite}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      {isOpen && (
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
              {isAuth ? (
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              ) : (
                <Link href="/signin" className={styles.menuLink}>
                  Выйти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
