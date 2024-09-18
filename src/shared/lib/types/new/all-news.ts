export type GetAllNewsParams = {
  page: number;
  size: number;
};

export type NewsSort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type NewsPageable = {
  pageNumber: number;
  pageSize: number;
  sort: NewsSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type DepartmentIds = {
  id: number;
};

export type New = {
  date: any;
  id: number;
  createdAt: string;
  createdBy: number;
  title: string;
  type: string;
  content: string;
  departmentIds: DepartmentIds[];
};

export type NewResponse = {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  pageable: NewsPageable;
  size: number;
  content: New[];
  number: number;
  sort: NewsSort;
  numberOfElements: number;
  empty: boolean;
};
