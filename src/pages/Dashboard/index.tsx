import {
  ActionIcon,
  AppShell,
  Burger,
  Center,
  Group,
  NavLink,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LanguageIcon,
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  BeakerIcon,
  CubeIcon,
  CubeTransparentIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

const navItems = [
  {
    key: "",
    label: "Home",
    icon: <HomeIcon className="size-4" />,
  },
  {
    key: "environments",
    label: "Environments",
    icon: <BeakerIcon className="size-4" />,
  },
  {
    key: "factors",
    label: "Factors",
    icon: <CogIcon className="size-4" />,
  },
  {
    key: "species",
    label: "Species",
    icon: <CubeIcon className="size-4" />,
  },
  {
    key: "attributes",
    label: "Attributes",
    icon: <CubeTransparentIcon className="size-4" />,
  },
];

export default function DashboardLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { pathname } = useLocation();
  const keys = pathname.split("/").slice(1);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" gap="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
            {/* <MantineLogo  size={30} /> */}
            <Title order={3}>ASEC Model</Title>
          </Group>
          <Group gap="xs">
            <Tooltip label="Language">
              <ActionIcon color="myColor" variant="transparent">
                <LanguageIcon className="size-6" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Logout">
              <ActionIcon color="myColor" variant="transparent">
                <ArrowRightStartOnRectangleIcon className="size-6" />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            label={item.label}
            active={keys.includes(item.key)}
            leftSection={item.icon}
            color="myColor"
            variant="filled"
            component={Link}
            to={`/${item.key}`}
            onClick={close}
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
