import { useGo } from '../web/usePage';

export const useRedirectBook = () => {
  const go = useGo();

  const goCreateBook = () => {
    go('/create');
  };

  return {
    goCreateBook,
  };
};
