import { Grid, TextInput, Button, Group, rem } from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconFileExport,
  IconFileImport,
} from "@tabler/icons-react";

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  showAdd?: boolean;
  showImport?: boolean;
  showExport?: boolean;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  onAdd,
  onImport,
  onExport,
  showAdd = true,
  showImport = true,
  showExport = true,
}: TableToolbarProps) {
  return (
    <Grid mb="md" gutter="md">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <TextInput
          placeholder="Cari..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          leftSection={
            <IconSearch style={{ width: rem(16), height: rem(16) }} />
          }
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group justify="flex-end" gap="xs">
          {showImport && onImport && (
            <Button
              variant="default"
              leftSection={
                <IconFileImport style={{ width: rem(16), height: rem(16) }} />
              }
              onClick={onImport}
            >
              Import
            </Button>
          )}
          {showExport && onExport && (
            <Button
              variant="default"
              leftSection={
                <IconFileExport style={{ width: rem(16), height: rem(16) }} />
              }
              onClick={onExport}
            >
              Export
            </Button>
          )}
          {showAdd && onAdd && (
            <Button
              leftSection={
                <IconPlus style={{ width: rem(16), height: rem(16) }} />
              }
              onClick={onAdd}
            >
              Tambah
            </Button>
          )}
        </Group>
      </Grid.Col>
    </Grid>
  );
}
