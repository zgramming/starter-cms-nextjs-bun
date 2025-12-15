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
        style={{
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4bc38b 0%, #1a9d62 100%)",
          opacity: 0.1,
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
        style={{
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4bc38b 0%, #1a9d62 100%)",
          opacity: 0.08,
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
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                border: "3px solid var(--mantine-color-green-5)",
                overflow: "hidden",
              }}
            >
              {/* Green accent gradient */}
              <Box
                pos="absolute"
                top={0}
                left={0}
                right={0}
                h={6}
                style={{
                  background:
                    "linear-gradient(90deg, #4bc38b 0%, #22b573 50%, #1a9d62 100%)",
                }}
              />
              <Group gap="md" mb="xs">
                <ThemeIcon size={48} radius="md" variant="light" color="green">
                  <IconSparkles size={28} />
                </ThemeIcon>
                <Box>
                  <Title order={1} size="2rem" fw={700}>
                    Dashboard
                  </Title>
                  <Text c="dimmed" size="lg">
                    Welcome back! Select a module to get started
                  </Text>
                </Box>
              </Group>
            </Box>

            {/* Categories */}
            {mockCategories.map((category) => (
              <Box key={category.id}>
                {/* Category Header */}
                <Box
                  mb="md"
                  p="md"
                  bg="white"
                  style={{
                    borderRadius: "var(--mantine-radius-md)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                    borderLeft: "4px solid var(--mantine-color-green-5)",
                  }}
                >
                  <Group justify="space-between" align="center">
                    <Box>
                      <Title order={2} size="1.5rem" fw={700} c="green.8">
                        {category.name}
                      </Title>
                      <Text size="sm" c="dimmed">
                        {category.description}
                      </Text>
                    </Box>
                    <Badge
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "teal", to: "green" }}
                    >
                      {category.modules.length} Module
                      {category.modules.length > 1 ? "s" : ""}
                    </Badge>
                  </Group>
                </Box>

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
                          shadow="sm"
                          padding="xl"
                          radius="lg"
                          withBorder
                          pos="relative"
                          h="100%"
                          style={{
                            cursor: "pointer",
                            overflow: "hidden",
                          }}
                          onClick={() => handleModuleClick(module)}
                          className="module-card"
                        >
                          {/* Gradient Top Border */}
                          <Box
                            className="card-gradient"
                            pos="absolute"
                            top={0}
                            left={0}
                            right={0}
                            h={4}
                            style={{
                              background: `linear-gradient(90deg, var(--mantine-color-${color}-6), var(--mantine-color-${color}-4))`,
                            }}
                          />

                          <Stack gap="md">
                            <Group justify="space-between" align="flex-start">
                              <ThemeIcon
                                size={56}
                                radius="md"
                                variant="light"
                                color={color}
                                style={{
                                  boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
                                }}
                              >
                                <Icon size={32} />
                              </ThemeIcon>
                              <Box className="arrow-icon">
                                <IconArrowRight size={20} color="#adb5bd" />
                              </Box>
                            </Group>

                            <Box>
                              <Text fw={700} size="xl" mb={4} c="gray.9">
                                {module.name}
                              </Text>
                              <Text size="sm" c="dimmed" lineClamp={2} mih={40}>
                                {module.description}
                              </Text>
                            </Box>

                            <Group gap="xs" mt="auto">
                              <Badge
                                variant="light"
                                color={color}
                                size="sm"
                                leftSection={
                                  <Box
                                    w={6}
                                    h={6}
                                    style={{
                                      borderRadius: "50%",
                                      background: `var(--mantine-color-${color}-6)`,
                                    }}
                                  />
                                }
                              >
                                {module.menus?.length || 0} Menu
                                {(module.menus?.length || 0) > 1 ? "s" : ""}
                              </Badge>
                            </Group>
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
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(0);
          }

          .module-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(34, 181, 115, 0.15) !important;
            border-color: var(--mantine-color-green-5) !important;
          }

          .module-card:hover .card-gradient {
            height: 6px;
          }

          .module-card .arrow-icon {
            transition: all 0.3s ease;
            opacity: 0.5;
          }

          .module-card:hover .arrow-icon {
            opacity: 1;
            transform: translateX(4px);
          }

          .card-gradient {
            transition: height 0.3s ease;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .module-card {
            animation: fadeInUp 0.5s ease backwards;
          }

          .module-card:nth-child(1) {
            animation-delay: 0.1s;
          }
          .module-card:nth-child(2) {
            animation-delay: 0.2s;
          }
          .module-card:nth-child(3) {
            animation-delay: 0.3s;
          }
          .module-card:nth-child(4) {
            animation-delay: 0.4s;
          }
        `}</style>
      </Box>
    </Box>
  );
}
