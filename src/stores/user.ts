import { defineStore } from 'pinia';

import { HTTP, HTTPS } from '@/utils/http/Axios';
import { Persistent, TOKEN_KEY, USER_INFO_KEY } from '@/utils/cache/persistent';

import type { User } from '@/api/user';
import type { LoginParams } from '@/api/auth';

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
  },
  actions: {
    setUserInfo(info: User | null) {
      this.userInfo = info;
      Persistent.setLocal(USER_INFO_KEY, info);
    },
    setToken(token: string | undefined) {
      this.token = token || '';
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    async login(params: LoginParams): Promise<User | null> {
      try {
        const { data } = await HTTP.get('/signin', { params: params });
        const { token, username } = data;

        this.setToken(token);

        if (!this.getToken) return null;

        const { data: userInfo } = await HTTPS.get(`/users/${username}`);

        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout() {
      this.setToken(undefined);
      this.setUserInfo(null);
      Persistent.clearLocal();
    },
  },
});
