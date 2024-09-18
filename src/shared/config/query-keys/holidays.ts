import { createQueryKeys } from "@lukemorales/query-key-factory";

export const holidaysKeys = createQueryKeys("holidays", {
  getAllHolidays: (page: number, size: number) => [page, size],
});
