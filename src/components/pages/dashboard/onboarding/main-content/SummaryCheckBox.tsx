"use client";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

import { altform } from "@/app/fonts/altform";
import { useOnboarding } from "@/contexts/onboarding-context";


type OnboardingStepTaskProps = {
  step: Step;
};

const SummaryCheckBox = ({
                        step
                      }: OnboardingStepTaskProps) => {
  const title = DOMPurify.sanitize(step.title);

  const {onboarding} = useOnboarding();

  const isChecked = onboarding?.progress?.completedSteps?.includes(step.stepKey) ?? false;

  return (
    <div className="my-5 flex w-full  justify-between items-start gap-5 rounded-lg border border-gray-200 bg-white p-6">

      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <p
            className={`lg:!text-[20px] leading-[16px] font-[400] text-[#1E1F21] md:leading-[26px] !text-14px ${altform.className}`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {step.checkboxTipBar && (
            <div className="group relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0003 14.168C10.2364 14.168 10.4345 14.088 10.5945 13.928C10.7545 13.768 10.8342 13.5702 10.8337 13.3346V10.0013C10.8337 9.76519 10.7537 9.56741 10.5937 9.40797C10.4337 9.24852 10.2359 9.16852 10.0003 9.16797C9.76477 9.16741 9.56699 9.24741 9.40699 9.40797C9.24699 9.56852 9.16699 9.7663 9.16699 10.0013V13.3346C9.16699 13.5707 9.24699 13.7688 9.40699 13.9288C9.56699 14.0888 9.76477 14.1685 10.0003 14.168ZM10.0003 7.5013C10.2364 7.5013 10.4345 7.4213 10.5945 7.2613C10.7545 7.1013 10.8342 6.90352 10.8337 6.66797C10.8331 6.43241 10.7531 6.23464 10.5937 6.07464C10.4342 5.91464 10.2364 5.83464 10.0003 5.83464C9.76422 5.83464 9.56644 5.91464 9.40699 6.07464C9.24755 6.23464 9.16755 6.43241 9.16699 6.66797C9.16644 6.90352 9.24644 7.10158 9.40699 7.26214C9.56755 7.42269 9.76533 7.50241 10.0003 7.5013ZM10.0003 18.3346C8.84755 18.3346 7.76422 18.1157 6.75033 17.678C5.73644 17.2402 4.85449 16.6466 4.10449 15.8971C3.35449 15.1477 2.76088 14.2657 2.32366 13.2513C1.88644 12.2369 1.66755 11.1535 1.66699 10.0013C1.66644 8.84908 1.88533 7.76575 2.32366 6.7513C2.76199 5.73686 3.3556 4.85491 4.10449 4.10547C4.85338 3.35602 5.73533 2.76241 6.75033 2.32464C7.76533 1.88686 8.84866 1.66797 10.0003 1.66797C11.152 1.66797 12.2353 1.88686 13.2503 2.32464C14.2653 2.76241 15.1473 3.35602 15.8962 4.10547C16.6451 4.85491 17.2389 5.73686 17.6778 6.7513C18.1167 7.76575 18.3353 8.84908 18.3337 10.0013C18.332 11.1535 18.1131 12.2369 17.677 13.2513C17.2409 14.2657 16.6473 15.1477 15.8962 15.8971C15.1451 16.6466 14.2631 17.2405 13.2503 17.6788C12.2375 18.1171 11.1542 18.3357 10.0003 18.3346ZM10.0003 16.668C11.8614 16.668 13.4378 16.0221 14.7295 14.7305C16.0212 13.4388 16.667 11.8624 16.667 10.0013C16.667 8.14019 16.0212 6.5638 14.7295 5.27214C13.4378 3.98047 11.8614 3.33464 10.0003 3.33464C8.13921 3.33464 6.56283 3.98047 5.27116 5.27214C3.97949 6.5638 3.33366 8.14019 3.33366 10.0013C3.33366 11.8624 3.97949 13.4388 5.27116 14.7305C6.56283 16.0221 8.13921 16.668 10.0003 16.668Z"
                  fill="#F59432"
                />
              </svg>
              <div
                className={`absolute top-[-152px] left-[-30px] hidden h-[132px] w-[367px] flex-col items-center justify-center rounded-lg bg-[#101010] p-4 text-[#EBEBEB] group-hover:flex ${altform.className}`}
              >
                {step.checkboxTipBar}
              </div>
              <div className="absolute top-[-35px] left-[-4px] hidden group-hover:block">
                <svg
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="15.0039"
                    width="20"
                    height="20"
                    transform="rotate(-45 0 15.0039)"
                    fill="#101010"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*here it begins */}
      <div className={`flex-shrink-0 pt-0.5`}>
        <label className="flex  flex-row items-center gap-2.5 text-black">
          <input
            type="checkbox"
            className="peer hidden"
            disabled={true}
            defaultChecked={isChecked}
          />

          <div
            className={`flex h-6 w-6 items-center justify-center rounded transition ${isChecked ? "bg-[#FABA5E]" : "border-1"}`}
          >
            { isChecked && (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12.6111L8.92308 17.5L20 6.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default SummaryCheckBox;
