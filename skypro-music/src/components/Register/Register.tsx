"use client"

import { registrationUser } from "@/store/features/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export const RegUserName = () => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string | null>(null)
    const [username, setUserName] = useState("username123")
    const [password, setPassword] = useState("password123")
    const [confirmPassword, setConfirmPassword] = useState("password123")
    const [email, setEmail] = useState("test123@mail.ru")
    const router = useRouter()
    const apiError = useAppSelector((state) => state.auth.error)

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let message = ""

        if (!email.trim()) message = "Введите почту"
        if (!password.trim()) message = "Введите пароль"
        if (!username.trim()) message = "Введите логин"
        if (!confirmPassword.trim()) message = "Повторите пароль"
        if (confirmPassword !== password) message = "Пароли не совпадают"

        setError(message)
        if (message) return

        try {
            await dispatch(
                registrationUser({
                    email,
                    password,
                    username,
                })
            ).unwrap()
            console.log("Успешно!")
            router.push("/main")
        } catch (error) {
            if (error instanceof Error) console.error(error.message)
        }
    }

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
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            value={email}
                            placeholder="Почта"
                        />
                        <input
                            className="modal__input login"
                            type="text"
                            value={username}
                            placeholder="Логин"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            className="modal__input password-first"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                        />
                        <input
                            className="modal__input password-double"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Повторите пароль"
                        />
                        <button className="modal__btn-signup-ent">Зарегистрироваться</button>

                        <div>{apiError}</div>
                        <div>{error}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}
