"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { PAGES_ROUTES } from "../../../constants/routes.constants";
import { getFirstLetter } from "../../../lib/utils";
import CircleCard from "../../shared/cards/CircleCount.card";
import Row from "../../shared/row";
import TextElement from "../../shared/typography/TextElement.typo";

interface ICheckEmailWrapper {
  email: string;
}
const CheckEmailWrapper: React.FC<ICheckEmailWrapper> = ({ email }) => {
  const router = useRouter();

  // disaply the page for 10 sec and then redirect to login page
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(PAGES_ROUTES.login);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [router]);

  return (
    <>
      <TextElement as="h1">Check your inbox</TextElement>
      <TextElement
        as="h3"
        className="mt-[6px] lg:mt-[8px] text-[14px] lg:text-[16px]"
      >
        We sent you a link to reset your password.
      </TextElement>

      <Row className="items-center gap-[8px] lg:gap-2 mt-[16px] lg:mt-[24px]">
        <CircleCard count={getFirstLetter(email)} />

        <TextElement as="h6">{email}</TextElement>
      </Row>
    </>
  );
};

export default CheckEmailWrapper;
