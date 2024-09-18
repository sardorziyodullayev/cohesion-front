import { useState } from "react";
import { Button, Group, Select, Text, Image, Box } from "@mantine/core";
import { Tabs } from "@mantine/core";
import UserAddIcon from "shared/assets/icons/user-add.svg";
import classes from "./Employe.module.css";
import { EmployeeCartTab } from "@/pages/employee/ui/employee-cart-tab.tsx";
import { EmployeeTableTab } from "@/pages/employee/ui/employee-table-tab.tsx";
import { useNavigate } from "react-router-dom";
import { useGetAllDepartments } from "@/entities/department/model";
import { useGetAllUser } from "@/entities/user/model";
import { TLoaderOverlay } from "@/shared/ui";

/**
 * Represents an Employee with relevant details.
 *
 * @typedef {Object} Employee
 * @property {number} id - The unique identifier for the Employee.
 * @property {string} name - The name of the Employee.
 * @property {string} sectionName - The section or department the Employee belongs to.
 * @property {string} position - Employee's job position.
 * @property {string} number - Employee's contact number.
 * @property {string} image - URL or path to the Employee's image.
 */
export type Employee = {
  id: number;
  name: string;
  sectionName: string;
  position: string;
  number: string;
  image: string;
};

/**
 * Employee component.
 *
 * This component displays employee information and provides navigation options
 * for adding new employees and switching between different views (Card, Table)
 * of employee data.
 *
 * State:
 * - `activeTab` (string or null): The currently active tab ("card" or "table").
 *
 * Functions:
 * - `goToEmployeeAddPage`: Navigates to the "Add Employee" page.
 *
 * UI Elements:
 * - A title displaying "Employees".
 * - A select input for choosing among predefined headquarters.
 * - A button for adding a new employee.
 * - Tabs for switching between "Card" and "Table" views.
 */
export const Employee = () => {
  const [activeTab, setActiveTab] = useState<string | null>("card");
  const [activePage, setPage] = useState(1);
  const [value, setValue] = useState<string | null>("");
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUser({ page: activePage, size: 20, ...(value && { departmentId: value }) });

  const { data: departmentData } = useGetAllDepartments();

  const goToEmployeeAddPage = () => {
    navigate("/employee/employee-add");
  };

  return (
    <Box h="100%" style={{ overflow: "hidden", display: "flex", flexFlow: "column" }}>
      <Group py="18px" justify="space-between" className={classes.employeeBox}>
        <Text fz="24px" fw={600} lh="32px">
          Employees
        </Text>
        <Group justify="flex-end">
          <Select
            clearable
            placeholder="Filter by department"
            data={departmentData?.map(item => ({
              value: `${item.id}`,
              label: item.name,
            }))}
            styles={theme => ({
              input: {
                borderColor: theme.colors.blue[6],
                color: theme.colors.blue[6],
                "::placeholder": {
                  color: theme.colors.blue[6],
                },
              },
            })}
            value={value}
            onChange={setValue}
          />
          <Button variant="filled" onClick={goToEmployeeAddPage} leftSection={<Image src={UserAddIcon} />}>
            Add an employee
          </Button>
        </Group>
      </Group>
      <Tabs defaultValue="employee" pos="relative" value={activeTab} onChange={setActiveTab} h="calc(100% - 85px)">
        <Tabs.List className={classes.employee} style={{ zIndex: 100 }}>
          <Tabs.Tab value="card" style={{ outline: "none" }}>
            Card
          </Tabs.Tab>
          {/*<Tabs.Tab value="messages" style={{ outline: "none" }}>*/}
          {/*  Tree*/}
          {/*</Tabs.Tab>*/}
          <Tabs.Tab value="table" style={{ outline: "none" }}>
            Table
          </Tabs.Tab>
        </Tabs.List>

        {isLoading && <TLoaderOverlay />}

        <EmployeeCartTab data={data} activePage={activePage} setPage={setPage} />

        {/*<EmployeeTreeTab />*/}

        <EmployeeTableTab data={data} activePage={activePage} setPage={setPage} />
      </Tabs>
    </Box>
  );
};
