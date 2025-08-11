import Link from "next/link";

import TextElement from "@components/shared/typography/TextElement.typo";

interface INavItem {
  id: string;
  href: string | ((formId: string) => string);
  label: string;
}

interface INavBarProps {
  items: INavItem[];
  activeItem: string;
  className?: string;
}

const NavBar = ({ items, activeItem, className = "" }: INavBarProps) => {
  return (
    <nav
      className={`flex w-full items-center rounded-2xl bg-gray-50 ${className}`}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={typeof item.href === "function" ? item.href("") : item.href}
          replace
          className={`mx-1 flex-1 rounded-xl px-2 py-2 text-center font-medium ${
            activeItem === item.id
              ? "bg-gray-800 text-white"
              : "text-[#525558] text-gray-800 hover:bg-gray-100"
          }`}
        >
          <TextElement className="text-nowrap text-inherit">
            {item.label}
          </TextElement>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
