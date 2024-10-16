"use client";

import { RegisterUser, regUserType } from "@/API/authApi";
import { registrationUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { FormEvent } from "react";

export const RegUserName = () => {
  const dispatch = useAppDispatch();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        registrationUser({
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
        <link rel="stylesheet" href="../css/signup.css" /> */}
        <title>Skypro</title>
      </head>

      <body>
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
                  <a href="../index.html">Зарегистрироваться</a>
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
