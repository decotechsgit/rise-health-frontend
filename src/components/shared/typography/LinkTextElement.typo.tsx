import Link from "next/link";
import React from "react";

const LinkTextElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  link: string;
}> = ({ children, className, link }) => {
  return (
    <Link
      href={link}
      className={`text-[#F59432] underline underline-offset-2 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkTextElement;
