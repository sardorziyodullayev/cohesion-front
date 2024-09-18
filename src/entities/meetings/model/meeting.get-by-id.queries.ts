import { useQuery } from "@tanstack/react-query";
import { meetingsApi } from "@/shared/api/meetings.ts";
import { meetingKeys } from "@/shared/config/query-keys/meetings.ts";
import { GetMeetingByIdParams } from "@/shared/lib/types/meeting";

export const useGetMeetingById = ({ id }: GetMeetingByIdParams) =>
  useQuery({
    ...meetingKeys.getMeetingById(id),
    queryFn: () => meetingsApi.getMeetingById({ id }),
  });
