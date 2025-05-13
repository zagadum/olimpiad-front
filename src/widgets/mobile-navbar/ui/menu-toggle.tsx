import { FC } from "react";
import { motion } from "framer-motion";

interface MenuToggleProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const MenuToggle: FC<MenuToggleProps> = ({ isOpen, toggleOpen }) => {
  const burgerPath = "M0 6.58H24 M0 15.92H24";
  const closePath =
    "M3.48528 3.71485L20.4558 20.6854M3.48528 20.6854L20.4558 3.71485";

  return (
    <svg
      onClick={toggleOpen}
      width="24"
      height="24"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <motion.path
        d={isOpen ? closePath : burgerPath}
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};
