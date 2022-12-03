export interface ISearchListParams {
  page?: number;
  pageSize?: number;
  isFetchAll?: boolean;
}

export interface IPaging {
  size: number;
  totalElements: number;
  totalPages: number;
}
