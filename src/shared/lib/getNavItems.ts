import homeIcon from "@/shared/assets/icons/home.svg";
import homeworkIcon from "@/shared/assets/icons/homework.svg";
import trainingIcon from "@/shared/assets/icons/training.svg";
import olympiadIcon from "@/shared/assets/icons/olympiad.svg";
import { TFunction } from "i18next";
import { PL_URL, UK_URL } from "@/shared/config";

export const getNavItems = (t: TFunction<"translation", undefined>) => [
  {
    icon: homeIcon,
    label: t("sidebar.home"),
    link: {
      uk: `${UK_URL}/student`,
      pl: `${PL_URL}/student`,
    },
  },
  {
    icon: homeworkIcon,
    label: t("sidebar.homework"),
    // link: "/homework",
    link: {
      uk: `${UK_URL}/student/hometask`,
      pl: `${PL_URL}/student/hometask`,
    },
  },
  {
    icon: trainingIcon,
    label: t("sidebar.training"),
    // link: "/training",
    link: {
      uk: `${UK_URL}/student/traning/create`,
      pl: `${PL_URL}/student/traning/create`,
    },
  },
  {
    icon: olympiadIcon,
    label: t("sidebar.olympiads"),
    link: {
      uk: "/olympiads",
      pl: "/olympiads",
    },
  },
];
