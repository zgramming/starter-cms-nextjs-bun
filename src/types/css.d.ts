// Type declarations for CSS imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Mantine CSS modules
declare module "@mantine/core/styles.css";
declare module "@mantine/notifications/styles.css";
declare module "@mantine/modals/styles.css";
