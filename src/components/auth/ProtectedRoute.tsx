import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth";
import { Center, Loader } from "@mantine/core";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Show loading while checking auth
  if (!isAuthenticated || !user) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" color="green" />
      </Center>
    );
  }

  return <>{children}</>;
}

// Higher Order Component version
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Role-based protection
interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function RoleProtectedRoute({
  children,
  allowedRoles,
  fallback,
}: RoleProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" color="green" />
      </Center>
    );
  }

  const hasRole = allowedRoles.includes(user.role);

  if (!hasRole) {
    return fallback || <div>Access Denied</div>;
  }

  return <>{children}</>;
}
