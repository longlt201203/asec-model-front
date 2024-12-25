import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Group,
  NavLink,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" gap="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
            {/* <MantineLogo  size={30} /> */}
            <Title order={3}>ASEC Model</Title>
          </Group>
          <Group>
            <Button color="myColor" variant="transparent">
              Language
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <NavLink
              key={index}
              label={`Label ${index}`}
              active={index == 0}
              color="myColor"
              variant="filled"
            />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <Center h="100%">
          <Text size="xs">&copy; 2024 Le Thanh Long - All rights reserved</Text>
        </Center>
      </AppShell.Footer>
    </AppShell>
  );
}
