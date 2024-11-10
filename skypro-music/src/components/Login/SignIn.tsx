"use client"

import { loginUser } from "@/store/features/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { getToken } from "@/API/authApi"

export const PageLogin = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [email, setEmail] = useState("test123q@mail.ru")
    const [password, setPassword] = useState("password123")

    const error = useAppSelector((state) => state.auth.error)

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(
                loginUser({
                    email,
                    password,
                })
            ).unwrap()

            const tokens = await getToken({ email, password })
            localStorage.setItem("token", JSON.stringify(tokens))

            console.log("Успешно!")
            router.push("/main")
        } catch (error) {
            if (error instanceof Error) console.error(error.message)
        }
    }

    return (
        <div className="wrapper">
            <div className="container-enter">
                <div className="modal__block">
                    <form className="modal__form-login" onSubmit={handleSignIn}>
                        <div className="modal__logo">
                            <Image src="/img/logo_modal.png" width={140} height={21} alt="logo" />
                        </div>
                        <input
                            className="modal__input login"
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="modal__input password"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="modal__btn-enter" type="submit">
                            Войти
                        </button>
                        <button className="modal__btn-signup" type="button" onClick={() => router.push("/signup")}>
                            Зарегистрироваться
                        </button>

                        <div>{error}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}
