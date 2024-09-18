import { Button, Group, Image, Select, Stack, Table, Text } from "@mantine/core";
import PlusIcon from "shared/assets/icons/calendar-plus.svg";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import classes from "./Calendar.module.css";

const getFormattedDate = (offset: any) => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + offset);
  return format(futureDate, "MMM dd");
};

export const Calendar = () => {
  const navigate = useNavigate();

  const getTodayDateInCustomFormat = () => {
    const today = new Date();
    const monthsOfYear = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
    
    const day = today.getDate();
    const month = monthsOfYear[today.getMonth()];
    const year = today.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

  const goToMeetingsAddPage = () => {
    navigate("/meetings/meetings-add");
  };

  return (
    <div>
      <Stack>
        <Text fz="24px" fw={600} lh="32px" mt="12px">
          Calendar
        </Text>
        <Group mt="12px" justify="space-between">
          <Group>
            <Text fz="18px" fw={600} lh="28px">
              {getTodayDateInCustomFormat()}
            </Text>
            <Button variant="default" color="gray">
              Bugun
            </Button>
            <Select placeholder="Hafta" data={["Kun", "Hafta", "Oy"]} />
          </Group>
          <Button variant="filled" onClick={goToMeetingsAddPage} leftSection={<Image src={PlusIcon} />}>
            Add a new appointment
          </Button>
        </Group>

        <Table withTableBorder withColumnBorders className={classes.detailBox}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta="center">UTC +5</Table.Th>
              {days.map((day, index) => (
                <Table.Th key={day}>
                  <Text size="md" c="dimmed" ta="center">
                    {getFormattedDate(index)}
                  </Text>
                  <Text ta="center">{day}</Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {times.map(time => (
              <Table.Tr key={time}>
                <Table.Td p="sm" fs="16px" ta="center">
                  {time}
                </Table.Td>
                {days.map(day => (
                  <Table.Td key={day}>{/* Ma'lumotlar shu yerga qo'shiladi */}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </div>
  );
};

const times = ["09 AM", "10 AM", "11 AM", "12 PM", "13 PM", "14 PM", "15 PM", "16 PM"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
