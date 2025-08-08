import { Inter } from "next/font/google";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { EyeOff } from "@public/svg/eyeoff.svg";
import { EyeOn } from "@public/svg/eyeOn.svg";

import Row from "../row";
import { FormLabel } from "../typography";
import TextElement from "../typography/TextElement.typo";
const inter = Inter({ subsets: ["latin"] });

export interface ILabeledInputProps {
  name: string;
  className?: string;
  placeHolder?: string;
  type: string;
  isForm?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  defaultValue: string;
  label?: string;
  validationRules?: TValidationRules;

  register: UseFormRegister<FormValuesType>;

  errors?: FieldErrors<FormValuesType>;
  showErrors?: boolean;
}

const LabeledInput: React.FC<ILabeledInputProps> = ({
  name,
  className,
  placeHolder,
  type,
  isForm,
  validationRules,
  defaultValue,
  register,
  label,
  labelClassName,
  containerClassName,
  errors,
  showErrors = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Row className={`mb-[16px] w-full flex-col ${containerClassName}`}>
      {label && (
        <FormLabel htmlFor={name} label={label} className={labelClassName} />
      )}

      <div className="relative w-full">
        <input
          id={name}
          // name={name}
          className={`w-full rounded-[8px] border-[1px] border-[#525558] bg-none p-[8px] text-[12px] leading-[26px] font-[400] text-[#272725] outline-slate-500 placeholder:font-[400] placeholder:text-[#525558] focus:bg-white lg:p-[12px] lg:text-[16px] ${
            inter.className
          } ${className} ${isPassword ? "font-mono" : ""}`}
          placeholder={placeHolder}
          {...register(name, validationRules)}
          type={
            isForm ? type : isPassword && !showPassword ? "password" : "text"
          }
          defaultValue={defaultValue}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-500 focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOn /> : <EyeOff />}
          </button>
        )}
      </div>

      {showErrors && errors?.[name] && errors?.[name]?.message && (
        <TextElement as="span" className="mt-[4px] text-[#FE7A95]">
          {errors[name].message}
        </TextElement>
      )}
    </Row>
  );
};

export default LabeledInput;
