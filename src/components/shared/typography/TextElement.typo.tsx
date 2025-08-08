import clsx from "clsx";
import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({ subsets: ["vietnamese"] });

type TextVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "blockquote"
  | "small"
  | "strong"
  | "em";

// Default Tailwind utility classes per element
const defaultClasses: Record<TextVariants, string> = {
  h1: "text-[#1E1F21] font-[600] text-[32px] lg:text-[40px] leading-[42px] lg:leading-[52px]", // page's main heading e.g Create your account
  h2: "",
  h3: "text-[#525558] font-[400] text-[14px] lg:text-[18px] leading-[26px] tracking-[0px]",
  h4: "text-[12px] lg:text-[14px] text-[#2D2F32]", // for error messages
  h5: "text-[12px] lg:text-[16px] font-[600] text-[#1E1F21]", // for password strength
  h6: "text-[14px] lg:text-[18px] font-[400] text-[#1E1F21] leading-[26px]", // for email
  p: "text-[12px] lg:text-[16px] font-[400] leading-[16px] md:leading-[26px] text-[#1E1F21]",
  span: "text-[12px] lg:text-[16px] leading-[26px] text-[#272725] font-[400]",
  label: "",
  blockquote: "",
  small: "text-xs text-gray-500",
  strong: "font-bold",
  em: "italic",
};

interface TextElementProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextVariants;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TextElement: React.FC<TextElementProps> = ({
  as = "p",
  children,
  className,
  style,
  ...rest
}) => {
  const Component = as;
  const defaultClass = defaultClasses[as] || "";

  return (
    <Component
      className={`${clsx(defaultClass, className)} ${montserrat.className}`}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TextElement;
