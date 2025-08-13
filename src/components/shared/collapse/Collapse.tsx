"use client";

import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

type Items = {
  key: string;
  label: string | React.ReactNode;
  children: string | React.ReactNode;
};

export type CollapseProps = {
  items: Items[];
  activeKey?: string | null;
  defaultActiveKey?: string;
  onChange?: (key: string | null) => void;
};

const Collapse = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
}: CollapseProps) => {
  const isControlled = controlledActiveKey !== undefined;

  const [uncontrolledActiveKey, setUncontrolledActiveKey] = useState<
    string | null
    //   >(null);
  >(defaultActiveKey ?? items[0]?.key ?? null);

  const currentActiveKey = isControlled
    ? controlledActiveKey
    : uncontrolledActiveKey;

  const toggle = (key: string) => {
    const newKey = key === currentActiveKey ? null : key;

    if (isControlled) {
      onChange?.(newKey);
    } else {
      setUncontrolledActiveKey(newKey);
      onChange?.(newKey);
    }
  };

  return (
    <div className="w-full">
      {items.map((item) => {
        const isActive = item.key === currentActiveKey;

        return (
          <div key={item.key} className={"mb-3 w-full"}>
            <header
              onClick={() => toggle(item.key)}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-colors duration-300 hover:bg-gray-50"
            >
              <div className="flex-1">{item.label}</div>
              <div className="px-4">
                <GoChevronDown
                  className={
                    "block text-gray-800 transition-transform duration-300" +
                    (isActive ? " rotate-180" : " rotate-0")
                  }
                />
              </div>
            </header>
            <section
              className={
                "max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out" +
                (isActive ? " max-h-[1000px] opacity-100" : "")
              }
            >
              <div className="p-4">{item.children}</div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Collapse;
