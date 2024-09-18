import { Avatar, Flex, Pagination, ScrollArea, Table, Tabs, Text } from "@mantine/core";
import classes from "@/pages/employee/ui/Employe.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Employee } from "@/pages/employee";
import { getTotal } from "@/shared/lib/helpers";

/**
 * EmployeeTableTab is a functional component that renders a paginated table of employee data.
 * It includes a navigation handler for employee detail view, pagination, and a loading state.
 *
 * @returns {JSX.Element} A table representing employees with pagination and loading overlay.
 */
export const EmployeeTableTab = ({ data, activePage, setPage }: any) => {
  const navigate = useNavigate();

  const handleCardClick = (employee: Employee) => {
    navigate(`/employee/employee-detail/${employee.id}`);
  };

  return (
    <Tabs.Panel value="table" className={classes.table} pos="relative" mt={-2} h="calc(100% - 105px)">
      <ScrollArea h="100%" w="100%">
        <Table verticalSpacing="sm" highlightOnHover stickyHeader>
          <Table.Thead fz="14px" fw={600} lh="20px">
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Fullname</Table.Th>
              <Table.Th>Phone number</Table.Th>
              <Table.Th>Position</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className={classes.meetingsBody}>
            {data?.content &&
              data?.content.map((employee: any) => (
                <Table.Tr key={employee.id} className={classes.tableRow} onClick={() => handleCardClick(employee)}>
                  <Table.Td>
                    <Avatar size={40} src={employee.photoUrl} radius={26} />
                  </Table.Td>
                  <Table.Td>
                    <Text fz="14px" fw={500} lh="20px">
                      {employee.name}
                    </Text>
                  </Table.Td>
                  <Table.Td className={classes.tableText}>{employee.phone || "-"}</Table.Td>
                  <Table.Td className={classes.tableText}>{employee.positionName || "-"}</Table.Td>
                  <Table.Td>
                    <Link to={`/employee/employee-detail/${employee.id}`} className={classes.tableLink}>
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
    </Tabs.Panel>
  );
};
