import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormLabel } from "../typography";
import TextElement from "../typography/TextElement.typo";

export interface CustomTextareaProps {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  defaultValue: string;
  validationRules?: TValidationRules;
  register: UseFormRegister<FormValuesType>;
  errors: FieldErrors<FormValuesType>;
  className?: string;
  formClassName?: string;
}

const LabeledTextarea: React.FC<CustomTextareaProps> = ({
  name,
  id,
  label,
  register,
  errors,
  placeholder = "",
  rows = 4,
  defaultValue,
  validationRules = {},
  className = "",
  formClassName = "",
}) => {
  const baseInputClass =
    formClassName ||
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const errorClass = "border-red-500 focus:ring-red-500 focus:border-red-500";

  return (
    <div className="mb-4">
      {label && <FormLabel htmlFor={name} label={label} />}

      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        defaultValue={defaultValue}
        className={`${baseInputClass} ${
          errors[name] ? errorClass : ""
        } ${className}`}
        {...register(name, validationRules)}
      />

      {errors?.[name] && errors?.[name]?.message && (
        <TextElement as="span" className="mt-[4px] text-[#FE7A95]">
          {errors[name].message as string}
        </TextElement>
      )}
    </div>
  );
};

export default LabeledTextarea;
