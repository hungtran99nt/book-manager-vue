type IUserType = 'Admin';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  type: IUserType;
  gender?: string;
  dob?: Date;
}
