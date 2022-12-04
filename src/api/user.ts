import type { IUserType } from '@/const/type';
import type { Dayjs } from 'dayjs';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  type?: IUserType;
  gender?: string;
  dob?: Dayjs;
}
