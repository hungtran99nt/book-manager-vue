import type { Dayjs } from 'dayjs';

type IUserType = 'Admin';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  type?: IUserType;
  gender?: string;
  dob?: Dayjs;
}

export interface IRegisterUser extends User {
  password: string;
  confirmPassword: string;
}
