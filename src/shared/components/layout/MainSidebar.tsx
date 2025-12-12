import { NavLink, Stack, Text, Group, Box } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconChartBar,
  IconBulb,
  IconBell,
  IconUsers,
  IconShoppingBag,
  IconTicket,
  IconPlug,
  IconMessage,
  IconSettings,
  IconHelp,
  IconLogout,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/store/auth";

const menuSections = [
  {
    label: "Menu",
    items: [
      { icon: IconLayoutDashboard, label: "Dashboard", href: "/dashboard" },
      {
        icon: IconChartBar,
        label: "Analytics",
        href: "/analytics",
        badge: "23",
      },
      { icon: IconBulb, label: "Insights", href: "/insights" },
      { icon: IconBell, label: "Updates", href: "/updates" },
      { icon: IconUsers, label: "Customers", href: "/customers" },
    ],
  },
  {
    label: "Products",
    items: [
      { icon: IconShoppingBag, label: "Store", href: "/store", badge: "32" },
      { icon: IconTicket, label: "Discounts", href: "/discounts" },
      { icon: IconPlug, label: "Integration", href: "/integration" },
      { icon: IconMessage, label: "Feedback", href: "/feedback" },
    ],
  },
  {
    label: "General",
    items: [
      { icon: IconSettings, label: "Settings", href: "/setting/user" },
      { icon: IconHelp, label: "Help Desk", href: "/help" },
    ],
  },
];

export function MainSidebar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box
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
      <Group p="xl" gap="sm">
        <Box
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, #40c057 0%, #2f9e44 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
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

      {/* Menu Sections */}
      <Stack gap="xl" px="md" py="sm" style={{ flex: 1, overflowY: "auto" }}>
        {menuSections.map((section) => (
          <div key={section.label}>
            <Text size="xs" c="dimmed" fw={600} mb="xs" px="md">
              {section.label}
            </Text>
            <Stack gap={4}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.href;
                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    leftSection={<Icon size={20} stroke={1.5} />}
                    rightSection={
                      item.badge ? (
                        <Box
                          style={{
                            background: "#40c057",
                            color: "white",
                            borderRadius: 12,
                            padding: "2px 8px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {item.badge}
                        </Box>
                      ) : null
                    }
                    active={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.href);
                    }}
                    styles={{
                      root: {
                        borderRadius: 12,
                        fontWeight: 500,
                        padding: "12px 16px",
                        marginBottom: 4,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: isActive ? "#40c057" : "#f8f9fa",
                        },
                        "&[data-active]": {
                          background: "#40c057",
                          color: "white",
                          fontWeight: 600,
                          "&:hover": {
                            background: "#37b24d",
                          },
                        },
                      },
                      label: {
                        color: isActive ? "white" : "#495057",
                      },
                      section: {
                        color: isActive ? "white" : "#868e96",
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </div>
        ))}
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
