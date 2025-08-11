"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";

import IconButton from "@/components/shared/button";
import LabeledInput from "@/components/shared/form/Labeled.input";
import TextElement from "@/components/shared/typography/TextElement.typo";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import { authService } from "@api/auth.service";
import CircleCard from "@components/shared/cards/CircleCount.card";
import Row from "@components/shared/row";

import { getFirstLetter } from "@/lib/utils";

const SetPasswordClientWrapper = ({
  email,
  token,
  isExpired,
}: {
  email: string;
  token: string;
  isExpired: boolean;
}) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(10);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!email) {
      router.push(PAGES_ROUTES.login);
    }
  }, [email, router]);
  useEffect(() => {
    if (!isExpired) return;
    if (timer === 0) {
      router.push(PAGES_ROUTES.login);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isExpired, timer, router]);

  if (isExpired) {
    return (
      <>
        <TextElement as="h2">Link is expired or already used.</TextElement>
        <TextElement as="h2" className="mt-2">
          Redirecting you to login page in {timer} second
          {timer !== 1 ? "s" : ""}...
        </TextElement>
      </>
    );
  }

  const passwordValue = watch("password");
  const passwordStrength = passwordValue ? zxcvbn(passwordValue).score : 0;

  const rulesChecklist = [
    {
      label: "8 characters minimum",
      passed: passwordValue?.length >= 8,
    },
    {
      label: "Uppercase and lowercase letters",
      passed: /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue),
    },
    {
      label: "One symbol",
      passed: /[^A-Za-z0-9]/.test(passwordValue),
    },
  ];

  const getStrengthText = (score: number) => {
    return ["Too weak", "Weak", "Fair", "Good", "Strong"][score];
  };

  const onSubmit = async (data: FieldValues) => {
    setIsProcessing(true);

    try {
      await authService.updatePassword(token, data.password);
      toast.success("Password updated successfully");
      router.push(PAGES_ROUTES.login);
      setIsProcessing(false);
    } catch (errorMessage) {
      toast.error(String(errorMessage), { toastId: "set-password-failed" });
      setIsProcessing(false);
      reset();
      router.push(PAGES_ROUTES.loginPassword);
    }
  };

  return (
    <>
      <TextElement as="h1">Create your password</TextElement>
      <Row className="mt-[6px] items-center gap-[8px] md:mt-[8px] lg:gap-2">
        <CircleCard
          count={getFirstLetter(email || "")}
          className="size-[28px] !bg-[#00CDA6] lg:size-[34px]"
        />
        <TextElement as="h6">{email}</TextElement>
      </Row>
      {[
        {
          name: "password",
          label: "Password",
          placeHolder: "Create password",
          type: "password",
          rules: {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: {
              hasUpperCase: (value: string) =>
                /[A-Z]/.test(value) || "Must include an uppercase letter",
              hasLowerCase: (value: string) =>
                /[a-z]/.test(value) || "Must include a lowercase letter",
              hasSpecialChar: (value: string) =>
                /[^A-Za-z0-9]/.test(value) ||
                "Must include a special character",
            },
          },
          showErrors: false,
        },
      ].map((item, index) => (
        <LabeledInput
          key={index}
          name={item.name}
          label={item.label}
          register={register}
          placeHolder={item?.placeHolder}
          type={item.type}
          defaultValue=""
          validationRules={item.rules}
          errors={errors}
          containerClassName="mt-[30px] lg:mt-[40px] !mb-0"
          showErrors={false}
        />
      ))}

      {passwordValue && (
        <>
          {/* Strength bar */}
          <div className="mt-[24px] flex w-full items-center gap-[8px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-[8px] flex-1 rounded-[20px] transition-all duration-300 ${
                  i <= passwordStrength
                    ? [
                        "bg-[#FE7A95]",
                        "bg-[#F59432]",
                        "bg-[#F9C85F]",
                        "bg-[#00CDA6]",
                        "bg-[#00CDA6]",
                      ][passwordStrength]
                    : "bg-[#C7CACE]"
                }`}
              />
            ))}
          </div>

          <TextElement
            as="h5"
            className="mt-[8px] text-right !font-[600]"
          >{`${getStrengthText(passwordStrength)}`}</TextElement>

          <TextElement
            as="h5"
            className="my-[16px] text-[14px] !font-[400] lg:text-[18px]"
          >
            Must contain at least:
          </TextElement>

          <ul className="flex w-full flex-col gap-[6px] lg:gap-[8px]">
            {rulesChecklist.map((rule) => (
              <li
                key={rule.label}
                className={`flex items-center gap-[6px] text-[14px] lg:gap-[8px] lg:text-[18px] ${
                  rule.passed ? "text-[#1E1F21]" : ""
                }`}
              >
                <span className="text-[#525558]">
                  {rule.passed ? (
                    <FaCheckCircle className="size-[20px] text-[#2D2F32]" />
                  ) : (
                    <FaRegCircle className="size-[20px]" />
                  )}
                </span>
                {rule.label}
              </li>
            ))}
          </ul>
        </>
      )}

      <IconButton
        title="Create Password"
        className={`w-full ${
          passwordValue ? "!mt-[24px]" : "!lg:mt-[94px] !mt-[30px]"
        }`}
        disabled={isProcessing}
        handleOnClick={handleSubmit(onSubmit)}
        isLoading={isProcessing}
      />
    </>
  );
};

export default SetPasswordClientWrapper;
