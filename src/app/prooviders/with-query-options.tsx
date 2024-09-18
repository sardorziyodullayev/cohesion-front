import { ComponentType, createElement } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const withQueryOptions = (component: ComponentType) => () => {
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
      // refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // staleTime: 1000 * 60 * 3,
    },
  });

  return createElement(component);
};
