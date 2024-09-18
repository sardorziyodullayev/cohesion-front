import { useQuery } from "@tanstack/react-query";
import { newsApi } from "@/shared/api/news.ts";
import { GetAllNewsParams } from "@/shared/lib/types";
import { newsKeys } from "@/shared/config";

export const useGetAllNews = ({ page, size }: GetAllNewsParams) =>
  useQuery({
    ...newsKeys.getAllNews(page, size),
    queryFn: () => newsApi.getAllNews({ page, size }),
  });
