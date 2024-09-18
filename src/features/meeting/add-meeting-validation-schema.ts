import { z } from "zod";

export const meetingSchema = z.object({
  title: z.string().min(5, "The target of the meeting must be at least 5 characters."),
  type: z.enum(["ONLINE", "OFFLINE"], {
    errorMap: () => ({ message: "Please select a type." }),
  }),
  status: z.enum(["PENDING", "ONGOING", "FINISHED", "CANCELLED", "REJECTED"], {
    errorMap: () => ({ message: "Please select a type." }),
  }),
  startTime: z.date({ required_error: "Please select a date." }),
  meetingLink: z
    .string()
    .optional()
    .refine(val => !val || val === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(val), {
      message: "The link is in the wrong format.",
    }),
  participantIds: z.array(z.string()).nonempty("Please select at least one participant."),
});
