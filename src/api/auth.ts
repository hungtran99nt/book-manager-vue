import type { User } from './user';

export interface ILoginResponse {
  token?: string;
  username?: string;
}
export interface ILogin {
  username: string;
  password: string;
}

export interface IRegisterUser extends User {
  password: string;
  confirmPassword: string;
}
