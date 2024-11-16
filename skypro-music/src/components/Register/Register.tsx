"use client";

import { registrationUser } from "@/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./Register.module.css";
import classNames from "classnames";

export const RegUserName = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [username, setUserName] = useState("username123");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [email, setEmail] = useState("test123@mail.ru");
  const router = useRouter();
  const apiError = useAppSelector((state) => state.auth.error);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let message = "";

    if (!email.trim()) message = "Введите почту";
    if (!password.trim()) message = "Введите пароль";
    if (!username.trim()) message = "Введите логин";
    if (!confirmPassword.trim()) message = "Повторите пароль";
    if (confirmPassword !== password) message = "Пароли не совпадают";

    setError(message);
    if (message) return;

    try {
      await dispatch(
        registrationUser({
          email,
          password,
          username,
        })
      ).unwrap();
      console.log("Успешно!");
      router.push("/main");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form onSubmit={handleSignUp} className={styles.modalFormLogin}>
            <a href="../">
              <div className={styles.modalLogo}>
                <img src="../img/logo_modal.png" alt="logo" />
              </div>
            </a>
            <input
              className={classNames(styles.modalInput, styles.login)}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              placeholder="Почта"
            />
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              value={username}
              placeholder="Логин"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
            />
            <button className={styles.modalBtnSignupEnt}>
              Зарегистрироваться
            </button>

            <div>{apiError}</div>
            <div>{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
};
