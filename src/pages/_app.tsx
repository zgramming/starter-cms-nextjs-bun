import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { env } from "@/core/config/env";
import Head from "next/head";
import { ErrorBoundary } from "@/shared/components/ui/ErrorBoundary";

const theme = createTheme({
  /** Primary Color - Elegant Green Theme */
  primaryColor: "green",

  /** Color Palette - Professional Green Tones */
  colors: {
    green: [
      "#e8f8f0",
      "#d1f0e1",
      "#a3e1c3",
      "#74d2a5",
      "#4bc38b",
      "#22b573", // Primary shade
      "#1a9d62",
      "#148551",
      "#0f6d42",
      "#0a5533",
    ],
  },

  /** Font Family - Inter for professional admin UI */
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontFamilyMonospace: "'Fira Code', 'Courier New', monospace",
  headings: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "600",
    sizes: {
      h1: { fontSize: "2rem", lineHeight: "1.3" },
      h2: { fontSize: "1.5rem", lineHeight: "1.35" },
      h3: { fontSize: "1.25rem", lineHeight: "1.4" },
      h4: { fontSize: "1.125rem", lineHeight: "1.45" },
      h5: { fontSize: "1rem", lineHeight: "1.5" },
      h6: { fontSize: "0.875rem", lineHeight: "1.5" },
    },
  },

  /** Border Radius - Soft & Modern */
  defaultRadius: "md",
  radius: {
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },

  /** Spacing - Consistent & Harmonious */
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  /** Shadows - Subtle & Clean */
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
    md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
  },

  /** Auto Contrast - Better Accessibility */
  autoContrast: true,
  luminanceThreshold: 0.3,

  /** Focus Ring - Visible but not intrusive */
  focusRing: "auto",
  focusClassName: "",

  /** Default Props for Components */
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
        withBorder: true,
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
        shadow: "xs",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
    Table: {
      defaultProps: {
        striped: true,
        highlightOnHover: true,
        withTableBorder: true,
        withColumnBorders: false,
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // Create QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Head>
              <title>Admin Dashboard</title>
            </Head>
            <Notifications position="top-right" zIndex={1000} />
            <Component {...pageProps} />
            {env.enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
