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

export interface IFile {
  fileName: string;
  fileDownloadUri: string;
  fileType: string;
  size: number;
}
