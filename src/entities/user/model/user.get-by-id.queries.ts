import { userApi } from "@/shared/api/user";
import { userKeys } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id: string) =>
  useQuery({
    ...userKeys.getUserById(id),
    queryFn: () => userApi.getUserById(id),
  });
