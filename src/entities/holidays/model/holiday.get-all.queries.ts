import { useQuery } from "@tanstack/react-query";
import { holidaysApi } from "@/shared/api/holidays";
import { GetAllHolidaysParams } from "@/shared/lib/types/holiday/all-holidays";
import { holidaysKeys } from "@/shared/config/query-keys/holidays";

export const useGetAllHolidays = ({ page, size }: GetAllHolidaysParams) =>
   useQuery({
      ...holidaysKeys.getAllHolidays(page, size),
      queryFn: () => holidaysApi.getAllHolidays({ page, size }),
   });
