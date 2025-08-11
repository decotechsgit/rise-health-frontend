import TextElement from "@components/shared/typography/TextElement.typo";
import { FiInfo } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { altform } from "@/app/fonts/altform";
import Button from "@components/shared/button";

const steps = [
  {
    step: "1",
    text: (
      <>
        Visit{" "}
        <a
          href="https://proda.servicesaustralia.gov.au"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F59432]"
        >
          proda.servicesaustralia.gov.au
        </a>{" "}
        and click “register”
      </>
    ),
  },
  {
    step: "2",
    text: "Enter your personal details and verify your identity with official documents",
  },
  {
    step: "3",
    text: "Save your PRODA ID and activate account via email link",
  },
  {
    step: "4",
    text: "Login and link your business (ABN) or yourself as an individual",
  },
  {
    step: "5",
    text: "Access the NDIS commission portal with your PRODA login",
  },
];

interface Step1Props {
  setStep: (step: number) => void;
}

const Step1 = ({ setStep }: Step1Props) => {
  return (
    <div className="rounded-xl bg-white p-10 shadow">
      {/* Heading */}
      <TextElement
        className={`${altform.className} text-[40px] !font-[400]`}
        as="h1"
      >
        Create your NDIS PRODA Account
      </TextElement>

      {/* Info Box */}
      <div className="mt-5 flex gap-4 rounded-lg bg-[#FBF7F1] p-4">
        <FiInfo size={40} color="#5C3600" />
        <div className="flex flex-col gap-2">
          <TextElement
            as="p"
            className={`${altform.className}!text-[22px] text-[#5C3600]`}
          >
            What is PRODA?
          </TextElement>
          <TextElement
            as="p"
            className={`${altform.className}!text-[18px] text-[#5C3600]`}
          >
            PRODA (Provider Digital Access) is a secure online identity
            verification system that allows you to access government online
            services, including the NDIS Commission Portal.
          </TextElement>
        </div>
      </div>

      {/* Video Guide */}
      <div className="mt-10 flex w-[626px] items-start gap-7">
        <div className="flex h-[117px] w-[180px] items-center justify-center rounded-md bg-[#E6E5E5]">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FABA5E]">
            <FaPlay className="text-black" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <TextElement
            as="p"
            className={`${altform.className} mb-3 !text-[24px] font-semibold text-[#2D2F32]`}
          >
            Watch video guide
          </TextElement>
          <TextElement
            as="p"
            className={`${altform.className} !text-[18px] tracking-[-0.03em] text-[#6E6E6E]`}
          >
            In this video, I’ll guide you through the process of setting up your
            NDIS PRODA account correctly — the first step in your registration
            journey
          </TextElement>
        </div>
      </div>

      {/* Step Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {steps.map((item, index) => (
          <div
            key={index}
            className="flex min-h-[104px] items-start rounded-md border border-[#E2E2E2] bg-white"
          >
            <div className="h-full border-r border-[#E2E2E2] p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFBF47] text-sm font-bold text-white">
                {item.step}
              </div>
            </div>
            <TextElement
              as="p"
              className={`${altform.className} p-6 !text-[24px] text-[#2D2F32]`}
            >
              {item.text}
            </TextElement>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-end gap-4">
        <Button
          title="  Mark as complete"
          btnClassName="!text-[16px]"
          className="h-[56px] !w-[183px] rounded-sm !border-[#A3A3A3] bg-[#fff] shadow-none"
        />
        <Button
          btnClassName="!text-[16px] !text-white"
          title="Next step"
          className="h-[56px] !w-[124px] rounded-sm border-none bg-[#F59432] shadow-none"
          handleOnClick={() => setStep(2)}
        />
      </div>
    </div>
  );
};

export default Step1;
