import { useQuery } from "@tanstack/react-query";
import { positionKeys } from "@/shared/config";
import { positionApi } from "@/shared/api/position.ts";

export const useGetAllPositions = () =>
  useQuery({
    ...positionKeys.getAllPositions,
    queryFn: () => positionApi.getAllPositions(),
  });
