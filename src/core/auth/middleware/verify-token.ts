/**
 * Verify JWT token by calling backend API
 * This runs on Edge runtime, so keep it lightweight
 */
export async function verifyToken(token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${apiUrl}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Don't cache auth verification
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Check if user has access to specific category
 */
export function checkCategoryAccess(user: any, categoryId: string): boolean {
  if (!user || !user.access_categories) return false;
  
  return user.access_categories.some(
    (access: any) => access.category_id === categoryId && access.status === true
  );
}

/**
 * Check if user has access to specific module
 */
export function checkModuleAccess(user: any, moduleId: string): boolean {
  if (!user || !user.access_modules) return false;
  
  return user.access_modules.some(
    (access: any) => access.module_id === moduleId && access.status === true
  );
}

/**
 * Check if user has access to specific menu
 */
export function checkMenuAccess(user: any, menuId: string): boolean {
  if (!user || !user.access_menus) return false;
  
  return user.access_menus.some(
    (access: any) => access.menu_id === menuId && access.status === true
  );
}

/**
 * Extract route parameters from pathname
 * Example: /app/c1111111/m2222222 => { categoryId: 'c1111111', moduleId: 'm2222222' }
 */
export function extractRouteParams(pathname: string) {
  const match = pathname.match(/\/app\/([^/]+)\/([^/]+)/);
  
  if (!match) return null;
  
  return {
    categoryId: match[1],
    moduleId: match[2],
  };
}
