import homeIcon from "@/shared/assets/icons/home.svg";
import homeworkIcon from "@/shared/assets/icons/homework.svg";
import trainingIcon from "@/shared/assets/icons/training.svg";
import olympiadIcon from "@/shared/assets/icons/olympiad.svg";
import { TFunction } from "i18next";

export const getNavItems = (t: TFunction<"translation", undefined>) => [
  {
    icon: homeIcon,
    label: t("sidebar.home"),
    link: "https://memory.firm.kiev.ua/student",
  },
  {
    icon: homeworkIcon,
    label: t("sidebar.homework"),
    // link: "/homework",
    link: "https://memory.firm.kiev.ua/student/hometask",
  },
  {
    icon: trainingIcon,
    label: t("sidebar.training"),
    // link: "/training",
    link: "https://memory.firm.kiev.ua/student/traning/create",
  },
  {
    icon: olympiadIcon,
    label: t("sidebar.olympiads"),
    link: "/olympiads",
  },
];
