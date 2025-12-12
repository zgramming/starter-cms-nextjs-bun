# 🎨 Theme Customization Guide - CMS Admin

## ✅ Yang Sudah Diterapkan

### 1. **Color Scheme - Elegant Green**

```tsx
Primary Color: Green (#22b573)
Color Palette: Professional green tones from light to dark
- Light: #e8f8f0 (backgrounds, hover states)
- Primary: #22b573 (buttons, links, accents)
- Dark: #0a5533 (text, dark mode)
```

**Kenapa Hijau?**

- ✅ Menenangkan dan professional
- ✅ Identik dengan "approval" dan "success"
- ✅ Tidak terlalu mencolok seperti biru/merah
- ✅ Cocok untuk aplikasi admin/management

### 2. **Typography - Inter Font**

```tsx
Font Family: 'Inter' (Google Fonts)
- Clean, modern, dan sangat readable
- Dirancang khusus untuk UI/screen reading
- Excellent letter spacing dan kerning
- Professional look untuk admin dashboard
```

**Font Weights:**

- Light (300): Untuk subtitle/caption
- Regular (400): Body text
- Medium (500): Emphasis
- Semibold (600): Headings
- Bold (700): Important headings

### 3. **Spacing & Layout**

```tsx
Spacing Scale: 0.5rem → 2rem
- xs: 8px - tight spacing
- sm: 12px - compact
- md: 16px - default (balanced)
- lg: 24px - comfortable
- xl: 32px - spacious
```

### 4. **Border Radius - Soft & Modern**

```tsx
Default: md (8px)
- xs: 4px - subtle
- sm: 6px - slight
- md: 8px - balanced ✅
- lg: 12px - rounded
- xl: 16px - very rounded
```

### 5. **Shadows - Subtle & Clean**

```tsx
Shadow Scale: Minimalist approach
- xs: Barely visible (hover states)
- sm: Subtle depth (cards)
- md: Clear separation (modals)
- lg: Elevated elements (dropdowns)
```

---

## 📋 Rekomendasi Untuk Efisiensi & Estetika

### 1. **Consistency (Konsistensi)**

#### ✅ DO's:

- **Gunakan spacing yang konsisten**: Selalu gunakan `xs, sm, md, lg, xl`
- **Stick to color palette**: Jangan tambah warna random
- **Border radius sama**: Semua card/button gunakan `md`
- **Shadow minimal**: Hanya gunakan untuk elevation

#### ❌ DON'Ts:

- Jangan mix custom values (eg: `margin: 13px`)
- Jangan gunakan terlalu banyak shadow
- Avoid inline styles untuk spacing

**Example:**

```tsx
// ✅ Good - Consistent spacing
<Box p="md" m="lg">

// ❌ Bad - Random values
<Box padding="13px" margin="23px">
```

---

### 2. **Visual Hierarchy**

#### Heading Sizes (sudah di-set):

```tsx
h1: 2rem (32px) - Page titles
h2: 1.5rem (24px) - Section titles
h3: 1.25rem (20px) - Subsections
h4: 1.125rem (18px) - Minor headings
```

#### Font Weights:

```tsx
600 (Semibold) - Headings
500 (Medium) - Emphasis, labels
400 (Regular) - Body text
```

#### Text Colors:

```tsx
Primary (#212529) - Main text
Dimmed (#868e96) - Secondary text
Green (#22b573) - Links, actions
```

---

### 3. **White Space (Negative Space)**

**Prinsip:** Lebih banyak white space = Lebih elegan

#### Container Padding:

```tsx
<Container size="xl">
  {" "}
  // Max-width with auto margin
  <Box p="xl"> // Generous padding // Content</Box>
</Container>
```

#### Card/Paper Spacing:

```tsx
<Paper p="md" shadow="xs">
  {" "}
  // Balanced padding
  <Stack gap="md">
    {" "}
    // Consistent gap between elements
    <Title order={2}>Title</Title>
    <Text>Content</Text>
  </Stack>
</Paper>
```

#### Grid Spacing:

```tsx
<Grid gutter="lg">
  {" "}
  // Comfortable spacing
  <Grid.Col span={6}>...</Grid.Col>
</Grid>
```

---

### 4. **Component Styling Best Practices**

#### Buttons:

```tsx
// Primary action - filled
<Button>Tambah</Button>

// Secondary action - outline
<Button variant="outline">Export</Button>

// Tertiary action - subtle
<Button variant="subtle">Cancel</Button>

// Danger action
<Button color="red">Delete</Button>
```

#### Cards:

```tsx
<Card
  shadow="sm"      // Subtle shadow
  padding="lg"     // Comfortable padding
  radius="md"      // Soft corners
  withBorder       // Clean separation
>
```

#### Tables:

```tsx
<Table
  striped           // Better readability
  highlightOnHover  // Interactive feedback
  withTableBorder   // Clear boundary
  withColumnBorders={false} // Cleaner look
>
```

---

### 5. **Color Usage Guidelines**

#### Primary Green - When to use:

- ✅ Primary buttons (Tambah, Submit)
- ✅ Active states (selected menu)
- ✅ Links dan clickable elements
- ✅ Success states
- ✅ Icons untuk positive actions

#### Gray Scale - When to use:

- ✅ Text (dark gray)
- ✅ Borders (light gray)
- ✅ Backgrounds (very light gray)
- ✅ Disabled states (medium gray)

#### Accent Colors:

```tsx
Yellow (#fcc419) - Edit actions
Red (#fa5252) - Delete actions
Blue (#339af0) - View/Info actions
```

---

### 6. **Responsive Design**

#### Breakpoints:

```tsx
xs: 576px  - Mobile
sm: 768px  - Tablet
md: 992px  - Small laptop
lg: 1200px - Desktop
xl: 1400px - Large desktop
```

#### Grid Responsive:

```tsx
<Grid>
  <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
    // Mobile: full width // Tablet: half width // Desktop: third width
  </Grid.Col>
</Grid>
```

---

### 7. **Accessibility (A11y)**

✅ **Sudah Diterapkan:**

- `autoContrast: true` - Auto adjust text color
- `luminanceThreshold: 0.3` - Ensure readability
- Focus ring visible untuk keyboard navigation

#### Best Practices:

```tsx
// Always provide labels
<TextInput label="Email" />

// Use aria-label for icon buttons
<ActionIcon aria-label="Delete">
  <IconTrash />
</ActionIcon>

// Semantic HTML
<Title order={1}> // Use heading hierarchy
```

---

### 8. **Performance Optimization**

#### Lazy Loading:

```tsx
// Untuk images
<Image src="/image.jpg" loading="lazy" />;

// Untuk components
const HeavyComponent = lazy(() => import("./Heavy"));
```

#### Memoization:

```tsx
// Prevent unnecessary re-renders
const expensiveValue = useMemo(() => computeExpensiveValue(data), [data]);
```

---

## 🎯 Checklist Untuk Setiap Halaman Baru

### Visual:

- [ ] Gunakan consistent spacing (md, lg, xl)
- [ ] Card dengan shadow="sm" dan radius="md"
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] White space yang cukup

### Interaction:

- [ ] Hover states untuk buttons/links
- [ ] Loading states untuk async actions
- [ ] Error states dengan pesan jelas
- [ ] Success feedback (toast/notification)

### Accessibility:

- [ ] Labels untuk semua inputs
- [ ] Aria-labels untuk icon buttons
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient

### Performance:

- [ ] Images lazy-loaded
- [ ] Large lists virtualized
- [ ] Debounce search inputs
- [ ] Memoize expensive computations

---

## 🎨 Quick Reference - Component Defaults

### Already Configured (Default Props):

```tsx
Button:
  radius: "md"

Card:
  radius: "md"
  shadow: "sm"
  withBorder: true

Paper:
  radius: "md"
  shadow: "xs"

Input (TextInput, Select, etc):
  radius: "md"

Table:
  striped: true
  highlightOnHover: true
  withTableBorder: true
  withColumnBorders: false
```

**Artinya:** Anda tidak perlu set props ini setiap kali, sudah default!

---

## 💡 Pro Tips

### 1. **Less is More**

- Jangan gunakan terlalu banyak warna
- Stick to green + gray scale + accent colors
- Maximum 3 shadows: xs (hover), sm (default), md (elevated)

### 2. **Consistent Spacing**

- Gunakan multiples of 8px (md = 16px)
- Stack gap: md (16px) untuk vertical spacing
- Grid gutter: lg (24px) untuk horizontal spacing

### 3. **Typography Scale**

- Body text: default size
- Small text: size="sm" (labels, captions)
- Large text: size="lg" (emphasis)
- Headings: use Title component dengan order

### 4. **Interactive Feedback**

- Buttons: show loading state
- Forms: show validation errors
- Tables: highlight on hover
- Cards: subtle shadow on hover (optional)

### 5. **Mobile-First**

- Start dengan mobile layout
- Use responsive Grid.Col span
- Collapse sidebar on mobile
- Stack elements vertically

---

## 🔧 Advanced Customization

### Custom Color Shades:

Jika perlu warna custom, gunakan format ini:

```tsx
colors: {
  brand: [
    '#e6f9f5', // 0 - lightest
    '#ccf3eb',
    '#99e7d6',
    '#66dcc2',
    '#33d0ae',
    '#00c49a', // 5 - primary
    '#00a07e',
    '#007c62',
    '#005846',
    '#00342a', // 9 - darkest
  ],
}
```

### Custom Component Styles:

```tsx
components: {
  Button: {
    styles: (theme) => ({
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: theme.shadows.md,
        },
      },
    }),
  },
}
```

---

## 📊 Before vs After Comparison

### Before (Default Next.js):

- ❌ Tailwind config bentrok
- ❌ Generic blue theme
- ❌ System fonts
- ❌ No consistent spacing
- ❌ Random shadows

### After (Current Setup):

- ✅ Clean, no conflicts
- ✅ Professional green theme
- ✅ Inter font (premium look)
- ✅ Mantine spacing scale
- ✅ Minimal, consistent shadows

---

## 🚀 Next Steps (Opsional)

### Dark Mode Support:

```tsx
<MantineProvider theme={theme} defaultColorScheme="light">
  // Enable dark mode toggle
</MantineProvider>
```

### Custom Animations:

```tsx
// Add to globals.css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}
```

### Theme Variants:

```tsx
// Light theme (default)
// Dark theme (optional)
// High contrast theme (accessibility)
```

---

**Summary:** Tema sudah dioptimalkan untuk simple, minimalis, dan elegan. Fokus pada konsistensi, white space, dan minimalis visual hierarchy untuk hasil terbaik! 🎨✨
