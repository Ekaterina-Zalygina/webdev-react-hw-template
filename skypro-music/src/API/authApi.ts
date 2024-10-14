//регистрация пользователя
const url = "https://webdev-music-003b5b991590.herokuapp.com";


export type regUserType = {
  email: string;
  password: string;
};

export const RegisterUser = async ({ email, password }: regUserType) => {
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

export const LoginUser = async ({ email, password }: regUserType) => {
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

