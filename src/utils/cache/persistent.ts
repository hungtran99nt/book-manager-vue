import type { User } from '@/api/user';

export const TOKEN_KEY = 'TOKEN___';
export const USER_INFO_KEY = 'USER__INFO___';

interface Store {
  [TOKEN_KEY]: string | null | undefined;
  [USER_INFO_KEY]: User;
}

type LocalKeys = keyof Store;

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    const val = localStorage.getItem(key);
    if (!val) return null;
    return JSON.parse(val) as T | null;
  }

  static setLocal(key: LocalKeys, value: Store[LocalKeys]): void {
    const stringData = JSON.stringify({ value });
    localStorage.setItem(key, stringData);
  }

  static clearLocal(): void {
    localStorage.clear();
  }
}
