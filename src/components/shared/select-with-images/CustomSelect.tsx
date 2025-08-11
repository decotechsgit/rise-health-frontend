"use client";
import React, { useState, useEffect, useRef } from "react";

import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";

type Option = {
  value: string;
  title: string;
  imgUrl: string;
};

type CustomSelectProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onSelect,
  placeholder = "Select an auditor",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative mx-auto w-full" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[65px] w-full items-center justify-between rounded-lg border border-[#525558] bg-transparent px-4 text-left text-white"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? (
          <div className="flex items-center gap-3">
            <img
              src={selectedOption.imgUrl}
              alt={selectedOption.title}
              className="h-8 w-auto object-cover"
            />
            <TextElement className={`${altform.className}`}>
              {selectedOption.title}
            </TextElement>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 transform" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full rounded-lg border border-[#525558] bg-[#1c1e21] shadow-lg"
          role="listbox"
        >
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-white transition-colors duration-150 hover:bg-[#3a3d40]"
                role="option"
                aria-selected={selectedOption?.value === option.value}
              >
                <img
                  src={option.imgUrl}
                  alt={option.title}
                  className="h-6 w-auto object-cover"
                />
                <TextElement className={`${altform.className} !text-white`}>
                  {option.title}
                </TextElement>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
