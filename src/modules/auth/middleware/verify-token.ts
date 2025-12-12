import type { AuthenticatedUser } from "@/types/user";

/**
 * Verify JWT token by calling backend API
 * This runs on Edge runtime, so keep it lightweight
 */
export async function verifyToken(
  token: string
): Promise<AuthenticatedUser | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const response = await fetch(`${apiUrl}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Return basic user data
    const user: AuthenticatedUser = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      access_categories: data.access_categories || [],
      access_modules: data.access_modules || [],
      access_menus: data.access_menus || [],
    };

    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
