"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";

import { emailField } from "@/constants/form-fields.constants";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { authService } from "@api/auth.service";
import GoogleLoginButton from "@components/layout/social-login/GoogleLogin";
import IconButton from "@components/shared/button";
import LabeledInput from "@components/shared/form/Labeled.input";
import LabeledCheckbox from "@components/shared/form/LabeledCheckBox.input";
import PolicyModal from "@components/shared/modals/Privacy.modal";
import TermsModal from "@components/shared/modals/Terms.mdoal";
import Row from "@components/shared/row";
import TextElement from "@components/shared/typography/TextElement.typo";

const SignUpWrapper = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { email, isAgree } = watch();

  const onSubmit = async (data: FieldValues) => {
    setIsProcessing(true);
    setError("");
    const isEmailValid = await authService.validateEmail(data.email);
    setIsProcessing(false);
    if (isEmailValid) {
      setError("This email is already registered");
      return;
    }

    router.push(
      `${PAGES_ROUTES.verifyEmail}?email=${encodeURIComponent(data.email)}`
    );

    setIsProcessing(false);
    // reset();
  };

  return (
    <>
      <TextElement as="h1">Create your account</TextElement>

      <TextElement as="h3" className="mt-[8px]">
        Start your journey to seamless compliance.
      </TextElement>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {[emailField].map((item, index) => (
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
            className={
              !isValidEmail(String(email))
                ? ""
                : "border-[2px] !border-green-400 focus:outline-[#00CDA6]"
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

          <TextElement as="p">
            I agree to all the
            <span
              className="mx-[6px] cursor-pointer underline"
              onClick={() => setShowTermsModal(true)}
            >
              Terms of Service
            </span>
            and
            <span
              className="ml-[6px] cursor-pointer underline"
              onClick={() => setShowPolicyModal(true)}
            >
              Privacy Policy
            </span>
          </TextElement>
        </Row>

        <IconButton
          title="Create Account"
          className="w-full"
          disabled={isProcessing || !isAgree || !isValidEmail(String(email))}
          handleOnClick={handleSubmit(onSubmit)}
          type="submit"
          isLoading={isProcessing}
        />
      </form>

      <Row className="my-[20px] w-full items-center gap-[40px] sm:gap-[40px] md:gap-[82px] lg:my-[24px] lg:gap-[82px] xl:gap-[82px]">
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
          Already have an account?
          <span
            onClick={() => {
              router.push(PAGES_ROUTES.login);
            }}
            className="ml-[10px] cursor-pointer font-[600] text-[#1E1F21] underline"
          >
            Log in
          </span>
        </TextElement>
      </Row>

      {/* Terms Modal */}
      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}

      {/* Policy Modal */}
      {showPolicyModal && (
        <PolicyModal onClose={() => setShowPolicyModal(false)} />
      )}
    </>
  );
};

export default SignUpWrapper;
