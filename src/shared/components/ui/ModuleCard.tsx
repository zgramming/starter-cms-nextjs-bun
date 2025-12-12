import { Card, Image, Text, Button, Group, Box } from "@mantine/core";
import type { Module } from "@/types/app-structure";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from "./ModuleCard.module.css";

interface ModuleCardProps {
  module: Module;
  categoryId: string;
}

export function ModuleCard({ module, categoryId }: ModuleCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    // Navigate to first menu if available, otherwise to module path
    if (module.menus && module.menus.length > 0) {
      await router.push(module.menus[0].path);
    } else {
      await router.push(`/app/${categoryId}/${module.id}`);
    }

    setIsLoading(false);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
    >
      <Card.Section className={classes.imageSection}>
        <Image
          src={module.image || "https://via.placeholder.com/300x160"}
          height={160}
          alt={module.name}
        />
        <Box className={classes.overlay} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600} size="lg" className={classes.title}>
          {module.name}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2} mb="md">
        {module.description}
      </Text>

      <Button
        fullWidth
        radius="md"
        onClick={handleClick}
        loading={isLoading}
        variant="light"
        color="green"
        className={classes.button}
      >
        Buka Modul
      </Button>
    </Card>
  );
}
