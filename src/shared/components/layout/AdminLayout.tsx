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
    <Box style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
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
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : 260,
          display: "flex",
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
          style={{
            flex: 1,
            padding: isMobile ? "16px" : "24px",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
