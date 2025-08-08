import React from "react";

import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";

type SelectedItemProps = {
  name: string;
  id: string;
  handleRemoveItem: (val: string) => void;
};

const SelectedItem = ({ name, handleRemoveItem, id }: SelectedItemProps) => {
  return (
    <div className="mt-7 flex min-h-[63px] w-full items-center justify-between rounded-lg border border-[#DDDDDD] bg-[#F8F8F8] px-4">
      <TextElement as="span" className={`${altform.className} lg:!text-[18px]`}>
        {name}
      </TextElement>
      <div
        onClick={() => {
          handleRemoveItem(id);
        }}
        className="cursor-pointer"
      >
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
            fill="#FF5555"
          />
        </svg>
      </div>
    </div>
  );
};
export default SelectedItem;
