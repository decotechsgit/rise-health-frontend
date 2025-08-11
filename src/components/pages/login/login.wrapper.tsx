"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";

import { emailField } from "@/constants/form-fields.constants";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { userService } from "@api/user.service";
import GoogleLoginButton from "@components/layout/social-login/GoogleLogin";
import IconButton from "@components/shared/button";
import LabeledInput from "@components/shared/form/Labeled.input";
import LabeledCheckbox from "@components/shared/form/LabeledCheckBox.input";
import Row from "@components/shared/row";
import TextElement from "@components/shared/typography/TextElement.typo";

const LoginWrapper = () => {
  const router = useRouter();

  const [isProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm();

  const { email } = watch();

  const onSubmit = async (data: FieldValues) => {
    const response = await userService.getUserByEmail(data.email);
    if (!response) {
      setError("No user found with this email. Please try again");
      return;
    }
    router.push(
      PAGES_ROUTES.loginPassword + `?email=${encodeURIComponent(data.email)}`
    );
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
      <TextElement as="h1">Login</TextElement>
      <TextElement as="h3" className="mt-[8px]">
        Welcome back. Stay on track with confidence.
      </TextElement>

      {[emailField].map((item, index) => (
        <LabeledInput
          key={index}
          defaultValue=""
          label={item.label}
          name={item.name}
          register={register}
          placeHolder={item?.label}
          type={item.type}
          validationRules={item.rules}
          errors={errors}
          containerClassName="mt-[30px] lg:mt-[40px] !mb-0"
          className={
            !isValidEmail(String(email))
              ? ""
              : "!border-green-400 !bg-white focus:outline-[#00CDA6]"
          }
        />
      ))}

      {error && (
        <Row className="mt-2 items-center gap-[6px]">
          <MdOutlineInfo className="size-[12px] text-[#FE7A95] lg:size-[20px]" />

          <TextElement as="h4" className="">
            {error}
          </TextElement>
        </Row>
      )}

      <Row className="my-[16px] items-start lg:my-[24px]">
        <LabeledCheckbox
          className="my-0 mr-[6px] md:my-[3px] lg:mr-[10px]"
          name="isAgree"
          register={register}
          errors={errors}
        />

        <TextElement as="span">Remember Me</TextElement>
      </Row>

      <IconButton
        title="Continue"
        className={`w-full`}
        isLoading={isProcessing}
        handleOnClick={handleSubmit(onSubmit)}
      />

      <Row className="my-[20px] w-full items-center gap-[13px] sm:gap-[20px] md:gap-[30px] lg:my-[24px] lg:gap-[50px] xl:gap-[82px]">
        <div className="my-[23px] h-[1px] flex-grow rounded-[2px] bg-[#C7CACE] lg:h-[2px]" />
        <span className="mx-[10px] my-[10.5px] text-[14px] leading-[26px] font-[400] text-[#2D2F32] lg:text-[18px]">
          or
        </span>
        <div className="h-[1px] flex-grow rounded-[2px] bg-[#C7CACE] lg:h-[2px]" />
      </Row>

      <GoogleLoginButton />

      <Row className="mt-[20px] w-full items-center justify-center lg:mt-[40px]">
        <TextElement
          as="p"
          className="text-[14px] text-[#525558] lg:text-[18px]"
        >
          Need an account?
          <span
            onClick={() => router.push(PAGES_ROUTES.signup)}
            className="ml-[10px] cursor-pointer font-[600] text-[#1E1F21] underline"
          >
            Sign up
          </span>
        </TextElement>
      </Row>
    </>
  );
};

export default LoginWrapper;
