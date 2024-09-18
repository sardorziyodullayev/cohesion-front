import { Avatar, Grid, Group, Paper, Stack, Text, Anchor, Box, ScrollArea } from "@mantine/core";
import { useParams } from "react-router-dom";
import classes from "./Meeting-detail.module.css";
import { useGetMeetingById } from "@/entities/meetings/model";
import { formatDate } from "@/shared/lib/helpers";
import { CustomBreadcrumbs, TLoaderOverlay } from "@/shared/ui";

/**
 * A React component that displays detailed information about a specific meeting.
 *
 * The component fetches meeting details using the meeting ID from the URL parameters
 * and displays the information in a structured format. It includes:
 * - Breadcrumb navigation
 * - Meeting purpose and description
 * - Specific meeting details like date and time, type, and Zoom link
 * - List of participants with their names and photos
 *
 * State and props management:
 * - Fetches meeting data and loading state using custom hooks
 * - Utilizes various React and third-party components for layout and styling
 */
export const MeetingsDetail = () => {
  const { id = "" } = useParams();
  const { data, isLoading } = useGetMeetingById({ id });

  const breadcrumbsList = [{ title: "Meetings", href: "/meetings" }];

  const meetingDetails = [
    {
      label: "Date and time of meeting",
      value: formatDate(data?.startTime as string, "DD/MM/YYYY - HH:mm"),
    },
    { label: "Type of meeting", value: data?.type },
    {
      label: "Link for Zoom meeting",
      value: data?.meetingLink,
      isLink: true,
    },
  ];

  return (
    <Box pos="relative" h="calc(100% - 10px)" style={{ overflow: "hidden" }}>
      <CustomBreadcrumbs title={data?.title} breadcrumbsList={breadcrumbsList} />
      <ScrollArea h="100%" w="100%">
        <Stack className={classes.detailBox} gap={50}>
          {isLoading && <TLoaderOverlay />}
          <Stack gap={8}>
            <Text fz="16px" fw={500}>
              The purpose of the meeting
            </Text>
            <Text fw={500} fz="20px">
              {data?.description}
            </Text>
          </Stack>

          <Group align="start" gap="80px">
            {meetingDetails.map((detail, index) => (
              <Stack key={index} gap={8}>
                <Text>{detail.label}</Text>
                {detail.isLink ? (
                  <Anchor
                    target="_blank"
                    style={{
                      maxWidth: "200px",
                      fontSize: "16px",
                      color: "#2E90FA",
                      textDecoration: "none",
                    }}
                    href={detail.value}>
                    {detail.value}
                  </Anchor>
                ) : (
                  <Text fz="16px" fw={500}>
                    {detail.value}
                  </Text>
                )}
              </Stack>
            ))}
          </Group>

          <Stack>
            <Text>Participants</Text>
            <Grid>
              {data?.participants.map(item => (
                <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                    <Avatar src={item.photoUrl} size={48} radius={120} mx="auto" />
                    <Text ta="center" fz="16px" fw={500} lh="24px" mt="md">
                      {item.name}
                    </Text>
                    <Text ta="center" fz="14px" fw={400} lh="20px" c="dimmed">
                      {item.surname}
                    </Text>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </ScrollArea>
    </Box>
  );
};
