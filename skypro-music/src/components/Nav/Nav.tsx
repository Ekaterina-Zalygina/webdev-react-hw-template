"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useEffect, useState } from "react";
import { LogIn, loginUser, LogoutState } from "@/store/features/authSlice";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getTokens } from "@/API/trackAPI";
import { useRouter } from "next/navigation";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const clickSite = () => {
    setIsOpen(!isOpen);
  };

  const isAuth = useAppSelector((store) => store.auth.user);
  const router = useRouter();

  useEffect(() => {
    const tokens = getTokens();
    if (!tokens.access) return;

    dispatch(
      LogIn({ email: "", id: 1, first_name: "", last_name: "", username: "" })
    );
  }, []);

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
              <Link href="/main" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/favorites" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              {!isAuth ? (
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              ) : (
                <div
                  className={styles.menuLink}
                  onClick={() => {
                    localStorage.clear();
                    dispatch(LogoutState());
                    router.push("/signin");
                  }}>
                  Выйти
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
