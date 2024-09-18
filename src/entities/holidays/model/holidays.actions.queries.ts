import { useMutation } from "@tanstack/react-query";
import { holidaysApi } from "@/shared/api/holidays.ts";

export const useHolidaysActions = () => {
  const addHoliday = useMutation({
    mutationFn: holidaysApi.createHoliday,
  });

  return { addHoliday };
};
