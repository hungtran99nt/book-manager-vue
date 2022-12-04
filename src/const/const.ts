import type { ILoginState, IUserType } from './type';

export const BASE_API = 'http://localhost:8080';
export const API_NAMESPACE = '/api/v1';
export const FILE_API = '/file';
export const BOOK_API = '/file';
export const API_ENDPOINT = {
  UPLOAD: '/upload',
  DOWNLOAD: '/download',
  CREATE: '/create',
  EDIT: '/edit',
  DETAIL: '/detail',
};

export const LOGIN_STATE: Record<ILoginState, ILoginState> = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
};

export const USER_TYPE: Record<IUserType, IUserType> = {
  Admin: 'Admin',
};
