import type { Icon } from "@tabler/icons-react";

/**
 * Dynamic icon loader - hanya load icons yang benar-benar dipakai
 * Ini akan di-tree shake oleh bundler, tidak load semua 4000+ icons
 *
 * Performance:
 * - Hanya icons yang diimport disini yang masuk ke bundle
 * - Add/remove icons sesuai kebutuhan dari database
 * - Bundle size optimal, tidak bloat
 */
import {
  IconLayoutDashboard,
  IconSettings,
  IconHelp,
  IconUsers,
  IconShieldLock,
  IconKey,
  IconDatabase,
  IconCategory,
  IconMenu2,
  IconAppWindow,
  IconFileText,
  IconChartBar,
  IconBulb,
  IconBell,
  IconShoppingBag,
  IconTicket,
  IconPlug,
  IconMessage,
  IconClipboardList,
  IconLock,
  IconUserCheck,
  IconFolders,
  IconHome,
  IconBox,
  IconPackage,
  IconTruck,
  IconReceipt,
  IconCoin,
  IconCreditCard,
  IconChartPie,
  IconCalendar,
  IconMail,
  IconPhone,
  IconMapPin,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconDownload,
  IconUpload,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconPlus,
  IconMinus,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
} from "@tabler/icons-react";

/**
 * Icon registry - hanya icons yang terdaftar disini yang akan di-bundle
 * Tambahkan icon baru sesuai kebutuhan dari database
 */
export const iconMap: Record<string, Icon> = {
  IconLayoutDashboard,
  IconSettings,
  IconHelp,
  IconUsers,
  IconShieldLock,
  IconKey,
  IconDatabase,
  IconCategory,
  IconMenu2,
  IconAppWindow,
  IconFileText,
  IconChartBar,
  IconBulb,
  IconBell,
  IconShoppingBag,
  IconTicket,
  IconPlug,
  IconMessage,
  IconClipboardList,
  IconLock,
  IconUserCheck,
  IconFolders,
  IconHome,
  IconBox,
  IconPackage,
  IconTruck,
  IconReceipt,
  IconCoin,
  IconCreditCard,
  IconChartPie,
  IconCalendar,
  IconMail,
  IconPhone,
  IconMapPin,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconDownload,
  IconUpload,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconPlus,
  IconMinus,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
};

/**
 * Get icon component dari string name
 * @param iconName - Nama icon dari database (contoh: "IconDashboard")
 * @returns Icon component atau default icon jika tidak ditemukan
 */
export function getIcon(iconName: string): Icon {
  return iconMap[iconName] || IconFileText; // Default fallback icon
}

/**
 * List semua icon yang tersedia untuk dropdown di admin panel
 * Hanya icons yang sudah di-register yang muncul
 */
export const availableIcons = Object.keys(iconMap).sort();
