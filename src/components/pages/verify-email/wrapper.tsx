"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";
import { toast } from "react-toastify";

import RoundedInput from "@/components/shared/form/Rounded.input";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

import { authService } from "@api/auth.service";
import { ApplicationHTTPError } from "@api/client.error";

import { PAGES_ROUTES } from "../../../constants/routes.constants";

interface IFormData {
  digitOne: string;
  digitTwo: string;
  digitThree: string;
  digitFour: string;
  digitFive: string;
  digitSix: string;
}

interface IVerifyEmailWrapper {
  userEmail: string;
  otpCode: string;
}
const VerifyEmailWrapper: React.FC<IVerifyEmailWrapper> = ({
  userEmail,
  otpCode,
}) => {
  const router = useRouter();

  const [resendTimer, setResendTimer] = useState<number>(30);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [runTimer, setRunTimer] = useState<boolean>(false);
  const [borderGreen, setBorderGreen] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendTimer > 0 && runTimer) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendTimer, runTimer]);

  const handleResend = async () => {
    setResendTimer(30); // Restart timer
    setRunTimer(true);
    await authService.resendOtp(userEmail);

    setResendTimer(30); // Restart timer
    setRunTimer(true);
  };

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      const otp = Object.values(data).join("");
      try {
        await authService.verifyEmail(userEmail, otp);
        toast.success("Successfully verified email address!", {
          delay: 1000,
          onClose: () => {
            router.push(
              PAGES_ROUTES.createPassword +
                `?email=${encodeURIComponent(
                  userEmail
                )}&otp=${encodeURIComponent(otp)}`
            );
          },
        });
        setBorderGreen(true);
        setErrorMessage(null);
      } catch (error) {
        if (error instanceof ApplicationHTTPError) {
          setErrorMessage(error.getUserMessage());
        }
      }
    },
    [router, userEmail]
  );

  useEffect(() => {
    if (otpCode && otpCode.length === 6) {
      // Fill the form fields with otpCode digits
      reset({
        digitOne: otpCode[0],
        digitTwo: otpCode[1],
        digitThree: otpCode[2],
        digitFour: otpCode[3],
        digitFive: otpCode[4],
        digitSix: otpCode[5],
      });
      // Submit the form automatically
      handleSubmit(onSubmit)();
    }
  }, [otpCode, reset, handleSubmit, onSubmit]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pasted)) {
      e.preventDefault();
      reset({
        digitOne: pasted[0],
        digitTwo: pasted[1],
        digitThree: pasted[2],
        digitFour: pasted[3],
        digitFive: pasted[4],
        digitSix: pasted[5],
      });
    }
    handleSubmit(onSubmit)();
  };

  type FieldName = keyof IFormData;

  const formFields = [
    {
      name: "digitOne" as FieldName,
      type: "text",
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: "digitTwo" as FieldName,
      type: "text",
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: "digitThree" as FieldName,
      type: "text",
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: "digitFour" as FieldName,
      type: "text",
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: "digitFive" as FieldName,
      type: "text",
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: "digitSix" as FieldName,
      type: "text",
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
  ];

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const ref5 = useRef<HTMLInputElement>(null);
  const ref6 = useRef<HTMLInputElement>(null);

  const inputRefs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const fieldName = formFields[index].name;
    if (e.key === "Backspace" && !watch(fieldName) && index > 0) {
      e.preventDefault();
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleInput = (index: number) => {
    const fieldName = formFields[index].name;
    const value = watch(fieldName);
    if (index < 5 && value) {
      inputRefs[index + 1].current?.focus();
    }

    // Check if all fields are filled
    const currentOtp = formFields.map((field) => watch(field.name)).join("");
    const isComplete = currentOtp.length === 6 && /^[0-9]{6}$/.test(currentOtp);

    if (isComplete) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <TextElement as="h1">Verify your email</TextElement>
      <TextElement as="h3" className="mt-[8px]">
        To complete your account setup, enter the code we&rsquo;ve sent to :
      </TextElement>

      <TextElement as="h6" className="mt-[6px] lg:mt-[8px]">
        {userEmail}
      </TextElement>

      <Row className="my-[30px] items-center gap-[14px] lg:my-[40px] lg:gap-[18px] xl:gap-[24px]">
        {formFields?.map((field, index) => (
          <RoundedInput
            key={index}
            name={field.name}
            control={control}
            errors={errors}
            rules={field.rules}
            type={field.type}
            className={`text-black ${
              errorMessage !== null ? "border-[2px] !border-[#FE7A95]" : ""
            } ${
              borderGreen ? "border-[2px] !border-[#00CDA6] !bg-white" : ""
            } ${watch(field.name) ? "bg-white" : ""}`}
            inputRef={inputRefs[index] as React.RefObject<HTMLInputElement>}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onChange={() => handleInput(index)}
            onPaste={handlePaste}
          />
        ))}
      </Row>

      {errorMessage && (
        <Row className="mt-[-24px] mb-[20px] items-center gap-[6px] lg:mt-[-36px] lg:mb-[40px]">
          <MdOutlineInfo className="size-[12px] text-[#FE7A95] lg:size-[14px]" />

          <TextElement as="h4">{errorMessage}</TextElement>
        </Row>
      )}

      {resendTimer > 0 && runTimer ? (
        <TextElement
          as="span"
          className="text-[14px] text-[#525558] lg:text-[18px]"
        >{`Resend in ${resendTimer}s`}</TextElement>
      ) : (
        <TextElement
          as="p"
          className="text-[14px] text-[#525558] lg:text-[18px]"
        >
          Didn’t receive an email?
          <span
            onClick={handleResend}
            className="ml-[10px] cursor-pointer font-[600] text-[#1E1F21] underline"
          >
            Resend
          </span>
        </TextElement>
      )}
    </>
  );
};

export default VerifyEmailWrapper;
