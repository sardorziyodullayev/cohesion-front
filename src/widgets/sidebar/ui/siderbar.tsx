import { Group, Avatar, Text, Title, Flex, NavLink } from "@mantine/core";
import Logout from "@/shared/assets/icons/log-out-01.svg";
import Logo from "@/shared/assets/icons/loom.svg";
import classes from "./NavbarSimple.module.css";
import { NavLink as RouterNavLink } from "react-router-dom";
import { getSession } from "@/shared/lib/helpers";
import { IconSettings } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { sidebarMenusData } from "@/shared/constants/sidebar-menus-data.ts";
import { createElement } from "react";

/**
 * Creates a navigation link with an icon, label, and URL destination.
 *
 * @param {Object} params - The navigation link parameters.
 * @param {string} params.icon - The URL of the icon to display in the navigation link.
 * @param {string} params.label - The text label for the navigation link.
 * @param {string} params.link - The URL to navigate to when the link is clicked.
 * @return {JSX.Element} The rendered navigation link component.
 */
function createNavLink({ icon, label, link }: { icon: string; label: string; link: string }): JSX.Element {
  return (
    <NavLink
      leftSection={createElement("img", {
        src: icon,
        className: classes.linkIcon,
        alt: label,
      })}
      component={RouterNavLink}
      className={classes.link}
      label={
        <Text fz={16} fw={600}>
          {label}
        </Text>
      }
      to={link}
      key={label}
    />
  );
}

/**
 * Renders the Sidebar component, which includes the navigation menu along with user account information.
 *
 * The Sidebar dynamically adjusts its layout based on the screen size and user session.
 *
 * @return {JSX.Element} The rendered Sidebar component.
 */
export function Sidebar() {
  const session = getSession();
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const userName = `${session?.name} ${session?.surname}`;
  const userRole = session?.role;

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Flex className={classes.header}>
          <img src={Logo} alt="Logo" className={classes.linkIcon} />
          {!isSmallScreen && <Title fz={20}>Cohesion</Title>}
        </Flex>
        <Group gap={3}>{sidebarMenusData.map(createNavLink)}</Group>
      </div>
      <NavLink
        to="settings"
        active={false}
        component={RouterNavLink}
        className={classes.link}
        leftSection={<IconSettings />}
        label={
          <Text fz={16} fw={600}>
            Settings
          </Text>
        }
        onClick={event => event.preventDefault()}
      />
      <div className={classes.footer}>
        <NavLink
          component={RouterNavLink}
          className={classes.link}
          to="account"
          label={
            <Group w="100%">
              {!isSmallScreen && (
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {userName}
                  </Text>
                  <Text color="dimmed" size="xs">
                    {userRole}
                  </Text>
                </div>
              )}
              <img src={Logout} alt="Logout" className={classes.linkIcon} />
            </Group>
          }
          {...(!isSmallScreen && {
            leftSection: (
              <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" radius="xl" />
            ),
          })}
        />
      </div>
    </nav>
  );
}
