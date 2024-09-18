import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("user", {
  getAllUser: (page: number, size: number, departmentId?: string) => [page, size, departmentId],
  getUserById: (id: string) => [id],
});
