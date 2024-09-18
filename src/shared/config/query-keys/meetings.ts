import { createQueryKeys } from "@lukemorales/query-key-factory";

export const meetingKeys = createQueryKeys("meeting", {
  getAllMeetings: (page: number, size: number) => [page, size],
  getMeetingById: (id: string | undefined) => [id],
});
