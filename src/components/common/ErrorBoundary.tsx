import { Component, ReactNode } from "react";
import {
  Alert,
  Button,
  Container,
  Stack,
  Title,
  Text,
  Code,
} from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service (Sentry, LogRocket, etc.)
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      errorInfo: errorInfo.componentStack || null,
    });

    // Send to error tracking service
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Container
          size="md"
          py="xl"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <Stack gap="lg" style={{ width: "100%" }}>
            <Alert
              icon={<IconAlertTriangle size={24} />}
              title="Oops! Something went wrong"
              color="red"
              variant="filled"
            >
              <Text size="sm">
                The application encountered an unexpected error. Please try
                refreshing the page.
              </Text>
            </Alert>

            {this.state.error && (
              <Stack gap="md">
                <Title order={3}>Error Details</Title>
                <Code block color="red">
                  {this.state.error.toString()}
                </Code>
              </Stack>
            )}

            {process.env.NODE_ENV === "development" && this.state.errorInfo && (
              <Stack gap="md">
                <Title order={3}>Component Stack</Title>
                <Code
                  block
                  style={{
                    fontSize: "0.75rem",
                    maxHeight: "300px",
                    overflow: "auto",
                  }}
                >
                  {this.state.errorInfo}
                </Code>
              </Stack>
            )}

            <Stack gap="sm">
              <Button onClick={this.handleReload} color="red" fullWidth>
                Reload Page
              </Button>
              <Button onClick={this.handleReset} variant="outline" fullWidth>
                Try Again
              </Button>
            </Stack>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
