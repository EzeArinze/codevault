import { useEffect } from "react";

import { Dispatch, SetStateAction } from "react";

export function useHotkeyToggle(
  setOpen: Dispatch<SetStateAction<boolean>>,
  key: string = "k",
  withMetaOrCtrl: boolean = true
) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        (!withMetaOrCtrl || e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        if (typeof setOpen === "function") {
          setOpen((open: boolean) => !open);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, key, withMetaOrCtrl]);
}
