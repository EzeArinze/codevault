import { Dispatch, SetStateAction } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "../../ui/command";
import { useQueryState } from "nuqs";
import { useHotkeyToggle } from "@/hooks/use-hot-key";

interface DashboardSearchCommandProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const DashboardSearchCommand = ({
  open,
  setOpen,
}: DashboardSearchCommandProps) => {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });

  useHotkeyToggle(setOpen ?? (() => {}), "k", true);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type or search for your snippet..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
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
