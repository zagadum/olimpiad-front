import { SelectOption } from "@/shared/ui/select";
import { PL_URL, UK_URL, EN_URL } from "@/shared/config";

export const langOptions: SelectOption[] = [
  {id: 1, value: "uk", label: "UA"},
  {id: 2, value: "pl", label: "PL"},
  {id: 3, value: "en", label: "EN"}
]

export const platformUrl = {
  uk: UK_URL,
  pl: PL_URL,
  en: EN_URL,
}
