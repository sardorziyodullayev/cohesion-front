import { useState } from "react";
import { Table, ScrollArea, Group, Avatar, Text, Button, Pagination, Badge, Flex, Box } from "@mantine/core";
import classes from "./Holidays.module.css";
import { useNavigate } from "react-router-dom";
import { IconCalendarCheck } from "@tabler/icons-react";
import { formatDate, getTotal } from "@/shared/lib/helpers";
import { useGetAllHolidays } from "@/entities/holidays/model";
import { calculateDaysBetween } from "@/features/holidays";
import { TLoaderOverlay } from "@/shared/ui";

export const Holidays = () => {
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: holidaysData, isLoading } = useGetAllHolidays({ page: activePage, size: 20 });

  const goToVacationAdd = () => {
    navigate("/holidays/holidays-add");
  };

  const rows = holidaysData?.content.map((item: any) => {
    const badgeColor = item.status === "PENDING" ? "orange" : item.status === "APPROVED" ? "blue" : "green";
    return (
      <Table.Tr key={item.id} className={classes.tableRow}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item?.user?.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{calculateDaysBetween(item.startDate, item.endDate)}</Table.Td>
        <Table.Td>{item?.startDate}</Table.Td>
        <Table.Td>{calculateDaysBetween(formatDate(new Date().toDateString(), "YYYY-MM-DD"), item?.endDate)}</Table.Td>
        <Table.Td>
          <Flex className={classes.statusText} style={{ width: "max-content" }}>
            <Badge color={badgeColor} size="xs" mr="4px" />
            {item.status}
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box h="100%" style={{ overflow: "hidden", display: "flex", flexFlow: "column" }}>
      <Group py="18px" justify="space-between" className={classes.holidaysBox}>
        <Text fz="24px" fw={600} lh="32px">
          Vacation days of employees
        </Text>
        <Button variant="filled" onClick={goToVacationAdd} leftSection={<IconCalendarCheck />}>
          Setting a vacation
        </Button>
      </Group>
      <ScrollArea h="100%" w="100%">
        <Table verticalSpacing="sm" className={classes.table} stickyHeader highlightOnHover>
          <Table.Thead fz="14px" fw={600} lh="20px">
            <Table.Tr>
              <Table.Th>Surname and first name</Table.Th>
              <Table.Th>Total days</Table.Th>
              <Table.Th>Days off</Table.Th>
              <Table.Th>Remaining days</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>

          {isLoading && <TLoaderOverlay />}

          <Table.Tbody  className={classes.meetingsBody}>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      <Flex justify="center" my={10}>
        <Pagination total={getTotal(holidaysData?.totalElements ?? 0, 20)} value={activePage} onChange={setPage} />
      </Flex>
    </Box>
  );
};
