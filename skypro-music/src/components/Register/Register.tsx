"use client";

// import { RegisterUser, regUserType } from "@/API/authApi";
import { registrationUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { Router, useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

export const RegUserName = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (userData.email.trim()) {
      setError("Введите почту");
      return;
    }

    if (userData.password.trim()) {
      setError("Введите пароль");
      return;
    }

    if (userData.username.trim()) {
      setError("Введите пароль");
      return;
    }

  };

  return (
    <div className="wrapper">
      <div className="container-signup">
        <div className="modal__block">
          <form onSubmit={handleSignUp} className="modal__form-login">
            <a href="../">
              <div className="modal__logo">
                <img src="../img/logo_modal.png" alt="logo" />
              </div>
            </a>
            <input
              className="modal__input login"
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              className="modal__input password-first"
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <input
              className="modal__input password-double"
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <button className="modal__btn-signup-ent">
              <a href="/signup">Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
