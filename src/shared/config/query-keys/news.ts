import { createQueryKeys } from "@lukemorales/query-key-factory";

export const newsKeys = createQueryKeys("new", {
  getAllNews: (page: number, size: number) => [page, size],
  getNewById: (id: string | undefined) => [id],
});
