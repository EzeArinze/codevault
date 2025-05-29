import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.ComponentProps<typeof Select> {
  values: Option[];
  id?: string;
  label?: string;
  placeholder?: string;
}

function SelectComponent({
  values,
  id,
  label,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id || "select"}>{label}</Label>}
      <Select {...props}>
        <SelectTrigger id={id || "select"}>
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
