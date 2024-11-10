// "use client";

// import { loginUser } from "@/store/features/authSlice";
// import { useAppDispatch } from "@/store/store";
// import Image from "next/image";
// import { FormEvent } from "react";

// export const PageLogin = () => {
//   const dispatch = useAppDispatch();

//   const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         loginUser({
//           email: "",
//           password: "",
//         })
//       );
//       console.log("Успешно!");
//     } catch (error) {
//       if (error instanceof Error) console.error(error.message);
//     }
//   };

//   return (
//         <div className="wrapper">
//           <div className="container-enter">
//             <div className="modal__block">
//               <form className="modal__form-login" action="#" onSubmit={handleSignIn}>
//                 <a href="../">
//                   <div className="modal__logo">
//                     <Image src="/img/logo_modal.png" width={140} height={21} alt="logo" />
//                   </div>
//                 </a>
//                 <input
//                   className="modal__input login"
//                   type="text"
//                   name="login"
//                   placeholder="Почта"
//                 />
//                 <input
//                   className="modal__input password"
//                   type="password"
//                   name="password"
//                   placeholder="Пароль"
//                 />
//                 <button className="modal__btn-enter">
//                   <a href="/main">Войти</a>
//                 </button>
//                 <button className="modal__btn-signup">
//                   <a href="/signup">Зарегистрироваться</a>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//   );
// };

"use client";

import { loginUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEvent, useState } from "react";

export const PageLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap(); 
      console.log("Успешно!");
      router.push("/main"); 
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="container-enter">
        <div className="modal__block">
          <form className="modal__form-login" onSubmit={handleSignIn}>
            <div className="modal__logo">
              <Image
                src="/img/logo_modal.png"
                width={140}
                height={21}
                alt="logo"
              />
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
            <button
              className="modal__btn-signup"
              type="button"
              onClick={() => router.push("/signup")}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
