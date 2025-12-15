import { Box, Burger, Drawer, AppShell } from "@mantine/core";
import { ReactNode, useState } from "react";
import { MainSidebar } from "./MainSidebar";
import { TopBar } from "./TopBar";
import { useMediaQuery } from "@mantine/hooks";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box display="flex" mih="100vh" bg="gray.0">
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          size="260px"
          padding="md"
          zIndex={1000}
        >
          <MainSidebar />
        </Drawer>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && <MainSidebar />}

      {/* Main Content */}
      <Box
        display="flex"
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : 260,
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <TopBar
          burger={
            isMobile ? (
              <Burger
                opened={drawerOpened}
                onClick={() => setDrawerOpened(!drawerOpened)}
                size="sm"
              />
            ) : undefined
          }
        />

        {/* Content Area */}
        <Box
          component="main"
          p={isMobile ? "md" : "xl"}
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
