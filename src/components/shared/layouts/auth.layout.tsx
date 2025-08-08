"use client";

import Image from "next/image";

import Row from "@/components/shared/row";

import Logo from "@public/black-theme-logo.svg";
import FlowerImage from "@public/images/flower-image.jpg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Row className="gap-0 overflow-hidden p-[18px] pb-[60px] max-[1920px]:justify-start max-[1024px]:justify-center min-[1921px]:justify-center sm:gap-[0px] sm:p-[30px] md:gap-[30px] md:p-[40px] md:pb-[60px] lg:gap-[50px] lg:p-[40px] xl:gap-[100px] xl:p-[40px] 2xl:gap-[168px] 2xl:p-[60px]">
      {/* Left side image */}
      <div className="hidden w-full max-w-[800px] sm:hidden md:hidden lg:block xl:block">
        <Image
          alt="Side Image"
          loading="eager"
          layout=""
          src={FlowerImage}
          className="aspect-[5/6] h-auto w-full rounded-[40px] object-cover"
        />
      </div>

      <Row className="my-[48px] w-full max-w-[724px] flex-col max-[1024px]:items-center max-[767px]:items-start">
        {/* Logo */}
        <Image
          src={Logo}
          alt="Rise Logo"
          width={113}
          loading="eager"
          className="mb-[30px] h-[24px] w-[113px] object-cover lg:mb-[60px]"
        />
        {/* Page content goes here */}
        {children}
      </Row>
    </Row>
  );
};

export default AuthLayout;
