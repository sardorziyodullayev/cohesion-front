import { useMutation } from "@tanstack/react-query";
import { holidaysApi } from "@/shared/api/holidays";

export const useHolidaysActions = () => {
   const addHolidays = useMutation({
      mutationFn: holidaysApi.addHoliday,
   });

   return { addHolidays };
};
