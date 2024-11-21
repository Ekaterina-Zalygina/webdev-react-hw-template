import { PageLogin } from "./SignIn";

describe("Авторизация", () => {
  it("Проверка процесса авторизации", () => {
    expect(PageLogin("Войти")).toBe("Выход");
  });
});
