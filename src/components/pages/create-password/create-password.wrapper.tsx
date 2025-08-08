"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";
import zxcvbn from "zxcvbn";

import IconButton from "@/components/shared/button";
import CircleCard from "@/components/shared/cards/CircleCount.card";
import LabeledInput from "@/components/shared/form/Labeled.input";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

import { signupAction } from "@/actions/auth.actions";
import {
  fullNameField,
  passwordField,
} from "@/constants/form-fields.constants";

import { getFirstLetter } from "@/lib/utils";


interface ICreatePasswordWrapper {
  email: string;
  otp: string;
}

const CreatePasswordWrapper = ({ email, otp }: ICreatePasswordWrapper) => {
  const [state, formAction, isProcessing] = useActionState(signupAction, {
    success: false,
  });

  const { register, watch } = useForm();

  const passwordValue = watch("password");
  const userNameValue = watch("fullName");
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

  const fieldErrors = state?.fieldErrors;

  return (
    <>
      <TextElement as="h1">Create your account</TextElement>
      <form action={formAction} className="w-full">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={otp} />

        <Row className="items-center gap-2 mt-[6px] lg:mt-[8px]">
          <CircleCard count={getFirstLetter(email)} />
          <TextElement as="h6">{email}</TextElement>
        </Row>

        <Row className="flex-col w-full mt-[30px] lg:mt-[40px]">
          {[fullNameField, passwordField].map((item) => (
           <>
             <LabeledInput
               key={item.name}
               name={item.name}
               label={item.label}
               register={register}
               placeHolder={item.placeHolder}
               type={item.type}
               defaultValue={state?.fieldValues?.[item.name] || ""}
               validationRules={item.rules}
               containerClassName={`!mb-0 ${
                 item.name === "password"
                   ? "lg:mt-[24px] xl:mt-[24px] md:mt-[24px] sm:mt-[20px] mt-[20px]"
                   : ""
               }`}
               className={
                 item.name === "fullName" && userNameValue?.length > 5
                   ? "!border-green-400 !bg-white focus:outline-[#00CDA6]"
                   : ""
               }
               showErrors={item.showErrors}
             />
             {fieldErrors && fieldErrors?.[item.name] && (
               <Row className="mt-[8px] mb-[16px] items-center gap-[6px]">
                 <MdOutlineInfo className="text-[#FE7A95] size-[14px]" />
                 <TextElement as="h4">{fieldErrors[item.name]}</TextElement>
               </Row>
             )}
           </>
          ))}

          {passwordValue && (
            <>
              {/* Strength bar */}
              <div className="w-full mt-[24px] flex items-center gap-[8px]">
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
                className="text-right mt-[8px]"
              >{`${getStrengthText(passwordStrength)}`}</TextElement>

              {/* Checklist */}

              <TextElement
                as="h5"
                className="text-[14px] lg:text-[18px] !font-[400] my-[16px]"
              >
                Must contain at least:
              </TextElement>

              <ul className="flex flex-col gap-[6px] lg:gap-[8px]">
                {rulesChecklist.map((rule) => (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-[6px] lg:gap-[8px] text-[14px] lg:text-[18px] ${
                      rule.passed ? "text-[#1E1F21]" : ""
                    }`}
                  >
                    <span className=" text-[#1E1F21]">
                      {rule.passed ? (
                        <FaCheckCircle className="text-[#2D2F32] size-[20px]" />
                      ) : (
                        <FaRegCircle className="text-[#525558] size-[20px]" />
                      )}
                    </span>

                    <span
                      className={`text-[14px] lg:text-[18px] font-[400]
                      ${rule.passed ? "text-[#1E1F21] " : "text-[#525558]"}
                      `}
                    >
                      {rule.label}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Row>

        <IconButton
          title="Create Account"
          type="submit"
          className="w-full mt-[20px] sm:mt-[30px] md:mt-[40px] lg:mt-[40px] xl:mt-[40px]"
          disabled={isProcessing}
          isLoading={isProcessing}
        />
      </form>
    </>
  )
    ;
};

export default CreatePasswordWrapper;
