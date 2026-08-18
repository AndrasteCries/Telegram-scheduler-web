export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    login: string;
  };
};