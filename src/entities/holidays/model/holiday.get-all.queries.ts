import { useQuery } from "@tanstack/react-query";
import { holidaysApi } from "@/shared/api/holidays";
import { GetAllHolidaysParams } from "@/shared/lib/types";
import { holidayKeys } from "@/shared/config";

export const useGetAllHolidays = ({ page, size }: GetAllHolidaysParams) =>
   useQuery({
      ...holidayKeys.getAllHolidays(page, size),
      queryFn: () => holidaysApi.getAllHolidays({ page, size }),
   });
