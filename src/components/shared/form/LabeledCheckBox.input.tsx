import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface Option {
  value: string;
  label: string;
}

export interface IProps {
  name: string;
  label?: string;
  rules?: TValidationRules;
  register: UseFormRegister<FormValuesType>;
  options?: Option[];
  initialValues?: Record<string, string | boolean | number | string[]>
  className?: string;
  errors?: FieldErrors<FormValuesType>;
}

const LabeledCheckbox: React.FC<IProps> = ({
  name,
  label,
  rules,
  register,
  options,
  initialValues,
  className = "",
  errors,
}) => {

  let checkboxValues: string[];
  if (initialValues) checkboxValues = initialValues[name] as string[];

  return (
    <div className={`flex flex-col ${className}`}>
      {
        options ?
          options.map((item, index) => (
            <Row className="relative items-center" key={index}>
              <input
                type="checkbox"
                id={name}
                value={item.value}
                defaultChecked={checkboxValues ? checkboxValues.includes(item.value) : false}
                {...register(name, rules)}
                className="peer size-[14px] flex-shrink-0 appearance-none rounded-[4px] border border-[#2D2F32] checked:border-transparent checked:bg-black focus:outline-none lg:size-[18px]"
              />
              <svg
                className="pointer-events-none absolute hidden h-[10px] w-[10px] translate-x-0.5 text-center text-white peer-checked:block lg:h-[14px] lg:w-[14px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>

              <TextElement as="span" className="ml-2 text-sm">
                {item.label}
              </TextElement>

            </Row>
          ))
          :
          <Row className="relative items-center">
            <input
              type="checkbox"
              id={name}
              {...register(name, rules)}
              className="peer size-[14px] flex-shrink-0 appearance-none rounded-[4px] border border-[#2D2F32] checked:border-transparent checked:bg-black focus:outline-none lg:size-[18px]"
            />
            <svg
              className="pointer-events-none absolute hidden h-[10px] w-[10px] translate-x-0.5 text-center text-white peer-checked:block lg:h-[14px] lg:w-[14px]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>

            {label && (
              <TextElement as="span" className="ml-2 text-sm">
                {label}
              </TextElement>
            )}
          </Row>
      }

      {errors?.[name] && errors?.[name]?.message && (
        <TextElement as="span" className="mt-1 text-sm text-[#FE7A95]">
          {errors[name].message as string}
        </TextElement>
      )}
    </div>
  );
};

export default LabeledCheckbox;
