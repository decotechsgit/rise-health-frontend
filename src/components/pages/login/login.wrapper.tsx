"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineInfo , MdDone } from "react-icons/md";


import { PAGES_ROUTES } from "@/constants/routes.constants";
import { userService } from "@api/user.service";
import GoogleLoginButton from "@components/layout/social-login/GoogleLogin";
import IconButton from "@components/shared/button";
import Input from "@components/shared/form/Input";
import Row from "@components/shared/row";
import TextElement from "@components/shared/typography/TextElement.typo";

const LoginWrapper = () => {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string }>({
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<{ email: string }>>({});

  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _remember = localStorage.getItem("remember");
      const _email = localStorage.getItem("email");
      if (_remember) {
        const rememberVal = _remember === "true";
        setRemember(rememberVal);
        if (rememberVal && _email) {
          setFormData({ email: _email });
        }
      }
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const validate = (formData: { email: string }) => {
    const errors: Partial<{ email: string }> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email";
    }

    return errors;
  };

  const onSubmit = async () => {
    const errors: Partial<{ email: string }> = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);
    const response = await userService.getUserByEmail(formData.email);
    setIsProcessing(false);
    if (!response) {
      setError("No user found with this email. Please try again");
      return;
    }
    router.push(
      PAGES_ROUTES.loginPassword +
        `?email=${encodeURIComponent(formData.email)}`
    );
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const rememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isValidEmail(String(formData.email))) {
      setRemember(isChecked);
      if (typeof window !== "undefined") {
        if (isChecked) {
          localStorage.setItem("remember", String(isChecked));
          localStorage.setItem("email", String(formData.email));
        } else {
          localStorage.removeItem("remember");
          localStorage.removeItem("email");
        }
      }
    }
  };

  return (
    <>
      <TextElement as="h1">Login</TextElement>
      <TextElement as="h3" className="mt-[8px]">
        Welcome back. Stay on track with confidence.
      </TextElement>

      <Input
        type="email"
        label="Email Address"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        statusMessage={formErrors.email}
        containerClass="mt-[30px] lg:mt-[40px] !mb-0"
        inputClass={
          !isValidEmail(String(formData.email))
            ? ""
            : "!border-green-400 !bg-white focus:outline-[#00CDA6]"
        }
      />

      {error && (
        <Row className="mt-2 items-center gap-[6px]">
          <MdOutlineInfo className="size-[12px] text-[#FE7A95] lg:size-[20px]" />

          <TextElement as="h4" className="">
            {error}
          </TextElement>
        </Row>
      )}

      <Row className="my-[16px] items-center lg:my-[24px]">
        <label className="relative inline-flex items-center">
          <input
            type="checkbox"
            checked={remember}
            onChange={rememberMe}
            className="peer mr-2 size-[14px] flex-shrink-0 appearance-none rounded-[4px] border border-[#2D2F32] bg-transparent checked:border-black checked:bg-black hover:border-black focus:ring-0 focus:outline-none lg:size-[18px]"
          />
          <MdDone className="pointer-events-none absolute top-[2px] left-[3px] hidden size-[10px] text-white peer-checked:block lg:top-[3px] lg:left-[4px] lg:size-[12px]" />
        </label>

        <TextElement as="span">Remember Me</TextElement>
      </Row>

      <IconButton
        title="Continue"
        className={`h-[54px] w-full`}
        isLoading={isProcessing}
        handleOnClick={onSubmit}
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
