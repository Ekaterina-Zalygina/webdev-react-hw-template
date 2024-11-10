"use client"

import Image from "next/image"
import styles from "./Nav.module.css"
import React, { useEffect, useState } from "react"
import { LogoutState } from "@/store/features/authSlice"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { getTokens } from "@/API/trackAPI"

export const Nav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const clickSite = () => {
        setIsOpen(!isOpen)
    }

    const isAuth = useAppSelector((store) => store.auth.user)

    return (
        <nav className={styles.mainNav}>
            <div className={styles.navLogo}>
                <Image className={styles.logoImage} src="/img/logo.png" alt="logo" width={250} height={170} />
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
                                <Link
                                    href="/signin"
                                    className={styles.menuLink}
                                    onClick={() => {
                                        dispatch(LogoutState())
                                    }}
                                >
                                    Выйти
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}
