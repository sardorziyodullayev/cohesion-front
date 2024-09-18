import { Box, Button, Grid, Group, MultiSelect, ScrollArea, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import classes from "./Meetings-add.module.css";
import { DateTimePicker } from "@mantine/dates";
import { CustomBreadcrumbs } from "@/shared/ui";
import { useGetAllUser } from "@/entities/user/model";
import { useMeetingActions } from "@/entities/meetings/model";
import { FormValues } from "@/shared/lib/types/meeting";
import { meetingSchema } from "@/features/meeting";
import { notify } from "@/shared/lib/helpers";

/**
 * MeetingsAdd is a React functional component used to add a new meeting.
 *
 * This component handles user input for meeting details such as title, location,
 * description, type, status, date-time, meeting link, and participant selection.
 * It uses various hooks and utilities to manage state, fetch user data, validate forms,
 * and handle meeting creation requests.
 *
 * Functionality includes:
 * - Fetching all users to populate participant selection.
 * - Formatting participant data for display.
 * - Managing form state and validation.
 * - Submitting meeting data to the backend.
 *
 * Variables and Concepts:
 * - `participant`: State variable to store selected participants.
 * - `data`: Fetched user data.
 * - `participantData`: Array of formatted participant names for selection.
 * - `formattedParticipantsArray`: Array of formatted participant objects.
 * - `PData`: Object mapping participant names to their detailed information.
 * - `renderMultiSelectOption`: Rendering function for participant selection UI.
 * - `form`: Form state and validation management using `useForm`.
 * - `handleSubmit`: Function to handle form submission and send meeting data.
 *
 * @typedef {Object} Participant
 * @property {string} id - The unique identifier of the participant.
 * @property {string} name - The first name of the participant.
 * @property {string} surname - The last name of the participant.
 * @property {string} departmentName - The department where the participant works.
 * @property {string} photoUrl - URL to the participant's photo.
 *
 * @typedef {Object} FormattedParticipant
 * @property {string} value - The ID of the participant.
 * @property {string} label - The full name of the participant.
 * @property {string} position - The participant's position in the department.
 * @property {string} image - URL to the participant's photo.
 *
 * @typedef {Object} FormValues
 * @property {string} title - The title of the meeting.
 * @property {string} description - The purpose of the meeting.
 * @property {string} location - The location of the meeting.
 * @property {string | null} startTime - The start time of the meeting.
 * @property {string} meetingLink - The link to the online meeting.
 * @property {string} type - The type of meeting (e.g. ONLINE, OFFLINE).
 * @property {string} status - The status of the meeting (e.g. PENDING, ONGOING).
 * @property {Array<string>} participantIds - List of selected participant IDs.
 */
export const MeetingsAdd = () => {
  const { data } = useGetAllUser({ page: 1, size: 200 });

  const { addMeeting } = useMeetingActions();

  const form = useForm<FormValues>({
    validate: zodResolver(meetingSchema),
    initialValues: {
      title: "",
      description: "",
      location: "",
      startTime: null,
      meetingLink: "",
      type: "",
      status: "",
      participantIds: [],
    },
  });

  const formatStartTime = (startTime: string | null): string | null => {
    return startTime ? new Date(startTime).toISOString() : null;
  };

  const handleSubmit = async (values: FormValues) => {
    const requestData = {
      ...values,
      startTime: formatStartTime(values.startTime),
    };

    try {
      await addMeeting.mutateAsync(requestData).then(e => {
        console.log("hello: ", e);
        notify("Meeting successfully created", "lime");
        form.reset();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const breadcrumbsList = [{ title: "Meetings", href: "/meetings" }];

  return (
    <Box pos="relative" h="calc(100% - 10px)" style={{ overflow: "hidden" }}>
      <CustomBreadcrumbs title="Create a meeting" breadcrumbsList={breadcrumbsList} />
      <ScrollArea h="100%" w="100%">
        <Grid justify="center">
          <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
            <Stack className={classes.meetingsAddBox}>
              <Text fz="24px" fw="500" lh="32px">
                Add a meeting
              </Text>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                  <Group grow>
                    <TextInput withAsterisk label="Title" placeholder="Enter a meeting title" {...form.getInputProps("title")} />
                    <TextInput label="Location" placeholder="Enter the meeting address" {...form.getInputProps("location")} />
                  </Group>
                  <Textarea
                    label="The purpose of the meeting"
                    placeholder="Write the purpose of the meeting..."
                    autosize
                    minRows={3}
                    maxRows={5}
                    {...form.getInputProps("description")}
                  />
                  <Group grow>
                    <Select
                      withAsterisk
                      label="Type of meeting"
                      placeholder="Choose"
                      data={[
                        { value: "ONLINE", label: "Online" },
                        { value: "OFFLINE", label: "Offline" },
                      ]}
                      {...form.getInputProps("type")}
                    />
                    <Select
                      withAsterisk
                      label="Status of meeting"
                      placeholder="Choose"
                      data={[
                        { value: "PENDING", label: "Pending" },
                        { value: "ONGOING", label: "Ongoing" },
                        { value: "FINISHED", label: "Finished" },
                        { value: "CANCELLED", label: "Cancelled" },
                        { value: "REJECTED", label: "Rejected" },
                      ]}
                      {...form.getInputProps("status")}
                    />
                  </Group>
                  <Group grow>
                    <DateTimePicker
                      minDate={new Date()}
                      clearable
                      withAsterisk
                      label="Pick date"
                      placeholder="Pick date"
                      {...form.getInputProps("startTime")}
                    />
                  </Group>
                  <TextInput label="Meeting link" placeholder="Zoom or Google meet link" {...form.getInputProps("meetingLink")} />
                  <MultiSelect
                    withAsterisk
                    label="Invite members to the meeting"
                    placeholder="Select an employee or enter a name"
                    data={data?.content.map((item: any) => ({
                      value: `${item.id}`,
                      label: item.name,
                    }))}
                    {...form.getInputProps("participantIds")}
                    hidePickedOptions
                  />
                  <Button type="submit" loading={addMeeting.isPending}>
                    Add a meeting
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </Box>
  );
};
