import { useQuery } from "@tanstack/react-query";
import { departmentKeys } from "@/shared/config";
import { departmentApi } from "@/shared/api/department.ts";

export const useGetAllDepartments = () =>
  useQuery({
    ...departmentKeys.getAllDepartments,
    queryFn: () => departmentApi.getAllDepartments(),
  });
