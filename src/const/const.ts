import type { ILoginState, IUserType } from './type';

export const LOGIN_STATE: Record<ILoginState, ILoginState> = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
};

export const USER_TYPE: Record<IUserType, IUserType> = {
  Admin: 'Admin',
};
