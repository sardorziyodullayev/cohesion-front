import { api } from "./base";
import { GetAllNewsParams, GetNewByIdParams, NewByIdResponse, NewResponse } from "@/shared/lib/types/new";

class NewsApi {
  async getAllNews({ page, size }: GetAllNewsParams): Promise<NewResponse> {
    const { data } = await api.get<NewResponse>("news/all", {
      params: { page, size },
    });

    return data;
  }

  async getNewsById({ id }: GetNewByIdParams): Promise<NewByIdResponse> {
    const { data } = await api.get<NewByIdResponse>(`news/get`, {
      params: { id },
    });

    return data;
  }

  async addNews(addNewsData: any) {
    const { data } = await api.post("news/create", addNewsData);

    return data;
  }
}

export const newsApi = new NewsApi();
