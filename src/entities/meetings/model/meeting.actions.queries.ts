import { useMutation } from "@tanstack/react-query";
import { meetingsApi } from "@/shared/api/meetings.ts";

export const useMeetingActions = () => {
  const addMeeting = useMutation({
    mutationFn: meetingsApi.addMeeting,
  });

  return { addMeeting };
};
