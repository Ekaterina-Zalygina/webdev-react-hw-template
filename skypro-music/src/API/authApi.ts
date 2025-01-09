import { LoginType, RegisterType } from "@/types/types";

const url = "https://webdev-music-003b5b991590.herokuapp.com";

export const register = async ({ email, password, username }: RegisterType) => {
  const response = await fetch(url + "/user/signup/", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const login = async ({ email, password }: LoginType) => {
  try {
    const response = await fetch(url + "/user/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Такого пользователя не существует");
    }
    return data as { username: string; email: string; _id: number };
  } catch (error) {
    throw error;
  }
};

export const getToken = async ({ email, password }: LoginType) => {
  try {
    return await fetch(url + "/user/token/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
