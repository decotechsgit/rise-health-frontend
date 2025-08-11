import TextElement from "@components/shared/typography/TextElement.typo";
import { FaPlay } from "react-icons/fa";
import { altform } from "@/app/fonts/altform";
import Button from "@components/shared/button";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import AppointmentDrawer from "./AppointmentDrawer";
import { useState } from "react";

const steps = [
  {
    step: "1",
    text: "After submitting your application, choose an approved auditor from NDIS Commission",
  },
  {
    step: "2",
    text: "Compare the timelines and quotes",
  },
  {
    step: "3",
    text: "Once engaged, they’ll send a service agreement and schedule your audit",
  },
  {
    step: "4",
    text: "Make sure they are accredited for your registration groups",
  },
  {
    step: "5",
    text: "Be prepared, keep documents tidy and staff informed",
  },
  {
    step: "6",
    text: "Low-risk = verification, high-risk = certification",
  },
];

interface Step2Props {
  setStep: (step: number) => void;
}

const Step2 = ({ setStep }: Step2Props) => {
  const [drawer, setDrawer] = useState<boolean>(false);
  return (
    <>
      <div className="rounded-xl bg-white p-10 shadow">
        <span
          className="flex cursor-pointer items-center gap-1 text-[#6E6E6E]"
          onClick={() => setStep(1)}
        >
          <IoIosArrowBack /> Previous step
        </span>
        {/* Heading */}
        <TextElement
          className={`${altform.className} text-[40px] !font-[400]`}
          as="h1"
        >
          Choose an approved quality Auditor
        </TextElement>

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
              In this video, I'll guide you through the process of submitting
              your application and scope of audit.
            </TextElement>
          </div>
        </div>

        {/* Recommended Auditors */}
        <div className="mt-15">
          <TextElement
            className={`${altform.className} !text-[30px] !font-[400]`}
            as="p"
          >
            Our recommended auditors
          </TextElement>

          <div className="mt-10 flex flex-wrap items-center gap-10">
            {[
              "/dashboard/aqc-group.png",
              "/dashboard/assured.png",
              "/dashboard/awg.png",
              "/dashboard/ava.png",
              "/dashboard/certifi.png",
            ].map((v, i) => (
              <div key={i} className="relative aspect-[3/1] h-[64px] w-[auto]">
                <Image src={v} alt="Logo" fill className="object-contain" />
              </div>
            ))}
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
            handleOnClick={() => setDrawer(true)}
          />
        </div>
      </div>

      <AppointmentDrawer
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        width="half"
      />
    </>
  );
};

export default Step2;
