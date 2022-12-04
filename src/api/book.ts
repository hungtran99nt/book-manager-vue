import type { Dayjs } from 'dayjs';

export interface IBook {
  title: string;
  author: string;
  publishOn: Dayjs;
  totalPage?: number;
  id?: number;
  description?: string;
  category?: string;
  imagePath?: string;
  image?: Blob;
}
