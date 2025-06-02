import { Dispatch, SetStateAction, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "../../ui/command";
// import { useUrlState } from "@/hooks/use-url-state";

interface DashboardSearchCommandProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  // onSearch?: (query: string) => void;
  // onSelect?: (item: string) => void;
  // onClose?: () => void;
}

export const DashboardSearchCommand = ({
  open,
  setOpen,
}: DashboardSearchCommandProps) => {
  //
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen?.((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type or search for your snippet..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
