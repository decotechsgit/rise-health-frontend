"use client";
import Image from "next/image";
import { useState } from "react";

import TextElement from "@components/shared/typography/TextElement.typo";

interface Props {
  items?: TLegislationLink[];
}

const LegislationItems = ({ items }: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {items?.map((item, index) => (
        <div
          key={`${item.url}-${index}`}
          className="rounded-xl border border-[var(--card-border)] bg-white shadow-sm"
        >
          <button
            className="flex w-full items-center justify-between px-6 py-4 focus:outline-none"
            onClick={() =>
              setOpenId(
                openId === `${item.url}-${index}`
                  ? null
                  : `${item.url}-${index}`
              )
            }
            aria-expanded={openId === `${item.url}-${index}`}
          >
            <TextElement className="text-base font-medium">
              {item.title}
            </TextElement>
            <Image
              src="/form/ic_dropdown.svg"
              alt="Link Icon"
              width={18}
              height={18}
            />
          </button>
          {openId === `${item.url}-${index}` && (
            <div className="px-6 pb-6">
              <div className="mb-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--link-color)] hover:underline"
                    >
                      <span className="text-[var(--url-orange)]">
                        {item.url}
                      </span>
                    </a>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--link-color)] hover:underline"
                    >
                      <Image
                        src="/form/ic_link.svg"
                        alt="Link Icon"
                        width={18}
                        height={18}
                      />
                    </a>
                  </div>
                </div>
                <TextElement className="mt-2 text-base text-[var(--secondary-text)]">
                  {item.description}
                </TextElement>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LegislationItems;
