import { Table } from "@mantine/core";
import { homeData } from "@/shared/constants/home-data.ts";
import classes from "./Home.module.css";

export const HomeTask = () => {
  return (
    <>
      <Table verticalSpacing="sm">
        <Table.Thead className={classes.tableHead}>
          <Table.Tr>
            <Table.Th>Task name</Table.Th>
            <Table.Th>Priority</Table.Th>
            <Table.Th>Time left</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {homeData.map((item: any) => (
            <>
              {item.tasks.map((task: any) => (
                <Table.Tr key={task.id} className={classes.tableRow}>
                  <Table.Td className={classes.tableText}>{task.taskName}</Table.Td>
                  <Table.Td className={classes.taskText}>{task.taskStatus}</Table.Td>
                  <Table.Td className={classes.tableText}>{task.deadline}</Table.Td>
                </Table.Tr>
              ))}
            </>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
