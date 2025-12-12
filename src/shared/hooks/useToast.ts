// Toast Notification Hook - Simple wrapper around Mantine notifications
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import { createElement } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  autoClose?: number | false;
}

const iconMap = {
  success: createElement(IconCheck, { size: 18 }),
  error: createElement(IconX, { size: 18 }),
  warning: createElement(IconAlertCircle, { size: 18 }),
  info: createElement(IconInfoCircle, { size: 18 }),
};

const colorMap = {
  success: "green",
  error: "red",
  warning: "yellow",
  info: "blue",
};

export const useToast = () => {
  const show = ({
    title,
    message,
    type = "info",
    autoClose = 4000,
  }: ToastOptions) => {
    notifications.show({
      title,
      message,
      color: colorMap[type],
      icon: iconMap[type],
      autoClose,
      withCloseButton: true,
      styles: {
        root: {
          borderLeft: `4px solid var(--mantine-color-${colorMap[type]}-6)`,
        },
      },
    });
  };

  const success = (message: string, title?: string) => {
    show({ message, title, type: "success" });
  };

  const error = (message: string, title?: string) => {
    show({ message, title: title || "Error", type: "error" });
  };

  const warning = (message: string, title?: string) => {
    show({ message, title, type: "warning" });
  };

  const info = (message: string, title?: string) => {
    show({ message, title, type: "info" });
  };

  const promise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return notifications.show({
      loading: true,
      title: messages.loading,
      message: "Please wait...",
      autoClose: false,
      withCloseButton: false,
    });
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    promise,
  };
};
