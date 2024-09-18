import { Box, Container, Grid } from "@mantine/core";
import type { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import classes from "./Layout.module.css";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  navbarSlot?: ReactNode;
  headerSlot?: ReactNode;
  bottomSlot?: ReactNode;
  announcementSlot?: ReactNode;
  sidebarSlot?: ReactNode;
};

export function Layout(props: Props) {
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  return (
    <Box style={{ overflow: "hidden", transition: "width 400ms" }} w="100vw" h="100vh">
      <Grid gutter={0} align="stretch" justify="stretch">
        <Grid.Col
          span={2.5}
          style={{
            maxWidth: isSmallScreen ? "78px" : "250px",
            transition: "max-width 400ms ease",
          }}>
          {props.sidebarSlot && <aside>{props.sidebarSlot}</aside>}
        </Grid.Col>
        <Grid.Col span="auto" h="100vh" className={classes.layoutBg}>
          <Container fluid px={32}>
            {props.headerSlot}
            <Box className={classes.scrollContainer}>
              <Outlet />
            </Box>
          </Container>
        </Grid.Col>
        <ScrollRestoration />
      </Grid>
    </Box>
  );
}
