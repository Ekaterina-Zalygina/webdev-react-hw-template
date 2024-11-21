import { RegUserName } from "./Register";

describe("Авторизация", () => {
  it("Проверка процесса регистрации", () => {
    expect(RegUserName("Зарегистрироваться")).toBe("Попробуйте еще раз");
  });
});
