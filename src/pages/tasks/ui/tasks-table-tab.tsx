import { LoadingOverlay, Table, Tabs } from "@mantine/core";
import classes from "@/pages/tasks/ui/Tasks.module.css";
import { useGetAllTasks } from "@/entities/tasks/model";
import { TLoaderOverlay } from "@/shared/ui";

export const TasksTableTab = () => {
  const { data, isLoading } = useGetAllTasks();

  console.log("tasks: ", data);

  return (
    <Tabs.Panel value="table" className={classes.table} pos="relative">
      {isLoading && <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />}
      <Table verticalSpacing="sm" pos="relative">
        <Table.Thead fz="14px" fw={600} lh="20px">
          <Table.Tr>
            <Table.Th>Task Name</Table.Th>
            <Table.Th>Priority</Table.Th>
            <Table.Th>End date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {isLoading && <TLoaderOverlay />}

        <Table.Tbody>
          {data?.map((task: any) => (
            <Table.Tr key={task.id} className={classes.tableRow}>
              <Table.Td className={classes.tableText}>{task.name}</Table.Td>
              <Table.Td className={classes.tableText}>
                <div
                  style={{
                    backgroundColor: task.taskLevel === "LOW" ? "#ABEFC6" : task.taskLevel === "MEDIUM" ? "#FEDF89" : "#FECDCA",
                    color: task.taskLevel === "LOW" ? "#067647" : task.taskLevel === "MEDIUM" ? "#B54708" : "#B42318",
                    border:
                      task.taskLevel === "LOW"
                        ? "1px solid rgba(0, 255, 0, 0.3)"
                        : task.taskLevel === "MEDIUM"
                          ? "1px solid #E0C278"
                          : "1px solid #F5A9A3",
                    padding: "4px",
                    width: "80px",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}>
                  {" "}
                  {task.taskLevel}
                </div>
              </Table.Td>
              <Table.Td className={classes.tableText}>{task.endDate}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Tabs.Panel>
  );
};
