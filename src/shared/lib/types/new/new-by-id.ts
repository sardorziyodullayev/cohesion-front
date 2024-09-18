import { DepartmentIds } from "./all-news";

export type GetNewByIdParams = {
  id: string | undefined;
};

export type NewByIdResponse = {
  id: number;
  createdAt: string;
  createdBy: number;
  title: string;
  content: string;
  type: "ALL" | "BY_DEPARTMENT";
  departmentIds: DepartmentIds[];  // Takroriy eksport o'rniga oldingi import
};
