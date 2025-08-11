"use client";
import router from "next/router";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";
import { toast } from "react-toastify";

import IconButton from "@/components/shared/button";
import LabeledInput from "@/components/shared/form/Labeled.input";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

import { loginPasswordField } from "@/constants/form-fields.constants";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { authService } from "@api/auth.service";

export const PasswordForm = ({ email }: { email: string }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setIsProcessing(true);
    console.log(data);
    reset();
    // dispatch(
    //   userActions.loginRequest({
    //     email: email,
    //     password: data.password,
    //     onSuccess: () => {
    //       toast.success("Login successful, Welcome back!", {
    //         toastId: "login-success",
    //       });

    //       setIsProcessing(false);
    //       reset();
    //       router.push(PAGES_ROUTES.careerDashboard);
    //     },

    //     onError: (errorMessage: string) => {
    //       setError(errorMessage);

    //       setIsProcessing(false);
    //     },
    //   })
    // );
  };

  const handleForgotPassword = async () => {
    try {
      await authService.sendPasswordLink(email);
      router.push(PAGES_ROUTES.loginCheckEmail);
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error("Forgot password error", {
        toastId: "forgot-password-error",
      });
    }
  };

  return (
    <>
      <p
        onClick={() => router.push(PAGES_ROUTES.login)}
        className="mt-[16px] cursor-pointer text-[14px] font-[400] underline lg:mt-[24px] lg:text-[18px]"
      >
        Use another account
      </p>

      {[loginPasswordField].map((item, index) => (
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
          containerClassName={`mt-[30px] lg:mt-[40px] ${
            error ? "!mb-[8px]" : "!mb-[16px]"
          }`}
          className={`${error ? "border-[2px] border-[#FE7A95] bg-white" : ""}`}
        />
      ))}

      {error && (
        <Row className="mt-[px] mb-[16px] items-center gap-[6px]">
          <MdOutlineInfo className="size-[14px] text-[#FE7A95]" />
          <TextElement as="h4">{error}</TextElement>
        </Row>
      )}

      <Row className="w-full justify-end">
        <p
          onClick={handleForgotPassword}
          className="mb-[24px] cursor-pointer text-[14px] font-[400] text-[#1E1F21] underline lg:text-[18px]"
        >
          Forgot password?
        </p>
      </Row>

      <IconButton
        title="Login"
        className="w-full"
        disabled={isProcessing}
        handleOnClick={handleSubmit(onSubmit)}
        isLoading={isProcessing}
      />
    </>
  );
};
