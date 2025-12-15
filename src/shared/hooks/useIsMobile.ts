import { useMediaQuery } from "@mantine/hooks";

/**
 * Custom hook to detect if the current viewport is mobile size
 * Uses Mantine's breakpoint system (md = 768px)
 *
 * @returns {boolean} true if viewport width is less than 768px (mobile), false otherwise
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)") ?? false;
}
