# 🚀 CMS Admin Dashboard

Modern, elegant, dan production-ready Content Management System (CMS) admin dashboard built with Next.js 16, Mantine UI, dan best practices untuk integrasi dengan backend .NET REST API.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black)
![Mantine](https://img.shields.io/badge/Mantine-8.3.10-339af0)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React Query](https://img.shields.io/badge/React_Query-5.90-red)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 UI/UX

- ✅ **Modern & Minimalist Design** - Green theme dengan Inter font untuk tampilan profesional
- ✅ **Responsive Layout** - Mobile-friendly dengan grid system
- ✅ **Dark Mode Ready** - Siap untuk dark mode implementation
- ✅ **Reusable Components** - DataTable, TableToolbar, Forms, dll

### 🔐 Authentication & Security

- ✅ **JWT Authentication** - Token-based auth dengan auto-refresh
- ✅ **Protected Routes** - Route protection dengan HOC/wrapper
- ✅ **Role-based Access Control** - Permission management
- ✅ **Secure Storage** - Token storage dengan best practices

### 📊 Data Management

- ✅ **CRUD Operations** - Create, Read, Update, Delete untuk semua resources
- ✅ **Search & Filter** - Real-time search dengan debouncing
- ✅ **Pagination** - Server-side pagination
- ✅ **Sorting** - Multi-column sorting
- ✅ **Bulk Operations** - Bulk delete, export, import

### ⚡ Performance

- ✅ **React Query** - Advanced caching & state management
- ✅ **Optimistic Updates** - Instant UI feedback
- ✅ **Code Splitting** - Dynamic imports
- ✅ **Image Optimization** - Next.js Image component

### 🛠️ Developer Experience

- ✅ **TypeScript** - Full type safety
- ✅ **ESLint & Prettier** - Code quality tools
- ✅ **Hot Reload** - Fast refresh dengan Turbopack
- ✅ **API Client** - Axios dengan interceptors
- ✅ **Error Handling** - Global error boundaries

---

## 📁 Project Structure

```
starter-cms-nextjs-bun/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── auth/              # Auth components (ProtectedRoute)
│   │   ├── common/            # Reusable components (DataTable, TableToolbar)
│   │   ├── forms/             # Form components (UserForm, RoleForm)
│   │   └── layouts/           # Layout components (AdminLayout)
│   ├── config/
│   │   └── env.ts             # Environment configuration
│   ├── hooks/
│   │   └── useApi.ts          # React Query hooks
│   ├── lib/
│   │   └── api-client.ts      # Axios instance & interceptors
│   ├── pages/
│   │   ├── api/               # API routes (optional)
│   │   ├── app/               # Protected pages
│   │   │   └── [categoryId]/
│   │   │       └── [moduleId]/
│   │   │           ├── user.tsx
│   │   │           ├── role.tsx
│   │   │           └── ...
│   │   ├── dashboard.tsx
│   │   ├── login.tsx
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── services/
│   │   └── api.ts             # API endpoints & CRUD factory
│   ├── store/
│   │   └── auth.ts            # Zustand auth store
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── index.ts           # TypeScript types
├── .env.local.example         # Environment variables template
├── API_INTEGRATION_GUIDE.md   # Complete API guide
├── PRODUCTION_GUIDE.md        # Production deployment guide
├── QUICK_START.md             # Quick start guide
├── THEME_GUIDE.md             # Theme customization guide
└── README.md                  # This file
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Bun** >= 1.0 (atau Node.js >= 18)
- **Backend .NET** dengan REST API
- **Git**

### 2. Installation

```bash
# Clone repository
git clone <repository-url>
cd starter-cms-nextjs-bun

# Install dependencies
bun install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local dengan URL backend Anda
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Development

```bash
# Run development server
bun dev

# Open http://localhost:3000
```

### 4. Build

```bash
# Production build
bun run build

# Start production server
bun start
```

---

## 📚 Documentation

| Guide                                                | Description                            |
| ---------------------------------------------------- | -------------------------------------- |
| [QUICK_START.md](QUICK_START.md)                     | 5-minute setup & integration guide     |
| [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) | Complete API integration documentation |
| [THEME_GUIDE.md](THEME_GUIDE.md)                     | Theme customization & styling guide    |
| [PRODUCTION_GUIDE.md](PRODUCTION_GUIDE.md)           | Production deployment checklist        |

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# App Configuration
NEXT_PUBLIC_APP_NAME=CMS Admin
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Development
NEXT_PUBLIC_ENABLE_MOCKING=false
```

### Backend Requirements

Your .NET backend should provide these endpoints:

```
Authentication:
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
GET    /api/auth/profile

Resources (User, Role, etc):
GET    /api/{resource}?page=1&pageSize=10&search=keyword
GET    /api/{resource}/{id}
POST   /api/{resource}
PUT    /api/{resource}/{id}
DELETE /api/{resource}/{id}
```

**Response Format:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

---

## 🎯 Usage Example

### Protect a Page

```tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>{/* Your content */}</AdminLayout>
    </ProtectedRoute>
  );
}
```

### Fetch Data with React Query

```tsx
import { useUsers, useCreateUser } from "@/hooks/useApi";

function UsersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUsers({ page, pageSize: 10 });
  const createUser = useCreateUser();

  const handleCreate = async (values) => {
    await createUser.mutateAsync(values);
  };

  return <DataTable data={data?.data || []} />;
}
```

### Create New Resource

```tsx
// 1. Add type
export interface Category {
  id: string;
  name: string;
}

// 2. Create API (auto-generated via factory)
export const categoryApi = createCrudApi<Category>("categories");

// 3. Create hooks
export const categoryHooks = createCrudHooks<Category>(
  "categories",
  categoryApi
);

// 4. Use in component
const { data } = categoryHooks.useList();
```

---

## 🛠️ Tech Stack

### Core

- **Next.js 16.0.8** - React framework with Pages Router
- **React 19.2** - UI library
- **TypeScript 5.x** - Type safety
- **Bun** - Fast package manager & runtime

### UI

- **Mantine UI 8.3** - Component library
- **@tabler/icons-react** - Icon library
- **PostCSS** - CSS processing

### State Management

- **React Query 5.90** - Server state & caching
- **Zustand 5.0** - Client state (auth)

### API

- **Axios 1.13** - HTTP client
- **Custom interceptors** - Token management & error handling

---

## 📦 Available Scripts

```bash
# Development
bun dev              # Start dev server with Turbopack
bun run build        # Build for production
bun start            # Start production server

# Code Quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint errors
bun run type-check   # TypeScript type checking
bun run format       # Format code with Prettier

# Utilities
bun run clean        # Clean build artifacts
```

---

## 🧪 Testing (Optional)

```bash
# Install testing dependencies
bun add -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
bun test
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Docker

```bash
# Build image
docker build -t cms-admin .

# Run container
docker run -p 3000:3000 cms-admin
```

See [PRODUCTION_GUIDE.md](PRODUCTION_GUIDE.md) for complete deployment instructions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [Mantine](https://mantine.dev) - React Components Library
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tabler Icons](https://tabler.io/icons) - Beautiful icons

---

## 📞 Support

Jika ada pertanyaan atau issues:

1. Check [QUICK_START.md](QUICK_START.md) untuk troubleshooting
2. Baca [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) untuk API integration
3. Open an issue di GitHub repository

---

**Made with ❤️ for modern web applications**
