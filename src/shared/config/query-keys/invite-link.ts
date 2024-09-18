import { createQueryKeys } from "@lukemorales/query-key-factory";

export const inviteKeys = createQueryKeys("invite", {
  getAvailableInviteLink: (inviteId: string) => [inviteId],
});
