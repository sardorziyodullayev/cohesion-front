import { Participant } from "@/shared/lib/types/meeting/meeting-add.ts";

export type GetAllMeetingsParams = {
  page: number;
  size: number;
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type Meeting = {
  id: number;
  createdAt: string;
  createdBy: number;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  meetingLink: string;
  type: string;
  status: string;
  participants: Participant[];
};

export type MeetingResponse = {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  pageable: Pageable;
  size: number;
  content: Meeting[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
};
