import { SelectOption } from "@/shared/ui/select";
import { PL_URL, UK_URL } from "@/shared/config";

export const langOptions: SelectOption[] = [
  {id: 1, value: "uk", label: "UA"},
  {id: 2, value: "pl", label: "PL"}
]

export const platformUrl = {
  uk: UK_URL,
  pl: PL_URL,
}
