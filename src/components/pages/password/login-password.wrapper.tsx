"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";
import { toast } from "react-toastify";

import { loginAction } from "../../../actions/auth.actions";
import { loginPasswordField } from "../../../constants/form-fields.constants";
import { PAGES_ROUTES } from "../../../constants/routes.constants";
import { getFirstLetter } from "../../../lib/utils";
import { authService } from "../../../services/api/auth.service";
import { ApplicationHTTPError } from "../../../services/api/client.error";
import IconButton from "../../shared/button";
import CircleCard from "../../shared/cards/CircleCount.card";
import LabeledInput from "../../shared/form/Labeled.input";
import Row from "../../shared/row";
import TextElement from "../../shared/typography/TextElement.typo";

interface ILoginPasswordWrapper {
  email: string;
}

const LoginPasswordWrapper: React.FC<ILoginPasswordWrapper> = ({ email }) => {
  const router = useRouter();

  const [state, formAction, isProcessing] = useActionState(loginAction, {
    success: false,
  });

  const {
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Reset form when login is successful
  useEffect(() => {
    if (state?.success) {
      reset();
    }
  }, [state?.success, reset]);

  useEffect(() => {
    if (!email) {
      router.push(PAGES_ROUTES.login);
    }
  }, [email, router]);

  const handleForgotPassword = async () => {
    try {
      await authService.sendPasswordLink(email);
      router.push(
        `${PAGES_ROUTES.loginCheckEmail}?email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      if (error instanceof ApplicationHTTPError) {
        toast.error(error.getUserMessage(), {
          toastId: "forgot-password-error",
        });
      }
    }
  };

  const error = state?.error;

  return (
    <>
      <TextElement as="h1">Hi there!</TextElement>

      <form action={formAction} className="w-full">
        <input type="hidden" name="email" defaultValue={email} />

        <Row className="mt-[6px] items-center gap-[8px] lg:mt-[8px] lg:gap-2">
          <CircleCard count={getFirstLetter(email)} />
          <TextElement as="h6">{email}</TextElement>
        </Row>

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
            className={`${
              error ? "border-[2px] border-[#FE7A95] bg-white" : ""
            }`}
            showErrors={false}
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
          type="submit"
          className="w-full"
          disabled={isProcessing}
          isLoading={isProcessing}
        />
      </form>
    </>
  );
};

export default LoginPasswordWrapper;
