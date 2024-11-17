"use client";

import { loginUser } from "@/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { getToken } from "@/API/authApi";
import styles from "./SignIn.module.css";
import classNames from "classnames";

export const PageLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("test123q@mail.ru");
  const [password, setPassword] = useState("password123");

  const error = useAppSelector((state) => state.auth.error);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap();

      const tokens = await getToken({ email, password });
      localStorage.setItem("token", JSON.stringify(tokens));

      console.log("Успешно!");
      router.push("/main");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} onSubmit={handleSignIn}>
            <div className={styles.modalLogo}>
              <Image
                src="/img/logo_modal.png"
                width={140}
                height={21}
                alt="logo"
              />
            </div>
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="email"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className={styles.modalBtnEnter} type="submit">
              Войти
            </button>
            <button
              className={styles.modalBtnSignup}
              type="button"
              onClick={() => router.push("/signup")}>
              Зарегистрироваться
            </button>

            <div className={styles.error}>{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
};
