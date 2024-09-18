import { Box, Button, Flex, Group, Image, Pagination, ScrollArea, Table, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import PlusIcon from "shared/assets/icons/plus.svg";
import { New } from "@/shared/lib/types/new";
import classes from "./News.module.css";
import { format } from "date-fns";
import { useGetAllNews } from "@/entities/news/model/new.get-all.queries.ts";
import { getTotal } from "@/shared/lib/helpers";
import { useState } from "react";
import { TLoaderOverlay } from "@/shared/ui";

export const News = () => {
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllNews({ page: activePage, size: 20 });

  const handleNewClick = (newItem: New) => {
    navigate(`/news/news-detail/${newItem.id}`);
  };

  const goToNewsAddPage = () => {
    navigate("/news/news-add");
  };

  return (
    <Box h="100%" style={{ overflow: "hidden", display: "flex", flexFlow: "column" }}>
      <Group py="18px" justify="space-between" className={classes.newsBox}>
        <Text fz="24px" fw={600} lh="32px">
          News
        </Text>
        <Button variant="filled" onClick={goToNewsAddPage} leftSection={<Image src={PlusIcon} />}>
          Add news
        </Button>
      </Group>
      <ScrollArea h="100%" w="100%">
        <Table verticalSpacing="sm" className={classes.table} stickyHeader highlightOnHover>
          <Table.Thead fz="14px" fw={600} lh="20px">
            <Table.Tr>
              <Table.Th>News name</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>

          {isLoading && <TLoaderOverlay />}

          <Table.Tbody className={classes.newsBody}>
            {data?.content?.map((newItem: New) => (
              <Table.Tr key={newItem.id} className={classes.tableRow} onClick={() => handleNewClick(newItem)}>
                <Table.Td>
                  <Text fz="14px" fw={500} lh="20px" style={{ padding: "12px 8px", textAlign: "start" }}>
                    {newItem.title}
                  </Text>
                </Table.Td>
                <Table.Td className={classes.tableText}>{format(new Date(newItem.createdAt), "dd.MM.yyyy")}</Table.Td>
                <Table.Td>
                  <Link to={`/news/news-detail/${newItem?.id}`} className={classes.tableLink}>
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
    </Box>
  );
};
