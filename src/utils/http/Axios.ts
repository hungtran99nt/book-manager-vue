import { processExpression } from '@vue/compiler-core';
import axios from 'axios';
import { Persistent, TOKEN_KEY } from '../cache/persistent';

export const HTTP = axios.create({
  baseURL: 'http://localhost:8080',
});

export const HTTPS = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    Authorization: `Bearer ${Persistent.getLocal(TOKEN_KEY)}`,
  },
});
