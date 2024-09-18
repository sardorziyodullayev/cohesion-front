export type Participant = {
  id: string;
  name: string;
  photoUrl: string;
  label: string;
  surname: string;
  departmentName: string;
};

export type FormattedParticipant = {
  value: string;
  label: string;
  position: string;
  image: string;
};

export type FormValues = {
  title: string;
  description: string;
  location: string;
  startTime: string | null;
  meetingLink: string;
  type: string;
  status: string;
  participantIds: string[];
};
