import { useState } from "react";
import { Text } from "@mantine/core";
import { Tabs } from "@mantine/core";
import classes from "./Tasks.module.css";
import { TasksTableTab } from "@/pages/tasks/ui/tasks-table-tab.tsx";
// import { TasksTreeTab } from "@/pages/tasks/ui/tasks-tree-tab.tsx";

export type Tasks = {
  id: number;
  taskName: string;
  status: string;
  deadline: string;
};

export const Tasks = () => {
  const [activeTab, setActiveTab] = useState<string | null>("table");

  return (
    <div>
      <Text fz="24px" fw={600} lh="32px" mt="24px">
        Vazifalar
      </Text>
      <Tabs defaultValue="tasks" value={activeTab} onChange={setActiveTab} className={classes.tasks}>
        <Tabs.List>
          <Tabs.Tab value="table" style={{ outline: "none" }}>
            Jadval ko'rinishida
          </Tabs.Tab>
          {/*<Tabs.Tab value="messages" style={{ outline: "none" }}>*/}
          {/*  Doska ko'rinishida*/}
          {/*</Tabs.Tab>*/}
        </Tabs.List>

        <TasksTableTab />

        {/*<TasksTreeTab />*/}
      </Tabs>
    </div>
  );
};
