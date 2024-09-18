import { GetAllMeetingsParams } from "@/shared/lib/types";
import { useQuery } from "@tanstack/react-query";
import { holidaysKeys } from "@/shared/config";
import { holidaysApi } from "@/shared/api/holidays.ts";

export const useGetAllHolidays = ({ page, size }: GetAllMeetingsParams) =>
  useQuery({
    ...holidaysKeys.getAllHolidays(page, size),
    queryFn: () => holidaysApi.getAllHolidays({ page, size }),
  });
