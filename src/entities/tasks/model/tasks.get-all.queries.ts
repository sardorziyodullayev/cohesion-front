import { tasksKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "@/shared/api/tasks.ts";

export const useGetAllTasks = () =>
  useQuery({
    ...tasksKeys.getAllMeetings,
    queryFn: () => tasksApi.getAllTasks(),
  });
