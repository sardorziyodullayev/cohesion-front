import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Anchor, Breadcrumbs } from "@mantine/core";
import classes from "./Breadcrumbs.module.css";

type BreadcrumbItem = { title: string; href: string };
type CustomBreadcrumbsProps = {
  title: string | undefined;
  breadcrumbsList: BreadcrumbItem[];
};

export const CustomBreadcrumbs = ({ title, breadcrumbsList = [] }: CustomBreadcrumbsProps) => {
  const { pathname } = useLocation();

  const items = [...breadcrumbsList, { title, href: pathname }];

  return (
    <Breadcrumbs my={20} separator=">">
      {items.map(({ title, href }, index) => (
        <Anchor component={RouterNavLink} key={index} to={href} className={classes.link}>
          {title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
};
