import { defineStore } from 'pinia';

import { HTTP, HTTPS } from '@/utils/http/Axios';
import { Persistent, TOKEN_KEY, USER_INFO_KEY } from '@/utils/cache/persistent';
import type { User } from '@/api/user';
import type { ILogin, ILoginResponse } from '@/api/auth';
import { USER_TYPE } from '@/const/const';
import { handleError } from '@/hooks/common/useForm';

interface UserState {
  userInfo: User | null;
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
  }),
  getters: {
    getUserInfo(): User {
      return this.userInfo || (Persistent.getLocal<User>(USER_INFO_KEY) as User);
    },
    getToken(): string {
      return this.token || (Persistent.getLocal<string>(TOKEN_KEY) as string);
    },
    isAuthorized(): boolean {
      if (this.getToken && this.getUserInfo && this.getUserInfo.type === USER_TYPE.Admin) {
        return true;
      }
      return false;
    },
  },
  actions: {
    setUserInfo(info: User | null) {
      this.userInfo = info;
      Persistent.setLocal(USER_INFO_KEY, info);
    },
    setToken(token: string | undefined) {
      this.token = token || '';
      Persistent.setLocal(TOKEN_KEY, token);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    async login(requestData: ILogin): Promise<User | null> {
      try {
        const { data } = await HTTP.post<ILoginResponse>('/signin', requestData);
        const { token, username } = data;

        this.setToken(token);

        if (!this.getToken) return null;

        const { data: userInfo } = await HTTPS.get<User>(`/users/${username}/detail`);
        this.setUserInfo(userInfo);

        return userInfo;
      } catch (error) {
        // eslint-disable-next-line
        return Promise.reject(handleError(error));
      }
    },
    logout() {
      this.setToken(undefined);
      this.setUserInfo(null);
      Persistent.clearLocal();
    },
  },
});

// Need to be used outside the setup
// export function useUserStoreWithOut() {
//   return useUserStore(store);
// }
