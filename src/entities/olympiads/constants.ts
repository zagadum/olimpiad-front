import { SelectOption } from "@/shared/ui/select";
import international from "@/shared/assets/icons/international.svg";
import ukrainian from "@/shared/assets/icons/ukrainian.svg";
import polish from "@/shared/assets/icons/polish.svg";
import announce from "@/shared/assets/icons/announce.svg";
import spacem from "@/shared/assets/icons/spacem.svg";

export const OLYMPIAD_TYPES: SelectOption[] = [
  {
    id: "0",
    label: "Все",
  },
  {
    id: "1",
    label: "Международные",
    icon: international,
    value: "international",
  },
  {
    id: "2",
    label: "Украинские",
    icon: ukrainian,
    value: "ukrainian",
  },
  {
    id: "3",
    label: "Польские",
    icon: polish,
    value: "polish",
  },
  {
    id: "4",
    label: "Объявление",
    icon: announce,
    value: "announce",
  },
  {
    id: "5",
    label: "Олимпиада SpaceM",
    icon: spacem,
    value: "spacem",
  },
];
