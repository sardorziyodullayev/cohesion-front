import { ActionIcon, Avatar, Button, CloseButton, Divider, Flex, Group, Menu, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { IconBell, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { getLocalItem } from "@/shared/lib/helpers/storage.ts";

/**
 * Header component that includes a search input and action icons for toggling
 * the color scheme between light and dark modes, as well as a notification icon.
 *
 * It uses Mantine's `useMantineColorScheme` hook to manage color scheme toggling.
 *
 * @component
 * @returns {JSX.Element} The Header component with search and action icons.
 */

export const Header = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  const mode = getLocalItem("mantine-color-scheme-value");

  return (
    <Flex className={classes.header}>
      <TextInput leftSection={<IconSearch />} placeholder="Search" />
      <Group>
        <ActionIcon size="lg" variant="default" aria-label="Notification" onClick={toggleColorScheme}>
          {mode === "dark" ? <IconSun /> : <IconMoon />}
        </ActionIcon>

        <Menu width={400} shadow="md" position="bottom-end">
          <Menu.Target>
            <ActionIcon size="lg" variant="default" aria-label="Notification">
              <IconBell />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item component="div">
              <Group justify="space-between">
                <Group>
                  <IconBell />
                  <Text fw="600" fz="20px">
                    Notification
                  </Text>
                </Group>
                <CloseButton />
              </Group>
            </Menu.Item>
            <Divider my="sm" />

            <Group p="10px">
              <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  Harriette Spoonlicker
                </Text>

                <Text c="dimmed" size="xs">
                  HR
                </Text>
              </div>
            </Group>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
};
