import {
  AppShell,
  Burger,
  Group,
  Text,
  Avatar,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface AdminLayoutProps {
  children: ReactNode;
  navbar?: ReactNode;
}

export function AdminLayout({ children, navbar }: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    router.push("/login");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={
        navbar
          ? {
              width: 280,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }
          : undefined
      }
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            {navbar && (
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
            )}
            <Text size="xl" fw={700}>
              CMS Admin
            </Text>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar radius="xl" style={{ cursor: "pointer" }} color="blue">
                AD
              </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Profile
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      {navbar && <AppShell.Navbar p="md">{navbar}</AppShell.Navbar>}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
