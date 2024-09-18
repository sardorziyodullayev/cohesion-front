import { Participant } from "@/shared/lib/types/meeting/meeting-add.ts";

export type GetMeetingByIdParams = {
  id: string;
};

export type MeetingByIdResponse = {
  id: number;
  createdAt: string;
  createdBy: number;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  meetingLink: string;
  type: "ONLINE" | "OFFLINE";
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  participants: Participant[];
};
