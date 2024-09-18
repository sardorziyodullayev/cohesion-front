import { api } from "./base";

class TasksApi {
  async getAllTasks() {
    const { data } = await api.get("task/all");

    return data;
  }
}

export const tasksApi = new TasksApi();
