import { Avatar, Flex, Grid, Pagination, Paper, ScrollArea, Tabs, Text } from "@mantine/core";
import { Employee } from "@/pages/employee";
import { useNavigate } from "react-router-dom";
import { getTotal } from "@/shared/lib/helpers";

interface EmployeeCartTabProps {
  data: {
    content: Employee[];
    totalElements: number;
  } | null;
  activePage: any;
  setPage: (page: any) => void;
}

export const EmployeeCartTab: React.FC<EmployeeCartTabProps> = ({ data, activePage, setPage }) => {
  const navigate = useNavigate();

  const handleCardClick = (employee: Employee) => {
    navigate(`/employee/employee-detail/${employee.id}`);
  };

  return (
    <Tabs.Panel value="card" my={1} h="calc(100% - 108px)">
      <ScrollArea h="100%" w="100%">
        <Grid w="100%" style={{ overflowY: "hidden", overflowX: "hidden" }}>
          {data?.content.map((item: Employee) => (
            <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 3 }}>
              <div onClick={() => handleCardClick(item)} style={{ cursor: "pointer" }}>
                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                  <Avatar src={item.image} size={48} radius={120} mx="auto" />
                  <Text ta="center" fz="16px" fw={500} lh="24px" mt="md">
                    {item.name}
                  </Text>
                  <Text ta="center" fz="14px" fw={400} lh="20px" c="dimmed">
                    {item.position || "Position name is not specified"}
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
