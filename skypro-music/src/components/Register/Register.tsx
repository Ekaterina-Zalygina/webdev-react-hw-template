"use client"

import { RegisterUser, regUserType } from "@/API/authApi";
import { registrationUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { FormEvent } from "react";

export const RegUserName = () => {
  const dispatch = useAppDispatch();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await dispatch(registrationUser({ 
        email: "test@test.ru", 
        password: "test"
    }));
      console.log("Успешно!");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSignUp}>
      <svg className="Logo">
        <use xlinkHref="img/logo_modal.svg#icon-note"></use>
      </svg>

      <div className="Registration">
        <p className="email">Почта</p>
        <p className="email">Пароль</p>
        <p className="email">Повторите пароль</p>
      </div>

      <div className="sign_up">
        <button className="email">Зарегистрироваться</button>
      </div>
    </form>
  );
};
