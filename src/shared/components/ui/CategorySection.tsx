import { Text, SimpleGrid } from "@mantine/core";
import type { Module } from "@/types/app-structure";
import { ModuleCard } from "./ModuleCard";

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
