import { Stack, Text } from "@mantine/core";
import classes from "./New-detail.module.css";
import { useParams } from "react-router-dom";
import { CustomBreadcrumbs, TLoaderOverlay } from "@/shared/ui";
import { useGetNewsById } from "@/entities/news/model";

export const NewsDetail = () => {
  const { id = "" } = useParams();
  const { data, isLoading } = useGetNewsById({ id });

  const breadcrumbsList = [{ title: "News", href: "/news" }];

  return (
    <div>
      <CustomBreadcrumbs title={data?.data?.title} breadcrumbsList={breadcrumbsList} />
      <Stack className={classes.detailBox} pos="relative">
        {isLoading && <TLoaderOverlay />}
        <Text fw={600} fz="32px" lh="38px">
          {data?.data?.title}
        </Text>
        <Text fz="16px" lh="27px" color="dimmed">
          {data?.data?.content}
        </Text>
      </Stack>
    </div>
  );
};
