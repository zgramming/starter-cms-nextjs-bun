import { Card, Image, Text, Button, Group, SimpleGrid } from "@mantine/core";
import { Module } from "@/types";
import { useRouter } from "next/router";

interface ModuleCardProps {
  module: Module;
  categoryId: string;
}

export function ModuleCard({ module, categoryId }: ModuleCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/app/${categoryId}/${module.id}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={module.image || "https://via.placeholder.com/300x160"}
          height={160}
          alt={module.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{module.name}</Text>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2}>
        {module.description}
      </Text>

      <Button fullWidth mt="md" radius="md" onClick={handleClick}>
        Buka Modul
      </Button>
    </Card>
  );
}

interface CategorySectionProps {
  categoryName: string;
  modules: Module[];
  categoryId: string;
}

export function CategorySection({
  categoryName,
  modules,
  categoryId,
}: CategorySectionProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <Text size="xl" fw={700} mb="md">
        {categoryName}
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} categoryId={categoryId} />
        ))}
      </SimpleGrid>
    </div>
  );
}
