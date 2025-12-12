# 🚀 Production Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. ✅ Security

- [ ] **Environment Variables**
  - Semua sensitive data di `.env.local` (tidak di-commit ke git)
  - Production URL sudah dikonfigurasi
  - Secret keys menggunakan random string yang kuat
- [ ] **Authentication**
  - Token expiry time sudah sesuai (15-30 menit recommended)
  - Refresh token implemented dengan benar
  - Logout clears all tokens
  - HttpOnly cookies untuk production (more secure than localStorage)
- [ ] **API Security**

  - HTTPS only untuk production
  - CORS configured dengan origin yang spesifik (bukan `*`)
  - Rate limiting di backend
  - Input validation & sanitization
  - SQL injection protection
  - XSS protection

- [ ] **Headers**

```tsx
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
```

---

### 2. ✅ Performance

- [ ] **Bundle Size**

```bash
# Analyze bundle
bun run build
# Check .next/analyze/ folder

# Install analyzer
bun add -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run
ANALYZE=true bun run build
```

- [ ] **Code Splitting**

```tsx
// Dynamic imports untuk heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <Loader />,
  ssr: false, // if not needed
});
```

- [ ] **Image Optimization**

```tsx
import Image from "next/image";

// Use Next.js Image component
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority // for above-the-fold images
/>;
```

- [ ] **Caching Strategy**

```tsx
// src/pages/_app.tsx - React Query config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false, // disable in production
      retry: 1, // reduce retries
    },
  },
});
```

- [ ] **Database Query Optimization**
  - Add indexes di database
  - Pagination untuk large datasets
  - Lazy loading
  - Infinite scroll untuk long lists

---

### 3. ✅ SEO & Accessibility

- [ ] **Meta Tags**

```tsx
// src/pages/_app.tsx
import Head from "next/head";

<Head>
  <title>CMS Admin Dashboard</title>
  <meta name="description" content="Modern CMS admin dashboard" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</Head>;
```

- [ ] **Accessibility**

  - All images have alt text
  - Proper heading hierarchy (h1, h2, h3)
  - ARIA labels for icon buttons
  - Keyboard navigation works
  - Color contrast ratio > 4.5:1

- [ ] **Lighthouse Score**

```bash
# Target scores:
Performance: > 90
Accessibility: > 95
Best Practices: > 90
SEO: > 90
```

---

### 4. ✅ Error Handling & Monitoring

- [ ] **Error Boundaries**

```tsx
// components/ErrorBoundary.tsx
import { Component, ReactNode } from "react";
import { Alert, Button, Stack } from "@mantine/core";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to error tracking service (Sentry)
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stack align="center" justify="center" h="100vh">
          <Alert color="red" title="Oops! Something went wrong">
            {this.state.error?.message}
          </Alert>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </Stack>
      );
    }

    return this.props.children;
  }
}

// Wrap app
<ErrorBoundary>
  <App />
</ErrorBoundary>;
```

- [ ] **Sentry Integration** (Recommended)

```bash
bun add @sentry/nextjs
```

```tsx
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

- [ ] **Logging**

```tsx
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[INFO] ${message}`, data);
    }
    // Send to logging service in production
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to Sentry/logging service
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

---

### 5. ✅ Testing

- [ ] **Unit Tests**

```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom
```

```tsx
// __tests__/components/UserForm.test.tsx
import { render, screen } from "@testing-library/react";
import { UserForm } from "@/components/forms/UserForm";

describe("UserForm", () => {
  it("renders form fields", () => {
    render(<UserForm opened onClose={() => {}} onSubmit={async () => {}} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
```

- [ ] **E2E Tests** (Optional)

```bash
bun add -D @playwright/test
```

```tsx
// e2e/login.spec.ts
import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "admin@example.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
});
```

---

### 6. ✅ Build & Deployment

- [ ] **Build Configuration**

```tsx
// next.config.ts
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Compression
  compress: true,

  // Image optimization
  images: {
    domains: ["your-cdn.com"], // if using external images
    formats: ["image/avif", "image/webp"],
  },

  // Output
  output: "standalone", // for Docker

  // Experimental
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};
```

- [ ] **Environment Variables**

```env
# Production .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.yourapp.com/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_APP_NAME=CMS Admin
NODE_ENV=production
```

- [ ] **Build Command**

```bash
# Test production build locally
bun run build
bun run start

# Or with Docker
docker build -t cms-admin .
docker run -p 3000:3000 cms-admin
```

---

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Dockerfile
FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["bun", "server.js"]
```

### docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=https://api.yourapp.com/api
      - NEXT_PUBLIC_API_TIMEOUT=30000
    restart: unless-stopped
```

---

## ☁️ Deployment Platforms

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Environment Variables:**

- Dashboard → Settings → Environment Variables
- Add all `NEXT_PUBLIC_*` variables

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### AWS / DigitalOcean / VPS

1. Build Docker image
2. Push to registry
3. Pull & run on server
4. Setup reverse proxy (Nginx)
5. SSL certificate (Let's Encrypt)

**Nginx Config:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 Monitoring & Analytics

### Performance Monitoring

```bash
bun add @vercel/analytics
```

```tsx
// pages/_app.tsx
import { Analytics } from "@vercel/analytics/react";

<Analytics />;
```

### User Analytics

```bash
bun add @vercel/speed-insights
```

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

<SpeedInsights />;
```

### Custom Metrics

```tsx
// lib/metrics.ts
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== "undefined") {
    // Google Analytics
    window.gtag?.("event", eventName, properties);

    // Or Plausible
    window.plausible?.(eventName, { props: properties });
  }
};

// Usage
trackEvent("user_created", { role: "admin" });
```

---

## 🔒 Backend .NET Production

### CORS (Production)

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Production", builder =>
    {
        builder.WithOrigins("https://yourapp.com") // Specific origin
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

app.UseCors("Production");
```

### Rate Limiting

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
    });
});

app.UseRateLimiter();
```

### Logging

```csharp
builder.Services.AddLogging(config =>
{
    config.AddConsole();
    config.AddDebug();
    // Add Sentry/Application Insights
});
```

---

## ✅ Final Checklist

### Code Quality

- [ ] No console.logs in production code
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Code formatted (Prettier)
- [ ] Unused imports removed

### Testing

- [ ] All features tested manually
- [ ] Critical flows have tests
- [ ] Mobile responsive checked
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

### Documentation

- [ ] README updated
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Deployment steps documented

### Performance

- [ ] Lighthouse score > 90
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Database queries optimized

### Security

- [ ] No hardcoded secrets
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Input validation everywhere

### Monitoring

- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured
- [ ] Logging configured
- [ ] Uptime monitoring (UptimeRobot)

---

## 🎉 Launch!

```bash
# Final build test
bun run build
bun run start

# Deploy to production
vercel --prod
# or
railway up
# or
docker-compose up -d
```

---

## 📞 Post-Launch

1. **Monitor errors** di Sentry dashboard
2. **Check analytics** untuk user behavior
3. **Monitor performance** dengan Lighthouse/Vercel Analytics
4. **Setup alerts** untuk downtime
5. **Regular backups** database
6. **Security updates** dependencies
7. **User feedback** collection

---

**🚀 Selamat! Aplikasi sudah production-ready!**

Jangan lupa:

- Backup database secara regular
- Monitor error logs
- Update dependencies secara berkala
- Collect user feedback untuk improvements

Good luck! 🎉
