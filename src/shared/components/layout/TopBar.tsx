import {
  Group,
  TextInput,
  ActionIcon,
  Menu,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import {
  IconSearch,
  IconBell,
  IconQuestionMark,
  IconChevronDown,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useAuthStore } from "@/modules/auth/store/auth";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { authApi } from "@/modules/auth/api/auth";

interface TopBarProps {
  burger?: ReactNode;
}

export function TopBar({ burger }: TopBarProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // ignore error, just clear local state
    }
    logout();
    router.push("/login");
  };

  return (
    <Group
      justify="space-between"
      px="xl"
      py="md"
      bg="white"
      style={{
        borderBottom: "1px solid #f1f3f5",
      }}
    >
      {/* Left side - Search or Mobile Menu */}
      <Group gap="md">
        {burger}
        <TextInput
          placeholder="Search product"
          leftSection={<IconSearch size={16} />}
          rightSection={
            <Text size="xs" c="dimmed" fw={500} visibleFrom="sm">
              ⌘ K
            </Text>
          }
          w={burger ? 200 : 400}
          visibleFrom="sm"
          styles={{
            input: {
              borderRadius: rem(12),
              border: "1px solid #e9ecef",
              "&:focus": {
                borderColor: "var(--mantine-color-green-5)",
              },
            },
          }}
        />
      </Group>

      {/* Right Section */}
      <Group gap="md">
        <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
          <IconBell size={20} />
        </ActionIcon>

        <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
          <IconQuestionMark size={20} />
        </ActionIcon>

        {/* User Menu */}
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Group
              gap="xs"
              p="xs"
              style={{
                cursor: "pointer",
                borderRadius: rem(12),
                transition: "background 0.2s",
                "&:hover": {
                  background: "#f8f9fa",
                },
              }}
            >
              <Avatar
                src={null}
                alt={user?.name || "User"}
                size={36}
                radius="xl"
                color="green"
              >
                {user?.name?.charAt(0) || "A"}
              </Avatar>
              <div>
                <Text size="sm" fw={600}>
                  {user?.name || "Admin"}
                </Text>
                <Text size="xs" c="dimmed">
                  {user?.role || "Administrator"}
                </Text>
              </div>
              <IconChevronDown size={16} />
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconSettings size={16} />}
              onClick={() => router.push("/setting/user")}
            >
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={16} />}
              onClick={handleLogout}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
