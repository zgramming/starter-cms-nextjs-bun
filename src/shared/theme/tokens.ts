// Design Tokens - Single Source of Truth for Design System

export const colors = {
  primary: {
    50: "#e7f5e9",
    100: "#c3e6c8",
    200: "#9dd6a4",
    300: "#76c680",
    400: "#5aba64",
    500: "#40c057", // Main primary color
    600: "#38a84c",
    700: "#2f9e44",
    800: "#2b8a3e",
    900: "#256635",
  },
  success: "#40c057",
  warning: "#fab005",
  error: "#f03e3e",
  info: "#339af0",
  neutral: {
    0: "#ffffff",
    50: "#f8f9fa",
    100: "#e9ecef",
    200: "#dee2e6",
    300: "#ced4da",
    400: "#adb5bd",
    500: "#868e96",
    600: "#495057",
    700: "#343a40",
    800: "#212529",
    900: "#101113",
  },
  semantic: {
    backgroundHover: "rgba(64, 192, 87, 0.05)",
    backgroundActive: "rgba(64, 192, 87, 0.1)",
    borderLight: "#dee2e6",
    borderMedium: "#ced4da",
    textPrimary: "#212529",
    textSecondary: "#868e96",
    textMuted: "#adb5bd",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px",
};

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
    xxxl: "32px",
    display: "48px",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
};

export const shadows = {
  xs: "0 1px 3px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
};

export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

export const breakpoints = {
  xs: "36em", // 576px
  sm: "48em", // 768px
  md: "62em", // 992px
  lg: "75em", // 1200px
  xl: "88em", // 1408px
};

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};
