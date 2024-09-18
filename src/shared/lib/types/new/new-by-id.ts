export type GetNewByIdParams = {
  id: string | undefined;
};

export type DepartmentIds = {
  id: number;
};

export type NewByIdResponse = {
  id: number;
  createdAt: string;
  createdBy: number;
  title: string;
  content: string;
  type: "ALL" | "BY_DEPARTMENT";
  departmentIds: DepartmentIds[];
};
