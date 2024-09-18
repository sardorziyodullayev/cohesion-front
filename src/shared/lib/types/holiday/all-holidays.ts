// export type GetAllHolidaysParams = {
//    page: number;
//    size: number;
//  };

//  export type HolidaysSort = {
//    sorted: boolean;
//    unsorted: boolean;
//    empty: boolean;
//  };

//  export type HolidaysPageable = {
//    pageNumber: number;
//    pageSize: number;
//    sort: HolidaysSort;
//    offset: number;
//    paged: boolean;
//    unpaged: boolean;
//  };

//  export type EmployeeId = {
//    id: number;
//  };

//  export type Holiday = {
//    date: any;
//    id: number;
//    createdAt: string;
//    createdBy: number;
//    title: string;
//    type: string;
//    content: string;
//    departmentIds: EmployeeId;
//  };

//  export type HolidayResponse = {
//    totalPages: number;
//    totalElements: number;
//    first: boolean;
//    last: boolean;
//    pageable: HolidaysPageable;
//    size: number;
//    content: Holiday[];
//    number: number;
//    sort: HolidaysSort;
//    numberOfElements: number;
//    empty: boolean;
//  };

export type GetAllHolidaysParams = {
  page: number;
  size: number;
};

// User type for each holiday
interface User {
  id: number;
  name: string;
  surname: string;
  photoUrl: string;
  position: string;
}

// Holiday content structure
interface Holiday {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  startDate: string;
  endDate: string;
  type: "VACATION" | "SICK_LEAVE" | "OTHER"; // assuming there are other types
  status: "PENDING" | "APPROVED" | "REJECTED"; // status options
  reason: string;
  approvalNote: string;
}

// Sort structure
interface HolidaysSort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

// Pageable structure
interface HolidaysPageable {
  offset: number;
  sort: HolidaysSort[];
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

// Main all-holidays response
interface HolidaysResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Holiday[];
  number: number;
  sort: HolidaysSort[];
  numberOfElements: number;
  pageable: HolidaysPageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}
