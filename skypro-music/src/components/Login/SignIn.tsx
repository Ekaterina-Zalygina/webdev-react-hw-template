"use client";

import { loginUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { FormEvent } from "react";

export const PageLogin = () => {
  const dispatch = useAppDispatch();

  const handleSignIn = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({
          email: "test@test.ru",
          password: "test",
        })
      );
      console.log("Успешно!");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <html lang="en">
      <head>
        {/* <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../css/signin.css" /> */}
        <title>Skypro</title>
      </head>
      <body>
        <div className="wrapper">
          <div className="container-enter">
            <div className="modal__block">
              <form className="modal__form-login" action="#">
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
                  className="modal__input password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                />
                <button className="modal__btn-enter">
                  <a href="../index.html">Войти</a>
                </button>
                <button className="modal__btn-signup">
                  <a href="signup.html">Зарегистрироваться</a>
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
