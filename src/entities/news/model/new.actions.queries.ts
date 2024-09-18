import { useMutation } from "@tanstack/react-query";
import { newsApi } from "@/shared/api/news.ts";

export const useNewsActions = () => {
  const addNews = useMutation({
    mutationFn: newsApi.addNews,
  });

  return { addNews };
};
