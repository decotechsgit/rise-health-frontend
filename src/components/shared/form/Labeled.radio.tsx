// CustomRadioGroup.tsx
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormLabel } from "../typography";
import TextElement from "../typography/TextElement.typo";
export interface Option {
  value: string;
  label: string;
}

export interface CustomRadioGroupProps {
  name: string;
  label?: string;
  value?: string;
  options?: Option[];
  validationRules?: TValidationRules;
  register: UseFormRegister<FormValuesType>;
  errors: FieldErrors<FormValuesType>;
  className?: string;
  labelClassName?: string;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  name,
  label,
  errors,
  register,
  options = [],
  validationRules = {},
  className = "",
  labelClassName,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <FormLabel
          htmlFor={name}
          label={label}
          className={`${labelClassName}`}
        />
      )}

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center space-x-2"
          >
            <input
              type="radio"
              value={option.value}
              className="text-blue-600 focus:ring-blue-500"
              {...register(name, validationRules)}
            />

            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

      {errors?.[name] && errors?.[name]?.message && (
        <TextElement as="span" className="mt-[4px] text-[#FE7A95]">
          {errors[name].message as string}
        </TextElement>
      )}
    </div>
  );
};

export default CustomRadioGroup;
