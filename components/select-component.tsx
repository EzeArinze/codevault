import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.ComponentProps<typeof Select> {
  values: Option[];
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

function SelectComponent({
  values,
  id,
  label,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label htmlFor={id || "select"}>{label}</Label>}
      <Select {...props}>
        <SelectTrigger id={id || "select"} className={cn(className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((value, index) => {
            return (
              <SelectItem value={value.value} key={index}>
                {value.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectComponent;
