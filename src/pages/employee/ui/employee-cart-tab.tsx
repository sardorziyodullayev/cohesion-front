import { Avatar, Flex, Grid, Pagination, Paper, ScrollArea, Tabs, Text } from "@mantine/core";
import { Employee } from "@/pages/employee";
import { useNavigate } from "react-router-dom";
import { getTotal } from "@/shared/lib/helpers";

/**
 * EmployeeCartTab is a functional component that renders a tab containing a paginated list
 * of employee cards. Each card displays an employee's photo, name, and position.
 * The component fetches employee data from an API and handles loading state while the data is being fetched.
 * When an employee card is clicked, the user is navigated to the detailed view of the selected employee.
 *
 * State:
 * - `activePage`: Tracks the current page number for pagination.
 *
 * Functions:
 * - `handleCardClick`: Navigates the user to the employee detail page based on the employee's ID.
 *
 * External Hooks:
 * - `useNavigate`: Used for navigation to the employee detail page.
 * - `useGetAllUser`: Custom hook used to fetch the list of employees.
 *
 * Components:
 * - `TLoaderOverlay`: Displays a loading overlay when employee data is being fetched.
 * - `Tabs.Panel`: Wraps the employee cards and pagination control.
 * - `ScrollArea`: Provides a scrollable container for the employee cards.
 * - `Grid`: Layout component to arrange employee cards in a grid format.
 * - `Avatar`: Displays the employee photo.
 * - `Text`: Displays the employee's name and position.
 * - `Paper`: Wrapper component that provides a styled container for each employee card.
 * - `Flex`: Layout component used to center the pagination controls.
 * - `Pagination`: Component used to control pagination of the employee list.
 */
export const EmployeeCartTab = ({ data, activePage, setPage }) => {
  const navigate = useNavigate();

  const handleCardClick = (employee: Employee) => {
    navigate(`/employee/employee-detail/${employee.id}`);
  };

  return (
    <Tabs.Panel value="card" my={1} h="calc(100% - 108px)">
      <ScrollArea h="100%" w="100%">
        <Grid w="100%" style={{ overflowY: "hidden", overflowX: "hidden" }}>
          {data?.content.map((item: any) => (
            <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 3 }}>
              <div onClick={() => handleCardClick(item)} style={{ cursor: "pointer" }}>
                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                  <Avatar src={item.photoUrl} size={48} radius={120} mx="auto" />
                  <Text ta="center" fz="16px" fw={500} lh="24px" mt="md">
                    {item.name}
                  </Text>
                  <Text ta="center" fz="14px" fw={400} lh="20px" c="dimmed">
                    {item.positionName || "Position name is not specified"}
                  </Text>
                </Paper>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>
      <Flex justify="center" my={10}>
        <Pagination total={getTotal(data?.totalElements ?? 0, 20)} value={activePage} onChange={setPage} />
      </Flex>
    </Tabs.Panel>
  );
};
