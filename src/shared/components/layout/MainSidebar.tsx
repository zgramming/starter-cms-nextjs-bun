import { NavLink, Stack, Text, Group, Box } from "@mantine/core";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/store/auth";
import { useState } from "react";
import { getIcon } from "@/shared/utils/iconMapping";

interface MenuItem {
  icon: string; // Icon name as string (e.g., "IconDashboard") - stored in database
  label: string;
  href?: string;
  badge?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    icon: "IconLayoutDashboard",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: "IconSettings",
    label: "Settings",
    children: [
      {
        icon: "IconUsers",
        label: "User Management",
        href: "/setting/user",
      },
      {
        icon: "IconShieldLock",
        label: "Role Management",
        href: "/setting/role",
      },
      {
        icon: "IconKey",
        label: "Parameters",
        href: "/setting/parameter",
      },
      {
        icon: "IconMenu2",
        label: "Menu Management",
        href: "/setting/app-menu",
      },
      {
        icon: "IconAppWindow",
        label: "Module Management",
        href: "/setting/app-module",
      },
      {
        icon: "IconCategory",
        label: "Category Management",
        href: "/setting/app-category",
      },
      {
        icon: "IconDatabase",
        label: "Master Data",
        href: "/setting/master-data",
      },
    ],
  },
  {
    icon: "IconHelp",
    label: "Help Desk",
    href: "/help",
  },
];

export function MainSidebar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [openedMenus, setOpenedMenus] = useState<string[]>([]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMenu = (label: string) => {
    setOpenedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isMenuActive = (item: MenuItem): boolean => {
    if (item.href && router.pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => isMenuActive(child));
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const Icon = getIcon(item.icon); // Convert string icon name to component
    const hasChildren = item.children && item.children.length > 0;
    const isOpened = openedMenus.includes(item.label);
    const isActive = isMenuActive(item);

    if (hasChildren) {
      return (
        <NavLink
          key={item.label}
          label={item.label}
          leftSection={<Icon size={20} stroke={1.5} />}
          rightSection={
            item.badge ? (
              <Box
                bg="green.5"
                c="white"
                px="xs"
                py={2}
                fz={12}
                fw={600}
                style={{ borderRadius: 12 }}
              >
                {item.badge}
              </Box>
            ) : (
              <IconChevronDown
                size={16}
                style={{
                  transform: isOpened ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            )
          }
          opened={isOpened}
          onChange={() => toggleMenu(item.label)}
          active={isActive}
        >
          {item.children?.map((child) => renderMenuItem(child, depth + 1))}
        </NavLink>
      );
    }

    return (
      <NavLink
        key={item.href}
        href={item.href}
        label={item.label}
        leftSection={<Icon size={20} stroke={1.5} />}
        rightSection={
          item.badge ? (
            <Box
              bg="green.5"
              c="white"
              px="xs"
              py={2}
              fz={12}
              fw={600}
              style={{ borderRadius: 12 }}
            >
              {item.badge}
            </Box>
          ) : null
        }
        active={router.pathname === item.href}
        onClick={(e) => {
          e.preventDefault();
          if (item.href) {
            router.push(item.href);
          }
        }}
      />
    );
  };

  return (
    <Box
      pt={{
        base: 60,
        md: 0,
      }}
      style={{
        width: 260,
        height: "100vh",
        background: "white",
        borderRight: "1px solid #f1f3f5",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <Group p="xl" gap="sm" visibleFrom="md">
        <Box
          w={40}
          h={40}
          display="flex"
          c="white"
          style={{
            borderRadius: 12,
            background: "linear-gradient(135deg, #22b573 0%, #148551 100%)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          F
        </Box>
        <Text size="lg" fw={700}>
          Finexy
        </Text>
      </Group>

      {/* Menu Items */}
      <Stack gap={4} px="md" py="sm" style={{ flex: 1, overflowY: "auto" }}>
        {menuItems.map((item) => renderMenuItem(item))}
      </Stack>

      {/* Logout */}
      <Box p="md" style={{ borderTop: "1px solid #f1f3f5" }}>
        <NavLink
          label="Log out"
          leftSection={<IconLogout size={20} stroke={1.5} />}
          onClick={handleLogout}
          styles={{
            root: {
              borderRadius: 12,
              fontWeight: 500,
              padding: "12px 16px",
              color: "#fa5252",
              "&:hover": {
                background: "#fff5f5",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
