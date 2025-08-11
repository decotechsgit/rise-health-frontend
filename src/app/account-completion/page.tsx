"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import IconButton from "@/components/shared/button";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import Logo from "@public/black-theme-logo.svg";

const Page = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(PAGES_ROUTES.careerDashboard);
  };

  return (
    <Row className="m-[60px] flex-col items-start justify-center">
      <Image
        src={Logo}
        alt="Rise Logo"
        width={113}
        loading="eager"
        className="mb-[60px] h-[24px] w-[113px] object-cover"
      />

      <TextElement as="h1">
        Your account has been created successfully
      </TextElement>

      <TextElement as="h3" className="my-[40px] text-[#1E1F21]">
        All done — no further action needed.
      </TextElement>

      <IconButton
        title="Proceed to Dashboard"
        className="w-full"
        btnClassName="text-center w-full"
        handleOnClick={handleOnClick}
      />
    </Row>
  );
};

export default Page;
