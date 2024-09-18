import { Avatar, Box, Button, Flex, Group, Image, Pagination, ScrollArea, Table, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import PlusIcon from "shared/assets/icons/calendar-plus.svg";
import classes from "./Meetings.module.css";
import { Meeting } from "@/shared/lib/types";
import { formatDate, getTotal } from "@/shared/lib/helpers";
import { useGetAllMeetings } from "@/entities/meetings/model";
import { TLoaderOverlay } from "@/shared/ui";
import { Participant } from "@/shared/lib/types/meeting";
import { useState } from "react";

/**
 * Meetings component displays a list of meetings with pagination, allowing users to view, add, and navigate to meeting details.
 *
 * @constant
 * @type {Component}
 *
 * @function
 * @name Meetings
 *
 * @example
 * Render the meetings component:
 * <Meetings />
 *
 * The Meetings component handles:
 * - Current active pagination page.
 * - Fetching and displaying all meetings.
 * - Navigating to meeting detail and add meeting pages.
 *
 * @requires useState - To manage the active pagination page state.
 * @requires useNavigate - To handle navigation within the application.
 * @requires useGetAllMeetings - Custom hook to fetch meetings data.
 *
 * @returns {JSX.Element}
 */
export const Meetings = (): JSX.Element => {
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllMeetings({ page: activePage, size: 20 });

  const handleMeetingClick = (meetingItem: Meeting) => {
    navigate(`/meetings/meetings-detail/${meetingItem.id}`);
  };

  const goToMeetingsAddPage = () => {
    navigate("/meetings/meetings-add");
  };

  return (
    <Box h="100%" style={{ overflow: "hidden", display: "flex", flexFlow: "column" }}>
      <Group py="18px" justify="space-between" className={classes.meetingsBox}>
        <Text fz="24px" fw={600} lh="32px">
          Meetings
        </Text>
        <Button variant="filled" onClick={goToMeetingsAddPage} leftSection={<Image src={PlusIcon} />}>
          Add a meeting
        </Button>
      </Group>
      <ScrollArea h="100%" w="100%">
        {isLoading && <TLoaderOverlay />}
        <Table verticalSpacing="sm" className={classes.table} stickyHeader highlightOnHover>
          <Table.Thead fz="14px" fw={600} lh="20px">
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Members of the meeting</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className={classes.meetingsBody}>
            {data?.content?.map((meetingItem: Meeting) => (
              <Table.Tr key={meetingItem.id} className={classes.tableRow} onClick={() => handleMeetingClick(meetingItem)}>
                <Table.Td>
                  <Text fz="14px" fw={500} lh="20px" style={{ padding: "12px 8px" }}>
                    {meetingItem.title}
                  </Text>
                </Table.Td>
                <Table.Td className={classes.tableText}>{formatDate(meetingItem.startTime, "DD-MMM YYYY HH:mm")}</Table.Td>
                <Table.Td>
                  <Avatar.Group>
                    {meetingItem?.participants
                      .filter((_item, index) => index < 5)
                      ?.map(({ id, photoUrl, name }: Participant) => (
                        <Avatar key={id} src={photoUrl || "https://avatar.iran.liara.run/public/42"} color="cyan">
                          {name}
                        </Avatar>
                      ))}
                    {meetingItem?.participants.length > 5 && <Avatar>+{meetingItem?.participants.length - 5}</Avatar>}
                  </Avatar.Group>
                </Table.Td>
                <Table.Td>
                  <Link to={`/meetings/meetings-detail/${meetingItem.id}`} className={classes.tableLink}>
                    More
                  </Link>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      <Flex justify="center" my={10}>
        <Pagination total={getTotal(data?.totalElements ?? 0, 20)} value={activePage} onChange={setPage} />
      </Flex>
    </Box>
  );
};
