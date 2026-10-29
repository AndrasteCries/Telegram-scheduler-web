export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  id: number;
};

export type RegisterRequest = {
  login: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  login: string;
};
