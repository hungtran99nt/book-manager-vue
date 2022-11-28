import { isString } from '@vue/shared';
import { useRouter, type RouteLocationRaw } from 'vue-router';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & {
  path: string;
  query?: Object;
};

const handleError = (error: Error) => {
  console.log(error);
};

export const useGo = () => {
  const { push } = useRouter();

  function go(opt: RouteLocationRawEx | string) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      push(o).catch(handleError);
    }
  }

  return go;
};
