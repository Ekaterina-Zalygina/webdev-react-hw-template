import { LoginType, RegisterType } from "@/types/types";

//регистрация пользователя
const url = "https://webdev-music-003b5b991590.herokuapp.com";




export const register = async ({ email, password, username }: RegisterType) => {
  const response = await fetch(url + "/user/signup/", {
    method: "POST",
    body: JSON.stringify({ email, password, username: email }),
    headers: { "content-type": "application/json" },
  });
  const data = response.json()
  if(!response.ok) {
    throw new Error("Регистрация не получилась. Попробуйте еще раз")
  }
  return data
};

export const login = async ({ email, password }: LoginType) => {
    const response = await fetch(url + "user/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    const data = response.json()
    if(!response.ok) {
      throw new Error("Такого пользователя не существует")
    }
    return data
  };

