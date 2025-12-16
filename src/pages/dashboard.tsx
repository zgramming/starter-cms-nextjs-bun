import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Card,
  Grid,
  Group,
  ThemeIcon,
  Badge,
} from "@mantine/core";
import { TopBar } from "@/shared/components/layout/TopBar";
import { useRouter } from "next/router";
import {
  IconSettings,
  IconArrowRight,
  IconSparkles,
  IconDatabase,
  IconShield,
  type Icon,
} from "@tabler/icons-react";
import type { Category } from "@/types/app-structure";

// Icon mapping untuk setiap module
const moduleIcons: Record<string, Icon> = {
  aplikasi: IconSettings,
  "master-data": IconDatabase,
  security: IconShield,
};

// Color mapping untuk setiap module
const moduleColors: Record<string, string> = {
  aplikasi: "blue",
  "master-data": "violet",
  security: "orange",
};

// Mock data untuk kategori dan modul
const mockCategories: Category[] = [
  {
    id: "2",
    name: "SETTING",
    description: "Application settings and configuration",
    modules: [
      {
        id: "aplikasi",
        categoryId: "2",
        name: "APPLICATION",
        description: "Manage users, roles, and system settings",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        menus: [
          {
            id: "app-users",
            moduleId: "aplikasi",
            name: "User Management",
            path: "/setting/user",
            order: 1,
          },
          {
            id: "app-roles",
            moduleId: "aplikasi",
            name: "Role Management",
            path: "/setting/role",
            order: 2,
          },
          {
            id: "app-params",
            moduleId: "aplikasi",
            name: "Parameters",
            path: "/setting/parameter",
            order: 3,
          },
          {
            id: "app-menus",
            moduleId: "aplikasi",
            name: "Menu Management",
            path: "/setting/app-menu",
            order: 4,
          },
          {
            id: "app-modules",
            moduleId: "aplikasi",
            name: "Module Management",
            path: "/setting/app-module",
            order: 5,
          },
          {
            id: "app-categories",
            moduleId: "aplikasi",
            name: "Category Management",
            path: "/setting/app-category",
            order: 6,
          },
        ],
      },
      {
        id: "master-data",
        categoryId: "2",
        name: "MASTER DATA",
        description: "Manage master data and categories",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        menus: [
          {
            id: "master-data-list",
            moduleId: "master-data",
            name: "Master Data",
            path: "/setting/master-data",
            order: 1,
          },
          {
            id: "master-category",
            moduleId: "master-data",
            name: "Master Category",
            path: "/setting/master-category",
            order: 2,
          },
        ],
      },
      {
        id: "security",
        categoryId: "2",
        name: "SECURITY",
        description: "Access control and permissions",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
        menus: [
          {
            id: "access-control",
            moduleId: "security",
            name: "Access Control",
            path: "/setting/access-control",
            order: 1,
          },
        ],
      },
    ],
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleModuleClick = (module: Category["modules"][0]) => {
    // Navigate to first menu of the module
    if (module.menus && module.menus.length > 0) {
      const firstMenu = module.menus[0];
      router.push(firstMenu.path);
    }
  };

  return (
    <Box mih="100vh" bg="gray.0" pos="relative">
      {/* Green Ornament - Top Right */}
      <Box
        pos="fixed"
        top={-100}
        right={-100}
        w={300}
        h={300}
        opacity={0.1}
        style={{
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4bc38b 0%, #1a9d62 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Green Ornament - Bottom Left */}
      <Box
        pos="fixed"
        bottom={-150}
        left={-150}
        w={400}
        h={400}
        opacity={0.08}
        style={{
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4bc38b 0%, #1a9d62 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box pos="relative" style={{ zIndex: 1 }}>
        {/* Top Bar without burger menu */}
        <TopBar />

        {/* Main Content */}
        <Container size="xl" py="xl">
          <Stack gap="xl">
            {/* Hero Header */}
            <Box
              p="xl"
              bg="white"
              pos="relative"
              style={{
                borderRadius: "var(--mantine-radius-lg)",
                border: "2px solid var(--mantine-color-green-5)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}
            >
              <Group gap="md" mb="xs">
                <ThemeIcon size={40} radius="md" variant="light" color="green">
                  <IconSparkles size={22} />
                </ThemeIcon>
                <Box>
                  <Title order={1} size="1.5rem" fw={700} mb={2}>
                    Dashboard
                  </Title>
                  <Text c="dimmed" size="md">
                    Welcome back! Select a module to get started
                  </Text>
                </Box>
              </Group>
            </Box>

            {/* Categories */}
            {mockCategories.map((category) => (
              <Box key={category.id}>
                {/* Category Header */}
                <Group justify="space-between" align="center" mb="md">
                  <Title order={2} size="1.1rem" fw={700} c="green.8">
                    {category.name}
                  </Title>
                  <Badge size="md" variant="light" color="green">
                    {category.modules.length} Module
                    {category.modules.length > 1 ? "s" : ""}
                  </Badge>
                </Group>

                {/* Modules Grid */}
                <Grid gutter="md">
                  {category.modules.map((module) => {
                    const Icon = moduleIcons[module.id] || IconSettings;
                    const color = moduleColors[module.id] || "gray";
                    return (
                      <Grid.Col
                        key={module.id}
                        span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                      >
                        <Card
                          padding="lg"
                          radius="md"
                          withBorder
                          bg="white"
                          style={{
                            cursor: "pointer",
                            borderColor: `var(--mantine-color-${color}-5)`,
                            transition:
                              "box-shadow .2s, border-color .2s, transform .2s",
                            boxShadow: "0 2px 8px rgba(34,181,115,0.06)",
                          }}
                          onClick={() => handleModuleClick(module)}
                          className="module-card"
                        >
                          <Stack gap="sm" align="center">
                            <ThemeIcon
                              size={38}
                              radius="md"
                              variant="light"
                              color={color}
                              mb={4}
                            >
                              <Icon size={22} />
                            </ThemeIcon>
                            <Text fw={600} size="md" c="gray.9" ta="center">
                              {module.name}
                            </Text>
                            <Text
                              size="xs"
                              c="dimmed"
                              ta="center"
                              lineClamp={2}
                            >
                              {module.description}
                            </Text>
                            <Badge
                              variant="light"
                              color={color}
                              size="xs"
                              mt={4}
                            >
                              {module.menus?.length || 0} Menu
                              {(module.menus?.length || 0) > 1 ? "s" : ""}
                            </Badge>
                          </Stack>
                        </Card>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Box>
            ))}
          </Stack>
        </Container>
        <style jsx global>{`
          .module-card {
            transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          }
          .module-card:hover {
            box-shadow: 0 8px 24px rgba(34, 181, 115, 0.1) !important;
            border-color: var(--mantine-color-green-5) !important;
            transform: translateY(-4px) scale(1.02);
          }
        `}</style>
      </Box>
    </Box>
  );
}
