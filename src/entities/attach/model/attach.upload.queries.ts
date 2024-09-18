import { useMutation } from "@tanstack/react-query";
import { attachApi } from "@/shared/api/attach.ts";

export const useAttachActions = () => {
  const upload = useMutation({
    mutationFn: attachApi.upload,
  });

  return { upload };
};
