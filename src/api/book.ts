export interface IBook {
  id: number;
  title: string;
  author: string;
  publishOn: Date;
  totalPage: number;
  category?: string;
  imagePath?: string;
}
