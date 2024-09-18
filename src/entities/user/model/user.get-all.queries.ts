import { userApi } from "@/shared/api/user";
import { userKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { GetAllUsersParams } from "@/shared/lib/types";

export const useGetAllUser = ({ page, size, departmentId }: GetAllUsersParams) =>
  useQuery({
    ...userKeys.getAllUser(page, size, departmentId),
    queryFn: () => userApi.getAllUser({ page, size, departmentId }),
  });
