import { useQuery } from "@tanstack/react-query";
import { newsApi } from "@/shared/api/news.ts";
import { GetNewByIdParams } from "@/shared/lib/types/new";
import { newsKeys } from "@/shared/config";

export const useGetNewsById = ({ id }: GetNewByIdParams) =>
  useQuery({
    ...newsKeys.getNewById(id),
    queryFn: () => newsApi.getNewsById({ id }),
  });
