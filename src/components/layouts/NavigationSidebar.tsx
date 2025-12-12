import { NavLink, ScrollArea } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Menu } from "@/types";

interface NavigationSidebarProps {
  menus: Menu[];
  moduleId: string;
  categoryId: string;
}

export function NavigationSidebar({
  menus,
  moduleId,
  categoryId,
}: NavigationSidebarProps) {
  const router = useRouter();

  const handleMenuClick = (menu: Menu) => {
    router.push(`/app/${categoryId}/${moduleId}/${menu.path}`);
  };

  const renderMenuItem = (menu: Menu, level = 0) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const isActive = router.asPath.includes(menu.path);

    if (hasChildren) {
      return (
        <NavLink
          key={menu.id}
          label={menu.name}
          leftSection={menu.icon}
          rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
          childrenOffset={28}
          defaultOpened={isActive}
          active={isActive}
        >
          {menu.children?.map((child) => renderMenuItem(child, level + 1))}
        </NavLink>
      );
    }

    return (
      <NavLink
        key={menu.id}
        label={menu.name}
        leftSection={menu.icon}
        onClick={() => handleMenuClick(menu)}
        active={isActive}
      />
    );
  };

  return (
    <ScrollArea h="calc(100vh - 120px)">
      {menus.map((menu) => renderMenuItem(menu))}
    </ScrollArea>
  );
}
