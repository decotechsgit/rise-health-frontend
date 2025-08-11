import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

export interface IFormData {
  digitOne: string;
  digitTwo: string;
  digitThree: string;
  digitFour: string;
  digitFive: string;
  digitSix: string;
}

// Alias for dynamic field keys
export type OTPFieldName = keyof IFormData;

// For strict validation rules typing
export type IOTPValidationRules = RegisterOptions<IFormData, OTPFieldName>;

export interface IRoundedInputProps {
  name: OTPFieldName;
  className?: string;
  placeHolder?: string;
  control: Control<IFormData>;
  rules?: RegisterOptions<IFormData, OTPFieldName>;
  errors: FieldErrors<IFormData>;
  type?: string;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: () => void;
  maxLength?: number;
}

const RoundedInput: React.FC<IRoundedInputProps> = ({
  name,
  className,
  placeHolder,
  control,
  rules,
  errors,
  onPaste,
  type = "text",
  inputRef,
  onKeyDown,
  onChange,
  maxLength = 1,
  ...restProps
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  return (
    <Row className="justify-center">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            value={field.value || ""}
            name={name}
            onPaste={onPaste}
            ref={(e) => {
              field.ref(e);
              if (inputRef && e) {
                inputRef.current = e;
              }
            }}
            maxLength={maxLength}
            className={`xs:size-[72px] size-[45px] rounded-[8px] border-[1px] border-[#525558] px-[12px] text-center text-[20px] font-[400] outline-none placeholder:text-[14px] lg:size-[58px] lg:text-[24px] ${
              errors?.[name] ? "border-red-500" : ""
            } ${className}`}
            placeholder={placeHolder}
            type={type}
            onKeyPress={handleKeyPress}
            onKeyDown={onKeyDown}
            onChange={(e) => {
              field.onChange(e);
              onChange?.();
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            {...restProps}
          />
        )}
      />

      {errors?.[name] && errors?.[name]?.message && (
        <TextElement as="span" className="mt-[4px] text-[#FE7A95]">
          {errors[name].message as string}
        </TextElement>
      )}
    </Row>
  );
};

export default RoundedInput;
