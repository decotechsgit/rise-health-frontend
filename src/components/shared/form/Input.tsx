import clsx from "clsx";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  statusMessage?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;

  // Classes
  containerClass?: string;
  labelClass?: string;
  inuputContainerClass?: string;
  inputClass?: string;
  errorTextClass?: string;
}

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  containerClass,
  labelClass,
  inuputContainerClass,
  inputClass,
  errorTextClass,

  statusMessage,
  prefix,
  suffix,
  disabled,
}: InputProps) => {
  return (
    <div className={clsx("flex w-full flex-col", containerClass)}>
      {label && (
        <label
          className={clsx(
            "mb-[6px] block text-[12px] leading-[26px] font-[600] tracking-[0px] text-[#1E1F21] sm:mb-[6px] md:mb-[8px] lg:mb-[8px] lg:text-[16px] xl:mb-[8px]",
            inter.className,
            labelClass
          )}
        >
          {label}
        </label>
      )}
      <div className={clsx("relative", inuputContainerClass)}>
        {prefix && (
          <span className="absolute top-1/2 left-[18px] -translate-y-1/2 [&>svg]:block [&>svg]:align-middle [&>svg]:text-[#272725]">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "min-h-[48px] w-full rounded-[8px] border-[1px] border-[#525558] bg-none p-[12px] text-[12px] leading-none font-[400] text-[#272725] outline-slate-500 placeholder:font-[400] placeholder:text-[#525558] focus:bg-white lg:text-[16px]",
            prefix && "pl-[48px]",
            suffix && "pr-[48px]",
            inter.className,
            inputClass
          )}
          disabled={disabled}
        />
        {suffix && (
          <span className="absolute top-1/2 right-[18px] -translate-y-1/2 [&>svg]:block [&>svg]:align-middle [&>svg]:text-[#272725]">
            {suffix}
          </span>
        )}
      </div>
      {statusMessage && (
        <p
          className={clsx(
            "mt-[4px] text-[#FE7A95]",
            inter.className,
            errorTextClass
          )}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
