"use client";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";

import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";

const OnboardingTips = ({ tips }: { tips?: string[] }) => {
  const [tipNumber, setTipNumber] = useState(0);
  return (
    <>
      {tips && tips.length > 0 && (
        <div className="mx-auto my-4 w-[90%] rounded-lg border border-[#DDDDDD] bg-[#F8F8F8] p-4">
          <TextElement className={`my-3 ${altform.className}`}>
            Tips
          </TextElement>
          <TextElement as="p" className={`${altform.className} !text-[20px]`}>
            {tips[tipNumber]}
          </TextElement>
          <div className="mt-6 flex justify-between">
            <div className="flex">
              {tips.map((_, index) => (
                <GoDotFill
                  className={`${tipNumber === index ? "text-gray-600" : "text-gray-200"} cursor-pointer`}
                  key={index}
                  onClick={() => setTipNumber(index)}
                />
              ))}
            </div>

            <div>
              <TextElement
                as="span"
                className={`mx-4 ${altform.className} cursor-pointer ${tipNumber > 0 ? "text-gray-600" : "text-gray-400"}`}
                onClick={() =>
                  setTipNumber(tipNumber - 1 >= 0 ? tipNumber - 1 : tipNumber)
                }
              >
                Prev
              </TextElement>
              <TextElement
                as="span"
                className={`${tipNumber + 1 < tips.length ? "text-gray-600" : "text-gray-400"} ${altform.className} cursor-pointer`}
                onClick={() =>
                  setTipNumber(
                    tipNumber + 1 < tips.length ? tipNumber + 1 : tipNumber
                  )
                }
              >
                Next
              </TextElement>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OnboardingTips;
