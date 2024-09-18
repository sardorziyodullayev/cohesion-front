import { useQuery } from "@tanstack/react-query";
import { inviteApi } from "@/shared/api/invite-link.ts";
import { inviteKeys } from "@/shared/config";

export const useGetAvailableInviteLink = (inviteId: string) =>
  useQuery({
    ...inviteKeys.getAvailableInviteLink(inviteId),
    queryFn: () => inviteApi.availableInviteLink(inviteId),
  });
