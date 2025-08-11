"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { RotatingLines } from "react-loader-spinner";

import ReactIcon from "../react-icon";

export interface IButton {
  title: string;
  className?: string;
  linkTo?: string;
  handleOnClick?: () => void;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconColor?: string;
  btnClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  lgHeight?: string;
}

const IconButton: React.FC<IButton> = ({
  title,
  className,
  handleOnClick,
  Icon,
  iconColor,
  btnClassName,
  disabled,
  isLoading,
  lgHeight = "54px",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : handleOnClick}
      disabled={disabled}
      className={`flex h-[45px] w-full items-center justify-center gap-1 rounded-[8px] border-[1px] border-[#F9C85F] bg-[#F9C85F] py-[12px] lg:h-[${lgHeight}] ${className} ${
        !disabled ? "cursor-pointer" : "cursor-not-allowed"
      } ${inter.className}`}
    >
      {Icon && (
        <ReactIcon
          Icon={Icon}
          className={`${iconColor ? iconColor : "text-[#F9C85F]"}`}
        />
      )}

      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="35"
          visible={true}
        />
      ) : (
        <span
          className={`text-[14px] leading-[26px] font-[400] text-[#1E1F21] lg:text-[20px] ${btnClassName}`}
        >
          {title}
        </span>
      )}
    </button>
  );
};

export default IconButton;
