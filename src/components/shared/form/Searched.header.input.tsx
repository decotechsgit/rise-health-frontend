"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import TextElement from "@/components/shared/typography/TextElement.typo";

import { altform } from "@/app/fonts/altform";

interface HeaderAction {
  show: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

interface SearchableHeaderProps {
  title: string;
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  titleClassName?: string;

  showSearch?: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchClassName?: string;

  actions?: {
    sort?: HeaderAction;
    filter?: HeaderAction;
    back?: HeaderAction;
    next?: HeaderAction;
  };

  className?: string;
}

const SearchableHeader = function ({
                                     title,
                                     titleAs = "h2",
                                     titleClassName,

                                     showSearch = true,
                                     searchValue,
                                     onSearchChange,
                                     searchPlaceholder = "Search",
                                     searchClassName,

                                     actions = {},
                                     className = "flex justify-between items-center",
                                   }: SearchableHeaderProps) {

  const router = useRouter()
  const handleSearch = (value: string) =>{
    router.push(`?s=${value}`);
  }

  const {
    sort = { show: false },
    filter = { show: false },
    back = { show: false },
    next = { show: false },
  } = actions;

  const hasActions =
    showSearch || sort.show || filter.show || back.show || next.show;

  return (
    <div className={`${className} flex flex-wrap gap-2`}>
      <TextElement as={titleAs} className={`${titleClassName} ${altform.className} text-[16px] md:text-lg lg:text-xl font-semibold`}>
        {title}
      </TextElement>

      {hasActions && (
        <div className="flex items-center space-x-1">
          {showSearch && (
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`${searchClassName} rounded-full border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-gray-200 focus:outline-none`}
              onKeyDown={(e)=>{
                if(e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(searchValue);
                }
              }}
            />
          )}

          {sort.show && (
            <button
              className="rounded-full p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={sort.onClick}
              disabled={sort.disabled}
            >
              <Image
                src="/dashboard/ic_sort.svg"
                alt="Sort"
                width={32}
                height={32}
              />
            </button>
          )}

          {filter.show && (
            <button
              className="rounded-full p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={filter.onClick}
              disabled={filter.disabled}
            >
              <Image
                src="/dashboard/ic_filter.svg"
                alt="Filter"
                width={32}
                height={32}
              />
            </button>
          )}

          {back.show && (
            <button
              className="rounded-full p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={back.onClick}
              disabled={back.disabled}
            >
              <Image
                src="/dashboard/ic_back.svg"
                alt="Previous"
                width={32}
                height={32}
              />
            </button>
          )}

          {next.show && (
            <button
              className="rounded-full p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={next.onClick}
              disabled={next.disabled}
            >
              <Image
                src="/dashboard/ic_next.svg"
                alt="Next"
                width={32}
                height={32}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableHeader;
