import { Accordion, Avatar, Box, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";
import EmployeeQuantityIcon from "shared/assets/icons/employee-quantity.svg";
import EmployeeVacationIcon from "shared/assets/icons/employee-vacation.svg";
import TasksIcon from "shared/assets/icons/tasksIconHome.svg";
import { HomeTask } from "@/pages/home/ui/home-task.tsx";
import { homeData } from "@/shared/constants/home-data.ts";
import { Calendar } from "@mantine/dates";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import classes from "./Home.module.css";
import axios from "axios";

const employeeData = [
  {
    icon: EmployeeQuantityIcon,
    text: "Employee quantity",
    total: 120,
    to: "/employee-quantity",
  },
  {
    icon: EmployeeVacationIcon,
    text: "Employee vacation",
    total: 8,
    to: "/employee-vacation",
  },
];

const fetchMeetings = async () => {
  const response = await axios.get('http://172.105.69.15:8080/api/v1/meeting/home');
  return response.data;
};

export const Home = () => {
  const [selected, setSelected] = useState<Date[]>([]);

  const handleSelect = (date: Date) => {
    const isSelected = selected.some(s => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected(current => current.filter(d => !dayjs(d).isSame(date, "date")));
    } else if (selected.length < 3) {
      setSelected(current => [...current, date]);
    }
  };

  const items = homeData.map(item => (
    <Accordion.Item key={item.id} value={item.value}>
      <Accordion.Control>
        <Text className={classes.accordionTitle} style={{ background: item.bgColor, padding: "4px 16px" }}>
          {item.value}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <HomeTask />
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Grid mt="15px" className={classes.home}>
        <Grid.Col span={8}>
          <Grid>
            {employeeData.map((item, index) => (
              <Grid.Col span={6} key={index}>
                <Box className={classes.homeBox}>
                  <Group>
                    <Image src={item.icon} style={{ borderRadius: "50%" }} className={classes.employeeVacation} />
                    <Text fz="16px" fw={600}>
                      {item.text}
                    </Text>
                  </Group>
                  <Text fz="36px" fw={600}>
                    {item.total}
                  </Text>
                  <Divider my="md" />
                  <NavLink to={item.to}>View the list</NavLink>
                </Box>
              </Grid.Col>
            ))}
            ;
            <Grid.Col span={12}>
              <Stack className={classes.homeTaskBox}>
                <Group>
                  <Image src={TasksIcon} style={{ borderRadius: "50%" }} className={classes.tasksIcon} />
                  <Text fz="16px" fw={600}>
                    My tasks
                  </Text>
                </Group>
                <Accordion chevronPosition="left" defaultValue="In progress">
                  {items}
                </Accordion>
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={12}>
              <Calendar
                className={classes.calendar}
                size="md"
                getDayProps={date => ({
                  selected: selected.some(s => dayjs(date).isSame(s, "date")),
                  onClick: () => handleSelect(date),
                })}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Box className={classes.homeBox}>
                <Text fz="18px" fw={600} mb="24px">
                  Bugungi uchrashuvlar
                </Text>
                <Stack>
                  <Text className={classes.meetingTitle}>Yangi ishchilar bilan yig’ilish</Text>
                  <Text className={classes.meetingTime} fz="12px">
                    🕑10:00 - 11:00
                  </Text>
                  <Group justify="space-between">
                    <Avatar.Group>
                      <Avatar src="https://avatar.iran.liara.run/public/44" />
                      <Avatar src="https://avatar.iran.liara.run/public/8" />
                      <Avatar src="https://avatar.iran.liara.run/public/29" />
                      <Avatar>+5</Avatar>
                    </Avatar.Group>
                    <NavLink to={"/meetings"}>Batafsil</NavLink>
                  </Group>
                  <Divider my="md" />
                </Stack>
                <Stack>
                  <Text className={classes.meetingTitle}>Yangi ishchilar bilan yig’ilish</Text>
                  <Text className={classes.meetingTime} fz="12px">
                    🕑10:00 - 11:00
                  </Text>
                  <Group justify="space-between">
                    <Avatar.Group>
                      <Avatar src="https://avatar.iran.liara.run/public/44" />
                      <Avatar src="https://avatar.iran.liara.run/public/8" />
                      <Avatar src="https://avatar.iran.liara.run/public/29" />
                      <Avatar>+5</Avatar>
                    </Avatar.Group>

                    <NavLink to={"/meetings"}>Batafsil</NavLink>
                  </Group>
                  <Divider my="md" />
                </Stack>
              </Box>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
};
