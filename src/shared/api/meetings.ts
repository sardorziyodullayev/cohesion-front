import { api } from "./base";
import { GetAllMeetingsParams, GetMeetingByIdParams, MeetingByIdResponse, MeetingResponse } from "@/shared/lib/types/meeting";

class MeetingsApi {
  async getAllMeetings({ page, size }: GetAllMeetingsParams): Promise<MeetingResponse> {
    const { data } = await api.get<MeetingResponse>("meeting/all", {
      params: { page, size },
    });

    return data;
  }

  async getMeetingById({ id }: GetMeetingByIdParams): Promise<MeetingByIdResponse> {
    const { data } = await api.get<MeetingByIdResponse>(`meeting/${id}`);

    return data;
  }

  async addMeeting(addMeetingData: any): Promise<MeetingByIdResponse> {
    const { data } = await api.post<MeetingByIdResponse>("meeting", addMeetingData);

    return data;
  }
}

export const meetingsApi = new MeetingsApi();
