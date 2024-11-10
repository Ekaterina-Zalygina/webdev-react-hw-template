export type RegisterType = {
  email: string;
  password: string;
  username: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type UserType = {
    username: string,
    email: string,
    _id: number,
}

export type TokenType = {
    refresh: string,
    access: string
}