import { useGo } from '../web/usePage';

export const useRedirectBook = () => {
  const go = useGo();

  const goCreateBook = () => {
    go('/book/create');
  };

  const goViewBook = (id?: number) => {
    go(`/book/${id}`);
  };

  const goListBook = () => {
    go('/book');
  };

  return {
    goCreateBook,
    goViewBook,
    goListBook,
  };
};
