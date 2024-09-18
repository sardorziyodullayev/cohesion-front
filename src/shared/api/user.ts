import { api } from "./base";
import { GetAllUsersParams } from "@/shared/lib/types";

class UserApi {
  async getAllUser({ page, size, departmentId }: GetAllUsersParams) {
    const { data } = await api.get("user/get-all", {
      params: { page, size, departmentId },
    });

    return data;
  }

  async getUserById(id: string) {
    const { data } = await api.get(`user/get-by-id/${id}`);

    return data;
  }

  async userAdd(values: any) {
    const { data } = await api.post("user/add", values);

    return data;
  }
}

export const userApi = new UserApi();
