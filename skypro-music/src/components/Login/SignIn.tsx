"use client"

import { loginUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { FormEvent } from "react";

export const PageLogin = () => {

  const dispatch = useAppDispatch();

  const handleSignIn = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await dispatch(loginUser({ 
        email: "test@test.ru", 
        password: "test"
    }));
      console.log("Успешно!");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

    return (
      <form className="container">
        <svg className="Logo">
          <use xlinkHref="img/logo_modal.svg#icon-note"></use>
        </svg>
  
        <div className="Registration">
          <p className="email">Почта</p>
          <p className="email">Пароль</p>
        </div>
  
        <div className="log_in">
          <button className="login" onSubmit={handleSignIn}>Войти</button>
        </div>
  
        <div className="sign_up">
          <button className="signup">Зарегистрироваться</button>
        </div>
      </form>
    );
  };