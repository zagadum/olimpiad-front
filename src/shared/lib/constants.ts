import homeIcon from "@/shared/assets/icons/home.svg";
import i18n from "@/shared/i18n";
import homeworkIcon from "@/shared/assets/icons/homework.svg";
import trainingIcon from "@/shared/assets/icons/training.svg";
import olympiadIcon from "@/shared/assets/icons/olympiad.svg";

export const navItems = [
  {
    icon: homeIcon,
    label: i18n.t("sidebar.home"),
    link: "https://memory.firm.kiev.ua/student",
  },
  {
    icon: homeworkIcon,
    label: i18n.t("sidebar.homework"),
    link: "/homework",
  },
  {
    icon: trainingIcon,
    label: i18n.t("sidebar.training"),
    link: "/training",
  },
  {
    icon: olympiadIcon,
    label: i18n.t("sidebar.olympiads"),
    link: "/olympiads",
  },
];
