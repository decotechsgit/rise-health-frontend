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

      <TextElement as="h3" className="mt-[8px] ">
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
                : "!border-green-400 border-[2px] focus:outline-[#00CDA6]"
            }
          />
        ))}
        {error && (
          <Row className="mt-2 items-center gap-[6px]">
            <MdOutlineInfo className="text-[#FE7A95] size-[12px] lg:size-[20px]" />

            <TextElement as="h4" className="">
              {error}
            </TextElement>
          </Row>
        )}

        <Row className="items-start my-[16px] lg:my-[24px]">
          <LabeledCheckbox
            className="mr-[6px] lg:mr-[10px] my-0 md:my-[3px]"
            name="isAgree"
            register={register}
            errors={errors}
          />

          <TextElement as="p">
            I agree to all the
            <span
              className="underline mx-[6px] cursor-pointer"
              onClick={() => setShowTermsModal(true)}
            >
              Terms of Service
            </span>
            and
            <span
              className=" underline cursor-pointer ml-[6px]"
              onClick={() => setShowPolicyModal(true)}
            >
              Privacy Policy
            </span>
          </TextElement>
        </Row>

        <IconButton
          title="Create Account"
          className=" w-full"
          disabled={isProcessing || !isAgree || !isValidEmail(String(email))}
          handleOnClick={handleSubmit(onSubmit)}
          type="submit"
          isLoading={isProcessing}
        />
      </form>

      <Row className=" items-center w-full my-[20px] lg:my-[24px] gap-[40px] sm:gap-[40px] md:gap-[82px] lg:gap-[82px] xl:gap-[82px]">
        <div className="flex-grow h-[1px] lg:h-[2px] rounded-[2px] bg-[#C7CACE] my-[23px]" />
        <span className="mx-[10px] my-[10.5px] text-[14px] lg:text-[18px] text-[#2D2F32] font-[400] leading-[26px] ">
          or
        </span>
        <div className="flex-grow h-[1px] lg:h-[2px] rounded-[2px] bg-[#C7CACE]" />
      </Row>

      <GoogleLoginButton />

      <Row className="mt-[20px] lg:mt-[40px] w-full justify-center items-center">
        <TextElement
          as="p"
          className="text-[#525558] text-[14px] lg:text-[18px]"
        >
          Already have an account?
          <span
            onClick={() => {
              router.push(PAGES_ROUTES.login);
            }}
            className="text-[#1E1F21] ml-[10px] underline font-[600] cursor-pointer"
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
