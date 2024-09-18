import { api } from "./base";

class DepartmentApi {
  async getAllDepartments() {
    const { data } = await api.get("department/get-all");

    return data;
  }
}

export const departmentApi = new DepartmentApi();
