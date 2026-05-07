import { useLayoutEffect } from "react";
import type { RefObject } from "react";

export function useAutoResizeTextarea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string,
  maxHeight = 220
): void {
  useLayoutEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    const next = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${next}px`;
  }, [ref, value, maxHeight]);
}
